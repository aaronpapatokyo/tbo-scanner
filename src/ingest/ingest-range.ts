#!/usr/bin/env tsx
import ccxt from "ccxt";
import { createClient } from "@supabase/supabase-js";
import { computeTBO } from "../lib/tbo";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
dotenv.config();

const SUPABASE_URL = process.env.SUPABASE_URL!;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

type Args = {
  symbol: string;
  timeframe: string;
  since?: number;
  limit?: number;
  verbose: boolean;
  batch: number;
  maxRetries: number;
  concurrency: number;
  failDumpDir?: string;
};

function parseArgs(): Args {
  const args = Object.fromEntries(process.argv.slice(2).map((s: string) => {
    const [k, v] = s.replace(/^--/, "").split("=");
    return [k, v ?? "true"];
  })) as any;

  if (!args.symbol || !args.timeframe) {
    console.error("Usage: ingest-range.ts --symbol=BTC/USDT --timeframe=1d [--since=2024-01-01] [--limit=1000] [--verbose] [--batch=200] [--maxRetries=3] [--concurrency=1] [--failDumpDir=/tmp/ingest-failures]");
    process.exit(1);
  }

  let sinceNum: number | undefined;
  if (args.since) {
    sinceNum = isNaN(Number(args.since)) ? Date.parse(args.since) : Number(args.since);
  }

  const limit = args.limit ? Number(args.limit) : undefined;
  const verbose = args.verbose === "true" || args.verbose === "" || args.verbose === true;
  const batch = args.batch ? Number(args.batch) : 200;
  const maxRetries = args.maxRetries ? Number(args.maxRetries) : 3;
  const concurrency = args.concurrency ? Number(args.concurrency) : 1;
  const failDumpDir = args.failDumpDir ? String(args.failDumpDir) : "/tmp/ingest-failures";

  return { symbol: args.symbol, timeframe: args.timeframe, since: sinceNum, limit, verbose, batch, maxRetries, concurrency, failDumpDir };
}

function timeframeToMs(tf: string): number {
  const m = tf.match(/^(\d+)([mhdw])$/i);
  if (!m) throw new Error(`Unsupported timeframe: ${tf}`);
  const n = Number(m[1]);
  const u = m[2].toLowerCase();
  const unit =
    u === "m" ? 60_000 :
    u === "h" ? 3_600_000 :
    u === "d" ? 86_400_000 :
    u === "w" ? 604_800_000 :
    0;
  if (!unit) throw new Error(`Unsupported timeframe unit: ${u}`);
  return n * unit;
}

function chunkArray<T>(arr: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function upsertBatchWithRetries(table: string, rows: any[], onConflict: string, maxRetries: number, verbose: boolean) {
  let attempt = 0;
  let backoff = 500; // ms
  while (attempt <= maxRetries) {
    const { error } = await supabase
      .from(table)
      .upsert(rows, { onConflict });

    if (!error) {
      if (verbose) console.error(`Upsert batch succeeded (size=${rows.length})`);
      return { success: true };
    }

    const msg = (error?.message ?? "").toString();

    // Common actionable hints
    if (msg.includes("no unique or exclusion constraint matching the ON CONFLICT specification")) {
      console.error("");
      console.error("Upsert failed because the table does not have a unique constraint matching onConflict:", onConflict);
      console.error("Run the following SQL in the Supabase SQL editor to add the unique index:");
      console.error(`CREATE UNIQUE INDEX IF NOT EXISTS idx_unique_tbo_bars_symbol_timeframe_timestamp
  ON public.tbo_bars (symbol, timeframe, "timestamp");`);
      console.error("");
      return { success: false, error };
    }

    if (msg.includes('null value in column "ts"') || msg.includes('null value in column "timestamp"') || msg.includes('null value in column "speed"')) {
      console.error("");
      console.error("Upsert failed because a NOT NULL column was missing from the payload (ts/timestamp/speed).");
      console.error("The script includes ts, timestamp, speed, updated_at and inserted_at in the payload; if you prefer defaults, add defaults in DB.");
      console.error("");
      return { success: false, error };
    }

    attempt++;
    if (attempt > maxRetries) {
      if (verbose) console.error(`Upsert batch failed after ${maxRetries} retries: ${error.message}`);
      return { success: false, error };
    }

    if (verbose) console.error(`Upsert batch failed (attempt ${attempt}/${maxRetries}). Retrying in ${backoff}ms: ${error.message}`);
    await sleep(backoff);
    backoff *= 2;
  }
  return { success: false };
}

function ensureDumpDir(dir: string) {
  try {
    fs.mkdirSync(dir, { recursive: true });
  } catch (e) {
    // ignore
  }
}

function dumpFailedBatch(dir: string, meta: { symbol: string; timeframe: string; batchIndex: number; attemptTime?: number }, rows: any[]) {
  ensureDumpDir(dir);
  const fname = `failed-${meta.symbol.replace(/[^\w-]/g, "_")}-${meta.timeframe.replace(/[^\w-]/g, "_")}-batch${meta.batchIndex}-${Date.now()}.json`;
  const p = path.join(dir, fname);
  try {
    fs.writeFileSync(p, JSON.stringify({ meta, rows }, null, 2));
    console.error(`Wrote failed batch to ${p}`);
  } catch (e) {
    console.error("Failed to write failed-batch dump:", e);
  }
}

async function runBatchesConcurrently<T>(batches: T[][], concurrency: number, handler: (batch: T[], idx: number) => Promise<{ success: boolean } | any>) {
  if (concurrency <= 1) {
    // sequential fallback
    for (let i = 0; i < batches.length; i++) {
      // eslint-disable-next-line no-await-in-loop
      await handler(batches[i], i);
    }
    return;
  }

  let idx = 0;
  const workers: Promise<void>[] = [];
  for (let w = 0; w < concurrency; w++) {
    const worker = (async () => {
      while (true) {
        const myIndex = idx++;
        if (myIndex >= batches.length) break;
        // eslint-disable-next-line no-await-in-loop
        await handler(batches[myIndex], myIndex);
      }
    })();
    workers.push(worker);
  }
  await Promise.all(workers);
}

async function main() {
  const { symbol, timeframe, since, limit, verbose, batch, maxRetries, concurrency, failDumpDir } = parseArgs();
  const tfMs = timeframeToMs(timeframe);

  const ex = new (ccxt as any).binance({ enableRateLimit: true, timeout: 30000 });
  if (verbose) (ex as any).verbose = true;
  await ex.loadMarkets();
  if (!ex.markets[symbol]) {
    console.error(`Symbol ${symbol} not found on Binance. Example: BTC/USDT`);
    process.exit(1);
  }

  // Determine fetch window
  let effectiveSince = since ?? Date.now() - 400 * tfMs;
  let effectiveLimit = limit ?? 1500;

  if (verbose) console.error(`Fetching OHLCV ${symbol} ${timeframe} since ${new Date(effectiveSince).toISOString()} (limit=${effectiveLimit})...`);
  const t0 = Date.now();
  const ohlcv = await ex.fetchOHLCV(symbol, timeframe, effectiveSince, effectiveLimit);
  const t1 = Date.now();
  if (verbose) console.error(`Fetched ${ohlcv.length} candles in ${(t1 - t0)}ms`);

  if (ohlcv.length === 0) {
    console.error("No candles returned. Try adjusting --since earlier or increasing --limit.");
    process.exit(1);
  }

  // Split OHLCV into arrays
  const t: number[] = [];
  const o: number[] = [];
  const h: number[] = [];
  const l: number[] = [];
  const c: number[] = [];
  const v: number[] = [];
  for (const row of ohlcv) {
    t.push(row[0]);
    o.push(row[1]);
    h.push(row[2]);
    l.push(row[3]);
    c.push(row[4]);
    v.push(row[5]);
  }

  // Compute TBO on all bars
  const { series } = computeTBO(o, h, l, c);

  // Required NOT NULL columns in your table (from your schema)
  // We'll set sensible values for speed/inserted_at/updated_at so upserts don't hit NOT NULL violations.
  const nowIso = () => new Date().toISOString();

  // Build payloads (include both ts and canonical timestamp fields and required NOT NULLs)
  const payloads: any[] = [];
  for (let i = 0; i < t.length; ++i) {
    const iso = new Date(t[i]).toISOString();
    if (!iso) {
      if (verbose) console.error(`Skipping index ${i} because timestamp is invalid:`, t[i]);
      continue;
    }

    payloads.push({
      symbol,
      timeframe,
      ts: iso,
      timestamp: iso,
      speed: timeframe,
      inserted_at: iso,
      updated_at: nowIso(),
      open: o[i],
      high: h[i],
      low: l[i],
      close: c[i],
      volume: v[i],
      tbo_fast: series[i].TBO_Fast,
      tbo_mid_fast: series[i].TBO_Mid_Fast,
      tbo_mid_slow: series[i].TBO_Mid_Slow,
      tbo_slow: series[i].TBO_Slow,
      open_long: series[i].open_long,
      open_short: series[i].open_short,
      close_long: series[i].close_long,
      close_short: series[i].close_short,
      crossup: series[i].crossup,
      crossdown: series[i].crossdown,
      breakout: series[i].breakout,
      breakdown: series[i].breakdown,
      support: series[i].support,
      resistance: series[i].resistance,
      exchange: "binance"
    });
  }

  // validate payloads for required NOT NULL columns and log first invalid row if any
  const required = ["symbol", "timeframe", "ts", "speed", "exchange", "updated_at"];
  const badRows: any[] = [];
  for (const p of payloads) {
    for (const k of required) {
      if (p[k] === undefined || p[k] === null) {
        badRows.push({ missing: k, row: p });
        break;
      }
    }
  }
  if (badRows.length > 0) {
    console.error("Detected payload rows missing required NOT NULL columns. First example:");
    console.error(JSON.stringify(badRows[0], null, 2));
    console.error("Aborting ingestion to avoid repeated NOT NULL failures. Fix the payload generation or DB defaults and retry.");
    process.exit(1);
  }

  // Chunk and upsert batches (with concurrency control)
  const batches = chunkArray(payloads, batch);
  let totalUpserted = 0;
  let totalFailedBatches = 0;

  // handler for each batch (used by sequential and concurrent runner)
  const handler = async (rows: any[], bi: number) => {
    if (verbose) console.error(`Upserting batch ${bi + 1}/${batches.length} (size=${rows.length})...`);
    if (verbose) console.error("Example payload row:", JSON.stringify(rows[0]));

    const res = await upsertBatchWithRetries("tbo_bars", rows, "symbol,timeframe,timestamp", maxRetries, verbose);
    if (!res.success) {
      totalFailedBatches++;
      console.error(`Batch ${bi + 1} failed permanently.`);
      // persist failing rows for later replay
      try {
        dumpFailedBatch(failDumpDir!, { symbol, timeframe, batchIndex: bi + 1, attemptTime: Date.now() }, rows);
      } catch (e) {
        console.error("Failed to persist failing batch:", e);
      }
    } else {
      totalUpserted += rows.length;
    }
    // small pause between batches to be polite to the DB
    await sleep(100);
    return res;
  };

  if (concurrency > 1) {
    if (verbose) console.error(`Running ${batches.length} batches with concurrency=${concurrency}...`);
    await runBatchesConcurrently(batches, concurrency, handler);
  } else {
    // sequential
    for (let bi = 0; bi < batches.length; bi++) {
      // eslint-disable-next-line no-await-in-loop
      // calling handler sequentially
      // handler already respects retries/backoff
      // eslint-disable-next-line no-await-in-loop
      // small pause is inside handler
      // so we can just await it
      // eslint-disable-next-line no-await-in-loop
      await handler(batches[bi], bi);
    }
  }

  // Update watermark (optional)
  const lastTs = new Date(t[t.length - 1]).toISOString();
  const { error: wmErr } = await supabase
    .from("tbo_watermark")
    .upsert([{ symbol, timeframe, timestamp: lastTs }], { onConflict: "symbol,timeframe" });

  if (wmErr) console.error("Watermark upsert error:", wmErr.message);

  console.log(`Batched upsert complete for ${symbol} ${timeframe}. Upserted rows (approx): ${totalUpserted}. Failed batches: ${totalFailedBatches}.`);
  console.log(`First timestamp: ${new Date(t[0]).toISOString()}, Last timestamp: ${lastTs}`);
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});