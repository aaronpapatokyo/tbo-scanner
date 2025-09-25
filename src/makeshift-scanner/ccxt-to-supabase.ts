import ccxt from 'ccxt';
import { createClient } from '@supabase/supabase-js';

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

async function fetchOHLCV(exchangeId: string, symbol: string, timeframe: string, since?: number, limit?: number) {
  // runtime ccxt import avoids TS namespace issues in many configs
  const ctor = (ccxt as any)[exchangeId] ?? (ccxt as any).Exchange;
  if (!ctor) throw new Error(`Exchange ${exchangeId} not available in this ccxt build`);
  const exchange = new ctor({ enableRateLimit: true });
  await exchange.loadMarkets();
  const rows: OHLCVRow[] = await exchange.fetchOHLCV(symbol, timeframe, since ?? undefined, limit ?? undefined);
  try { await exchange.close(); } catch {}
  return rows;
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

  // map to DB rows; ensure ts (timestamptz) populated and speed non-null
  const rows = ohlcv.map((r) => {
    const [tsMs, open, high, low, close, volume] = r;
    const tsIso = new Date(tsMs).toISOString(); // ccxt returns ms unix timestamp
    return {
      symbol,
      timeframe,
      ts: tsIso,           // required NOT NULL timestamptz
      timestamp: tsIso,    // optional column in your schema
      open: open ?? null,
      high: high ?? null,
      low: low ?? null,
      close: close ?? null,
      volume: volume ?? null,
      exchange: exchange,
      speed: defaultSpeed, // required NOT NULL text column in your schema
      trades: null,
    };
  });

  // upsert in batches
  const batchSize = opts.batch ? Number(opts.batch) : 50;
  for (let i = 0; i < rows.length; i += batchSize) {
    const batch = rows.slice(i, i + batchSize);
    const { error } = await supabase
      .from('tbo_bars')
      .upsert(batch, { onConflict: 'symbol,timeframe,ts' });
    if (error) {
      console.error('Supabase upsert error:', error);
      process.exit(1);
    }
    console.log(`Upserted batch ${Math.floor(i / batchSize) + 1} (${batch.length} rows).`);
  }

  console.log('Done.');
}

main().catch((err) => {
  console.error('Unhandled error:', err);
  process.exit(1);
});