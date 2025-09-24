/* eslint-disable no-console */
import 'dotenv/config';
import ccxt from 'ccxt';
import { getSupabase } from './supabaseClient';
import { setWatermark } from './watermark';

function argVal(flag: string, def?: string) {
  const prefix = `--${flag}=`;
  const full = process.argv.find((a) => a.startsWith(prefix));
  if (full) return full.slice(prefix.length);
  const idx = process.argv.findIndex((a) => a === `--${flag}`);
  if (idx >= 0 && idx + 1 < process.argv.length) return process.argv[idx + 1];
  return def;
}

const TF_MS: Record<string, number> = {
  '1m': 60_000,
  '5m': 300_000,
  '15m': 900_000,
  '1h': 3_600_000,
  '4h': 14_400_000,
  '1d': 86_400_000,
  '1w': 604_800_000,
};

export type IngestRangeParams = {
  symbol: string;
  timeframe: string;
  since: Date;
  until?: Date;
  limitPerReq?: number;
  speed?: string;
  exchangeId?: string;
};

export async function ingestRange(params: IngestRangeParams) {
  const {
    symbol,
    timeframe,
    since,
    until = new Date(),
    limitPerReq = 1000,
    speed = 'Standard',
    exchangeId = 'binance',
  } = params;

  const tfMs = TF_MS[timeframe];
  if (!tfMs) throw new Error(`Unsupported timeframe: ${timeframe}`);

  const exchangeCls = (ccxt as any)[exchangeId];
  if (!exchangeCls) throw new Error(`Unknown exchange: ${exchangeId}`);
  const exchange = new exchangeCls({ enableRateLimit: true });

  const sb = getSupabase();

  let cursor = since.getTime();
  const end = until.getTime();

  let total = 0;
  let firstTs: number | null = null;
  let lastTs: number | null = null;

  while (cursor <= end) {
    const limit = Math.min(limitPerReq, 1500);
    const batch = await exchange.fetchOHLCV(symbol, timeframe, cursor, limit);
    if (!batch || batch.length === 0) break;

    const rows = batch.map((b: any[]) => {
      const [t, o, h, l, c, v] = b;
      firstTs ??= t;
      lastTs = t;
      return {
        symbol,
        timeframe,
        speed,
        ts: new Date(t).toISOString(),
        open: o == null ? null : Number(o),
        high: h == null ? null : Number(h),
        low: l == null ? null : Number(l),
        close: c == null ? null : Number(c),
        volume: v == null ? null : Number(v),
        exchange: exchangeId,
        updated_at: new Date().toISOString(),
      };
    });

    const chunkSize = 1000;
    for (let i = 0; i < rows.length; i += chunkSize) {
      const chunk = rows.slice(i, i + chunkSize);
      const { error } = await sb
        .from('tbo_bars')
        .upsert(chunk, {
          onConflict: 'symbol,timeframe,speed,ts',
          ignoreDuplicates: false,
        });
      if (error) throw error;
    }

    total += rows.length;

    const lastNumeric = lastTs !== null ? lastTs : cursor;
    const next = lastNumeric + tfMs;
    // Avoid infinite loop: always ensure cursor increases.
    cursor = next <= cursor ? cursor + tfMs : next;

    if (speed !== 'Fast') await new Promise((r) => setTimeout(r, 500));
  }

  if (lastTs != null) {
    await setWatermark({ symbol, timeframe, speed }, new Date(lastTs));
  }

  const summary = {
    symbol,
    timeframe,
    speed,
    totalRowsUpserted: total,
    firstTs: firstTs ? new Date(firstTs).toISOString() : null,
    lastTs: lastTs ? new Date(lastTs).toISOString() : null,
  };
  console.log(JSON.stringify(summary, null, 2));
  return summary;
}

/**
 * Robust "run as script" detection:
 * - true if module path matches executed script path, OR
 * - true if executed filename matches, OR
 * - true if CLI flags that uniquely indicate a single-run (--symbol or --timeframe) are present.
 *
 * NOTE: we intentionally do NOT treat --since alone as a signal to run, because ingest-all uses --since
 * and imports this module. This prevents the orchestrator from accidentally triggering the CLI usage message.
 */
const shouldRun = (() => {
  try {
    const scriptPath = process.argv[1] || '';
    const thisPath = new URL(import.meta.url).pathname;
    if (thisPath === scriptPath) return true;
    const fileName = thisPath.split('/').pop();
    if (fileName && scriptPath.endsWith(fileName)) return true;
    // Only auto-run if flags that indicate a single-task run are present.
    const cliFlags = ['--symbol', '--timeframe'];
    if (process.argv.some(a => cliFlags.some(f => a === f || a.startsWith(f + '=')))) return true;
    return false;
  } catch {
    return false;
  }
})();

if (shouldRun) {
  const symbol = argVal('symbol');
  const timeframe = argVal('timeframe');
  const sinceStr = argVal('since');
  const untilStr = argVal('until');
  const limitPerReq = Number(argVal('limitPerReq', '1000'));
  const speed = argVal('speed', 'Standard');
  const exchangeId = argVal('exchange', 'binance');

  if (!symbol || !timeframe || !sinceStr) {
    console.error(
      'Usage: tsx src/ingest/ingest-range.ts --symbol=BTC/USDT --timeframe=1d --since=2024-01-01T00:00:00Z [--until=ISO] [--limitPerReq=1000] [--speed=Standard|Fast] [--exchange=binance]'
    );
    process.exit(1);
  }

  ingestRange({
    symbol,
    timeframe,
    since: new Date(sinceStr),
    until: untilStr ? new Date(untilStr) : undefined,
    limitPerReq,
    speed,
    exchangeId,
  }).catch((e) => {
    console.error(e);
    process.exit(1);
  });
}