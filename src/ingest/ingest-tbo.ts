#!/usr/bin/env tsx
import "dotenv/config";
import ccxt from "ccxt";
import { getServiceClient } from "./supabase";
import { computeTBO, TBOSpeed } from "../lib/tbo";

type Args = {
  symbol: string;
  timeframe: string;
  since: number;         // ms
  until?: number;        // ms
  limit?: number;        // max bars to request (Binance ~1500 cap typically)
  speed?: TBOSpeed;      // Standard | Fast | Slow
};

function parseTime(value: string): number {
  const ms = Date.parse(value);
  if (isNaN(ms)) throw new Error(`Invalid datetime: ${value}`);
  return ms;
}

function parseArgs(): Args {
  const args = Object.fromEntries(process.argv.slice(2).map((s) => {
    const [k, v] = s.replace(/^--/, "").split("=");
    return [k, v ?? "true"];
  })) as any;

  if (!args.symbol || !args.timeframe || !args.since) {
    console.error("Usage: pnpm run ingest:tbo -- --symbol=BTC/USDT --timeframe=1d --since=2025-06-01T00:00:00Z [--until=ISO] [--limit=1000] [--speed=Standard|Fast|Slow]");
    process.exit(1);
  }

  const since = isNaN(Number(args.since)) ? parseTime(args.since) : Number(args.since);
  const until = args.until ? (isNaN(Number(args.until)) ? parseTime(args.until) : Number(args.until)) : undefined;
  const limit = args.limit ? Number(args.limit) : undefined;
  const speed = (args.speed ?? "Standard") as TBOSpeed;

  return { symbol: args.symbol, timeframe: args.timeframe, since, until, limit, speed };
}

async function main() {
  const { symbol, timeframe, since, until, limit, speed } = parseArgs();

  const ex = new (ccxt as any).binance({ enableRateLimit: true, timeout: 30000 });
  await ex.loadMarkets();
  if (!ex.markets[symbol]) {
    throw new Error(`Symbol ${symbol} not found on Binance`);
  }

  // Fetch a single window (keep within ~1500 bar cap unless limit is explicitly smaller)
  const effLimit = limit ?? 1500;
  const ohlcv = await ex.fetchOHLCV(symbol, timeframe, since, effLimit);
  if (!ohlcv.length) {
    console.error("No candles returned. Try an earlier --since or larger --limit.");
    process.exit(1);
  }

  // Optionally trim by 'until'
  const rows = (until
    ? ohlcv.filter((row: number[]) => row[0] <= until)
    : ohlcv
  );

  const t: number[] = [];
  const o: number[] = [];
  const h: number[] = [];
  const l: number[] = [];
  const c: number[] = [];
  for (const row of rows) {
    t.push(row[0]);
    o.push(row[1]);
    h.push(row[2]);
    l.push(row[3]);
    c.push(row[4]);
  }

  const { series } = computeTBO(o, h, l, c, { speed });

  type UpsertRow = {
    symbol: string;
    timeframe: string;
    ts: string; // ISO
    speed: TBOSpeed;
    open_long: boolean | null;
    open_short: boolean | null;
    close_long: boolean | null;
    close_short: boolean | null;
    crossup: boolean | null;
    crossdown: boolean | null;
    breakout: boolean | null;
    breakdown: boolean | null;
    tbo_fast: number | null;
    tbo_mid_fast: number | null;
    tbo_mid_slow: number | null;
    tbo_slow: number | null;
    support: number | null;
    resistance: number | null;
    close: number | null;
  };

  const upserts: UpsertRow[] = series.map((bar, i) => ({
    symbol,
    timeframe,
    ts: new Date(t[i]).toISOString(),
    speed: speed as TBOSpeed,
    open_long: bar.open_long ?? null,
    open_short: bar.open_short ?? null,
    close_long: bar.close_long ?? null,
    close_short: bar.close_short ?? null,
    crossup: bar.crossup ?? null,
    crossdown: bar.crossdown ?? null,
    breakout: bar.breakout ?? null,
    breakdown: bar.breakdown ?? null,
    tbo_fast: bar.TBO_Fast ?? null,
    tbo_mid_fast: bar.TBO_Mid_Fast ?? null,
    tbo_mid_slow: bar.TBO_Mid_Slow ?? null,
    tbo_slow: bar.TBO_Slow ?? null,
    support: bar.support ?? null,
    resistance: bar.resistance ?? null,
    close: c[i] ?? null,
  }));

  const supabase = getServiceClient();

  const chunkSize = 800;
  let total = 0;
  for (let i = 0; i < upserts.length; i += chunkSize) {
    const chunk = upserts.slice(i, i + chunkSize);
    const { error, status, statusText } = await supabase
      .from("tbo_bars")
      .upsert(chunk, { onConflict: "symbol,timeframe,ts,speed" });
    if (error) {
      console.error(`Upsert failed [${status} ${statusText}]:`, error.message);
      process.exit(1);
    }
    total += chunk.length;
  }

  console.log(JSON.stringify({
    symbol,
    timeframe,
    speed,
    since: new Date(since).toISOString(),
    until: until ? new Date(until).toISOString() : undefined,
    bars: upserts.length,
    upserted: total
  }, null, 2));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});