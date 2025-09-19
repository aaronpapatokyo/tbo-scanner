#!/usr/bin/env tsx
import ccxt from "ccxt";
import { computeTBO, TBOSpeed } from "../src/lib/tbo";

type Args = {
  symbol: string;
  timeframe: string;
  since?: number;
  limit?: number;
  speed?: TBOSpeed;
};

function parseArgs(): Args {
  const args = Object.fromEntries(process.argv.slice(2).map(s => {
    const [k, v] = s.replace(/^--/, "").split("=");
    return [k, v ?? "true"];
  })) as any;
  if (!args.symbol || !args.timeframe) {
    console.error("Usage: pnpm run tbo --symbol=BTC/USDT --timeframe=1h [--since=2024-01-01] [--limit=1000] [--speed=Standard|Fast|Slow]");
    process.exit(1);
  }
  let sinceNum: number | undefined;
  if (args.since) {
    sinceNum = isNaN(Number(args.since)) ? Date.parse(args.since) : Number(args.since);
  }
  const limit = args.limit ? Number(args.limit) : undefined;
  const speed = (args.speed ?? "Standard") as TBOSpeed;
  return { symbol: args.symbol, timeframe: args.timeframe, since: sinceNum, limit, speed };
}

async function main() {
  const { symbol, timeframe, since, limit, speed } = parseArgs();
  const ex = new (ccxt as any).binance(); // Binance.com spot
  await ex.loadMarkets();
  if (!ex.markets[symbol]) {
    console.error(`Symbol ${symbol} not found on Binance. Example: BTC/USDT`);
    process.exit(1);
  }

  const ohlcv = await ex.fetchOHLCV(symbol, timeframe, since, limit);
  if (ohlcv.length === 0) {
    console.error("No candles returned. Try adjusting --since or --limit.");
    process.exit(1);
  }

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

  const { last, series } = computeTBO(o, h, l, c, { speed });

  const lastIdx = series.length - 1;
  const row = last!;
  console.log(JSON.stringify({
    symbol,
    timeframe,
    lastTimestamp: new Date(t[lastIdx]).toISOString(),
    lastClose: c[lastIdx],
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