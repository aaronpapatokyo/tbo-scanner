// CCXT → Supabase direct upsert scanner with TBO indicator calculations.
// This updates the previous script to compute indicators per bar
// and include signal booleans before upserting into public.tbo_bars.
//
// Key points:
// - Ensures ts (timestamptz) and speed (non-null) are present.
// - Computes indicators using src/makeshift-scanner/indicators.ts.
// - Detects crossup/crossdown by comparing previous and current tbo_fast vs tbo_mid_fast.
// - Adds breakout/breakdown and open/close long/short signals.
// - Preserves batching and upsert on (symbol,timeframe,ts).

import ccxt from 'ccxt';
import { createClient } from '@supabase/supabase-js';
import { computeIndicators } from './indicators';

type OHLCVRow = [number, number, number, number, number, number];

function parseArgs() {
  const args = process.argv.slice(2);
  const opts: Record<string, string> = {};
  for (let i = 0; i < args.length; i++) {
    const a = args[i];
    if (a.startsWith('--')) {
      const k = a.slice(2);
      const v = args[i + 1] && !args[i + 1].startsWith('--') ? args[i + 1] : 'true';
      if (v !== 'true') i++;
      opts[k] = v;
    }
  }
  return opts;
}

function chunk<T>(arr: T[], size: number) {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

async function fetchOHLCV(exchangeId: string, symbol: string, timeframe: string, since?: number, limit?: number) {
  const ctor = (ccxt as any)[exchangeId] ?? (ccxt as any).Exchange;
  if (!ctor) throw new Error(`Exchange ${exchangeId} not available in this ccxt build`);
  const exchange = new ctor({ enableRateLimit: true });
  await exchange.loadMarkets();
  const rows: OHLCVRow[] = await exchange.fetchOHLCV(symbol, timeframe, since ?? undefined, limit ?? undefined);
  try { await exchange.close(); } catch {}
  return rows;
}

function toIso(value: any): string | null {
  if (value == null) return null;
  if (typeof value === 'number' && Number.isFinite(value)) return new Date(value).toISOString();
  if (typeof value === 'string') {
    if (/^\d+$/.test(value)) {
      const n = Number(value);
      if (Number.isFinite(n)) return new Date(n).toISOString();
    }
    const d = new Date(value);
    if (!isNaN(d.getTime())) return d.toISOString();
  }
  return null;
}

async function main() {
  const opts = parseArgs();
  const exchange = opts.exchange ?? 'binance';
  const symbol = opts.symbol ?? 'BTC/USDT';
  const timeframe = opts.interval ?? opts.timeframe ?? '1d';
  const limit = opts.limit ? Number(opts.limit) : 100;
  const since = opts.since ? Number(opts.since) : undefined;
  const defaultSpeed = opts.speed ?? 'unknown';

  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SUPABASE_KEY = process.env.SUPABASE_KEY ?? process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!SUPABASE_URL || !SUPABASE_KEY) {
    console.error('Missing SUPABASE_URL or SUPABASE_KEY (or SUPABASE_SERVICE_ROLE_KEY).');
    process.exit(1);
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

  console.log(`Fetching ${limit} ${timeframe} bars for ${symbol} from ${exchange}...`);
  const ohlcv = await fetchOHLCV(exchange, symbol, timeframe, since, limit);
  if (!ohlcv || ohlcv.length === 0) {
    console.log('No bars returned.');
    return;
  }

  // build closes array for indicator computation
  const closes = ohlcv.map((r) => {
    const close = Number(r[4]);
    return Number.isFinite(close) ? close : NaN;
  });

  // map bar by bar, computing indicators and signals
  const rows: Record<string, any>[] = [];
  for (let i = 0; i < ohlcv.length; i++) {
    const [tsMs, open, high, low, closeRaw, volume] = ohlcv[i];
    const close = Number(closeRaw);
    const tsIso = toIso(tsMs);
    if (!tsIso) {
      // skip bars without a valid timestamp (shouldn't happen for ccxt)
      continue;
    }

    // current indicators
    const curInd = computeIndicators(closes, i);
    // previous indicators for cross detection
    const prevInd = i > 0 ? computeIndicators(closes, i - 1) : null;

    // helper boolean cross detection (only true when both prev and cur have values)
    let crossup = false;
    let crossdown = false;
    const cfPrev = prevInd?.tbo_fast;
    const cmPrev = prevInd?.tbo_mid_fast;
    const cfCur = curInd.tbo_fast;
    const cmCur = curInd.tbo_mid_fast;
    if (cfPrev != null && cmPrev != null && cfCur != null && cmCur != null) {
      // crossup: fast crosses above mid_fast (prev fast <= prev mid_fast && cur fast > cur mid_fast)
      crossup = cfPrev <= cmPrev && cfCur > cmCur;
      // crossdown: fast crosses below mid_fast
      crossdown = cfPrev >= cmPrev && cfCur < cmCur;
    }

    const support = curInd.support;
    const resistance = curInd.resistance;

    const breakout = resistance != null ? close > resistance : false;
    const breakdown = support != null ? close < support : false;

    // assemble mapped row; only include numeric indicators if non-null (avoid undefined)
    const mapped: Record<string, any> = {
      symbol,
      timeframe,
      ts: tsIso,
      timestamp: tsIso,
      open: Number.isFinite(Number(open)) ? Number(open) : null,
      high: Number.isFinite(Number(high)) ? Number(high) : null,
      low: Number.isFinite(Number(low)) ? Number(low) : null,
      close: Number.isFinite(close) ? close : null,
      volume: Number.isFinite(Number(volume)) ? Number(volume) : null,
      exchange,
      speed: defaultSpeed, // required NOT NULL
      // boolean signals (include explicitly)
      crossup,
      crossdown,
      breakout,
      breakdown,
      open_long: crossup,
      close_long: crossdown,
      open_short: crossdown,
      close_short: crossup,
    };

    // include numeric indicator fields only when non-null
    if (curInd.tbo_fast != null) mapped.tbo_fast = curInd.tbo_fast;
    if (curInd.tbo_mid_fast != null) mapped.tbo_mid_fast = curInd.tbo_mid_fast;
    if (curInd.tbo_mid_slow != null) mapped.tbo_mid_slow = curInd.tbo_mid_slow;
    if (curInd.tbo_slow != null) mapped.tbo_slow = curInd.tbo_slow;
    if (curInd.support != null) mapped.support = curInd.support;
    if (curInd.resistance != null) mapped.resistance = curInd.resistance;

    rows.push(mapped);
  }

  if (rows.length === 0) {
    console.error('No rows to upload after mapping; aborting.');
    return;
  }

  const batchSize = opts.batch ? Number(opts.batch) : 50;
  const batches = chunk(rows, batchSize);
  console.log(`Upserting ${rows.length} rows in ${batches.length} batches (batchSize=${batchSize})...`);

  for (let bi = 0; bi < batches.length; bi++) {
    const batch = batches[bi];
    const { error } = await supabase
      .from('tbo_bars')
      .upsert(batch, { onConflict: 'symbol,timeframe,ts' });
    if (error) {
      console.error('Supabase upsert error:', error);
      process.exit(1);
    }
    console.log(`Upserted batch ${bi + 1}/${batches.length} (${batch.length} rows).`);
  }

  console.log('Done.');
}

main().catch((err) => {
  console.error('Unhandled error:', err);
  process.exit(1);
});