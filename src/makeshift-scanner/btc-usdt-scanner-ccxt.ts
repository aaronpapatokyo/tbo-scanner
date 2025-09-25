import fs from 'fs';
import path from 'path';
import * as ccxt from 'ccxt'; // keep as namespace import so it works without esModuleInterop

type OHLCV = [number, number, number, number, number, number]; // timestamp, open, high, low, close, volume

type Bar = {
  symbol: string;
  timeframe: string;
  timestamp: string; // ISO
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  trades?: number | null;
};

function parseArgs() {
  const args = process.argv.slice(2);
  const opts: Record<string, string> = {};
  for (let i = 0; i < args.length; i++) {
    const a = args[i];
    if (a.startsWith('--')) {
      const key = a.slice(2);
      const val = args[i + 1] && !args[i + 1].startsWith('--') ? args[i + 1] : 'true';
      if (val !== 'true') i++;
      opts[key] = val;
    }
  }
  return opts;
}

function toMsSince(value?: string) {
  if (!value) return undefined;
  const asNumber = Number(value);
  if (!Number.isNaN(asNumber)) return asNumber;
  const d = new Date(value);
  if (!isNaN(d.getTime())) return d.getTime();
  throw new Error('Invalid --since value; supply ms since epoch or an ISO date string');
}

async function fetchOHLCVWithRetry(exchange: any, symbol: string, timeframe: string, since?: number, limit?: number) {
  if (!exchange.markets || Object.keys(exchange.markets).length === 0) {
    await exchange.loadMarkets();
  }

  const maxTries = 3;
  let lastErr: any = null;
  for (let attempt = 1; attempt <= maxTries; attempt++) {
    try {
      const ohlcv: OHLCV[] = await exchange.fetchOHLCV(symbol, timeframe, since ?? undefined, limit ?? undefined);
      return ohlcv;
    } catch (err: any) {
      lastErr = err;
      await new Promise((r) => setTimeout(r, 500 * attempt));
    }
  }
  throw lastErr;
}

function ohlcvToBars(ohlcvRows: OHLCV[], symbolDisplay: string, timeframe: string): Bar[] {
  return ohlcvRows.map((r) => {
    const [ts, open, high, low, close, volume] = r;
    return {
      symbol: symbolDisplay,
      timeframe,
      timestamp: new Date(ts).toISOString(),
      open: Number(open),
      high: Number(high),
      low: Number(low),
      close: Number(close),
      volume: Number(volume),
    };
  });
}

async function main() {
  const opts = parseArgs();
  const exchangeId = (opts.exchange as string) ?? 'binance';
  const symbol = (opts.symbol as string) ?? 'BTC/USDT';
  const displaySymbol = (opts.displaySymbol as string) ?? symbol;
  const timeframe = (opts.interval as string) ?? (opts.timeframe as string) ?? '1d';
  const limit = opts.limit ? Number(opts.limit) : 100;
  const since = opts.since ? toMsSince(opts.since) : undefined;
  const out = opts.out ?? `./data/${symbol.replace('/', '-').toLowerCase()}-${timeframe}.json`;
  const enableVerbose = !!opts.verbose;

  console.log(`Using CCXT exchange=${exchangeId} symbol=${symbol} timeframe=${timeframe} limit=${limit} since=${since ?? 'none'}`);

  let exchange: any;
  try {
    // runtime lookup; typed as any to avoid TS namespace errors
    const ctor = (ccxt as any)[exchangeId];
    exchange = ctor ? new ctor({ enableRateLimit: true }) : new (ccxt as any).Exchange({ id: exchangeId, enableRateLimit: true });
  } catch (err) {
    if ((ccxt as any)[exchangeId]) {
      exchange = new (ccxt as any)[exchangeId]({ enableRateLimit: true });
    } else {
      console.error(`Exchange ${exchangeId} not found in ccxt build. Install a ccxt version that includes it or pick another exchange.`);
      process.exit(1);
      return;
    }
  }

  try {
    const raw = await fetchOHLCVWithRetry(exchange, symbol, timeframe, since, limit);
    const bars = ohlcvToBars(raw, displaySymbol, timeframe);
    const outDir = path.dirname(out);
    fs.mkdirSync(outDir, { recursive: true });
    fs.writeFileSync(out, JSON.stringify({ fetchedAt: new Date().toISOString(), exchange: exchangeId, symbol, timeframe, bars }, null, 2));
    console.log(`Wrote ${bars.length} bars to ${out}`);
    if (enableVerbose && bars.length) console.log('Latest bar:', bars[bars.length - 1]);
  } catch (err: any) {
    console.error('Failed to fetch OHLCV via CCXT:', err?.message ?? err);
    process.exit(1);
  } finally {
    try { exchange?.close?.(); } catch {}
  }
}

if (require.main === module) {
  main();
}