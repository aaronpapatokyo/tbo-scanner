#!/usr/bin/env tsx
import ccxt from "ccxt";
import { createClient } from "@supabase/supabase-js";
import { computeTBO } from "../lib/tbo";
import dotenv from "dotenv";
dotenv.config();

const SUPABASE_URL = process.env.SUPABASE_URL!;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

type Args = {
  symbol: string;
  timeframe: string;
  since?: number;
  limit?: number;
  verbose?: boolean;
};

function parseArgs(): Args {
  const args = Object.fromEntries(process.argv.slice(2).map((s: string) => {
    const [k, v] = s.replace(/^--/, "").split("=");
    return [k, v ?? "true"];
  })) as any;

  if (!args.symbol || !args.timeframe) {
    console.error("Usage: ingest-range.ts --symbol=BTC/USDT --timeframe=1d [--since=2024-01-01] [--limit=1000] [--verbose]");
    process.exit(1);
  }

  let sinceNum: number | undefined;
  if (args.since) {
    sinceNum = isNaN(Number(args.since)) ? Date.parse(args.since) : Number(args.since);
  }

  const limit = args.limit ? Number(args.limit) : undefined;
  const verbose = args.verbose === "true" || args.verbose === "" || args.verbose === true;

  return { symbol: args.symbol, timeframe: args.timeframe, since: sinceNum, limit, verbose };
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

async function main() {
  const { symbol, timeframe, since, limit, verbose } = parseArgs();
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

  // Upsert each bar with TBO fields
  let upserted = 0, failed = 0;
  for (let i = 0; i < t.length; ++i) {
    const payload = {
      symbol,
      timeframe,
      timestamp: new Date(t[i]).toISOString(),
      open: o[i],
      high: h[i],
      low: l[i],
      close: c[i],
      volume: v[i],
      TBO_Fast: series[i].TBO_Fast,
      TBO_Mid_Fast: series[i].TBO_Mid_Fast,
      TBO_Mid_Slow: series[i].TBO_Mid_Slow,
      TBO_Slow: series[i].TBO_Slow,
      open_long: series[i].open_long,
      open_short: series[i].open_short,
      close_long: series[i].close_long,
      close_short: series[i].close_short,
      crossup: series[i].crossup,
      crossdown: series[i].crossdown,
      breakout: series[i].breakout,
      breakdown: series[i].breakdown,
      support: series[i].support,
      resistance: series[i].resistance
    };

    const { error } = await supabase
      .from("tbo_bars")
      .upsert([payload], { onConflict: "symbol,timeframe,timestamp" });

    if (error) {
      failed++;
      if (verbose) console.error(`Upsert failed for ${symbol} ${timeframe} @ ${payload.timestamp}:`, error.message);
    } else {
      upserted++;
    }
  }

  // Update watermark (optional)
  const lastTs = new Date(t[t.length - 1]).toISOString();
  await supabase
    .from("tbo_watermark")
    .upsert([{ symbol, timeframe, timestamp: lastTs }], { onConflict: "symbol,timeframe" });

  console.log(`Upserted ${upserted} bars for ${symbol} ${timeframe} (failed: ${failed}).`);
  console.log(`First timestamp: ${new Date(t[0]).toISOString()}, Last timestamp: ${lastTs}`);
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});