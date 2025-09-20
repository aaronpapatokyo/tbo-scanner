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
  warmup?: number;   // number of bars of warmup history before the target (default 400)
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

function parseAtToMs(at: string, timeframe: string): number {
  // Accept YYYY-MM-DD or any Date.parse()-able string.
  // If only a date is given, force UTC midnight.
  if (/^\d{4}-\d{2}-\d{2}$/.test(at)) {
    return Date.parse(`${at}T00:00:00Z`);
  }
  const ms = Date.parse(at);
  if (isNaN(ms)) {
    throw new Error(`Could not parse --at value "${at}". Use YYYY-MM-DD or ISO.`);
  }
  // For 1d, it should already align to 00:00:00Z if you passed just a date.
  return ms;
}

function parseArgs(): Args {
  const args = Object.fromEntries(process.argv.slice(2).map((s: string) => {
    const [k, v] = s.replace(/^--/, "").split("=");
    return [k, v ?? "true"];
  })) as any;

  if (!args.symbol || !args.timeframe) {
    console.error("Usage: pnpm run tbo -- --symbol=BTC/USDT --timeframe=1d [--since=2024-01-01] [--limit=1000] [--speed=Standard|Fast|Slow] [--at=YYYY-MM-DD] [--warmup=400]");
    process.exit(1);
  }

  let sinceNum: number | undefined;
  if (args.since) {
    sinceNum = isNaN(Number(args.since)) ? Date.parse(args.since) : Number(args.since);
  }
}