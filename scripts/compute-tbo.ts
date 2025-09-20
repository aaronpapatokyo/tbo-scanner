#!/usr/bin/env tsx
import ccxt from "ccxt";
import { computeTBO, TBOSpeed } from "../src/lib/tbo";

type Args = {
  symbol: string;
  timeframe: string;
  since?: number;
  limit?: number;
  speed?: TBOSpeed;
  at?: string;       // target bar to inspect (e.g., 2025-09-16 or ISO)
  warmup?: number;   // bars of warmup history before the target (default 400)
  verbose?: boolean; // print progress info
};

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

function parseAtToMs(at: string): number {
  if (/^\d{4}-\d{2}-\d{2}$/.test(at)) {
    return Date.parse(`${at}T00:00:00Z`); // force UTC midnight
  }
  const ms = Date.parse(at);
  if (isNaN(ms)) throw new Error(`Could not parse --at value "${at}". Use YYYY-MM-DD or ISO.`);
  return ms;
}

function parseArgs(): Args {
  const args = Object.fromEntries(process.argv.slice(2).map((s: string) => {
    const [k, v] = s.replace(/^--/, "").split("=");
    return [k, v ?? "true"];
  })) as any;

  if (!args.symbol || !args.timeframe) {
    console.error("Usage: pnpm run tbo -- --symbol=BTC/USDT --timeframe=1d [--since=2024-01-01] [--limit=1000] [--speed=Standard|Fast|Slow] [--at=YYYY-MM-DD] [--warmup=400] [--verbose]");
    process.exit(1);
  }

  let sinceNum: number | undefined;
  if (args.since) {
    sinceNum = isNaN(Number(args.since)) ? Date.parse(args.since) : Number(args.since);
  }

  const limit = args.limit ? Number(args.limit) : undefined;
  const speed = (args.speed ?? "Standard") as TBOSpeed;
  const at = args.at ? String(args.at) : undefined;
  const warmup = args.warmup ? Number(args.warmup) : undefined;
  const verbose = args.verbose === "true" || args.verbose === "" || args.verbose === true;

  return { symbol: args.symbol, timeframe: args.timeframe, since: sinceNum, limit, speed, at, warmup, verbose };
}

async function main() {
  const { symbol, timeframe, since, limit, speed, at, warmup, verbose } = parseArgs();
  const tfMs = timeframeToMs(timeframe);

  const ex = new (ccxt as any).binance({ enableRateLimit: true, timeout: 30000 });
  if (verbose) (ex as any).verbose = false; // set to true for ccxt wire logs
  await ex.loadMarkets();
  if (!ex.markets[symbol]) {
    console.error(`Symbol ${symbol} not found on Binance. Example: BTC/USDT`);
    process.exit(1);
  }

  // Determine fetch window
  let effectiveSince = since;
  let effectiveLimit = limit;

  let targetTs: number | undefined;
  const warmupBars = warmup ?? 400; // enough for SMA200 + highest/lowest100 + RSI/BB

  if (at) {
    targetTs = parseAtToMs(at);
    if (!effectiveSince) effectiveSince = targetTs - warmupBars * tfMs;
    if (!effectiveLimit) {
      const barsToTarget = Math.ceil((targetTs - effectiveSince) / tfMs) + 10;
      effectiveLimit = Math.max(barsToTarget, warmupBars + 20);
    }
  } else {
    if (!effectiveSince) effectiveSince = Date.now() - 400 * tfMs;
    if (!effectiveLimit) effectiveLimit = 1500;
  }

  if (verbose) console.error(`Fetching OHLCV ${symbol} ${timeframe} since ${new Date(effectiveSince!).toISOString()} (limit=${effectiveLimit})...`);
  const t0 = Date.now();
  const ohlcv = await ex.fetchOHLCV(symbol, timeframe, effectiveSince, effectiveLimit);
  const t1 = Date.now();
  if (verbose) console.error(`Fetched ${ohlcv.length} candles in ${t1 - t0}ms`);

  if (ohlcv.length === 0) {
    console.error("No candles returned. Try adjusting --since earlier or increasing --limit.");
    process.exit(1);
  }

  const t: number[] = [];
  const o: number[] = [];
  const h: number[] = [];
  const l: number[] = [];
  const c: number[] = [];
  for (const row of ohlcv) {
    t.push(row[0]);
    o.push(row[1]);
    h.push(row[2]);
    l.push(row[3]);
    c.push(row[4]);
  }

  const { series } = computeTBO(o, h, l, c, { speed });

  // Pick which bar to print
  let idx = series.length - 1;
  let barTs = t[idx];

  if (targetTs != null) {
    const exactIdx = t.findIndex(ms => ms === targetTs);
    if (exactIdx !== -1) {
      idx = exactIdx;
      barTs = t[idx];
    } else {
      const nextIdx = t.findIndex(ms => ms > targetTs);
      const floorIdx = nextIdx === -1 ? t.length - 1 : nextIdx - 1;
      if (floorIdx >= 0) {
        idx = floorIdx;
        barTs = t[idx];
        console.warn(`Target ${new Date(targetTs).toISOString()} not found exactly. Showing nearest prior bar ${new Date(barTs).toISOString()} instead.`);
      } else {
        console.error("Target bar not within fetched range. Increase --warmup or adjust --since/--limit.");
        process.exit(1);
      }
    }
  }

  const row = series[idx];
  console.log(JSON.stringify({
    symbol,
    timeframe,
    at: targetTs ? new Date(targetTs).toISOString() : undefined,
    barTimestamp: new Date(barTs).toISOString(),
    close: c[idx],
    speed,
    signals: {
      open_long: row.open_long,
      open_short: row.open_short,
      close_long: row.close_long,
      close_short: row.close_short,
      crossup: row.crossup,
      crossdown: row.crossdown,
      breakout: row.breakout,
      breakdown: row.breakdown
    },
    lines: {
      TBO_Fast: row.TBO_Fast,
      TBO_Mid_Fast: row.TBO_Mid_Fast,
      TBO_Mid_Slow: row.TBO_Mid_Slow,
      TBO_Slow: row.TBO_Slow
    },
    supres: {
      support: row.support,
      resistance: row.resistance
    }
  }, null, 2));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
