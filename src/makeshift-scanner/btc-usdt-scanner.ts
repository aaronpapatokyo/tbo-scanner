import fs from 'fs';
import path from 'path';

type Kline = {
  openTime: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  closeTime: number;
  quoteAssetVolume: string;
  numberOfTrades: number;
  takerBuyBaseAssetVolume: string;
  takerBuyQuoteAssetVolume: string;
  ignore: string;
};

type Bar = {
  symbol: string;
  timeframe: string;
  timestamp: string; // ISO
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  quoteVolume: number;
  trades: number;
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

async function fetchKlines(symbol = 'BTCUSDT', interval = '1d', limit = 100): Promise<Kline[]> {
  const qs = new URLSearchParams({ symbol, interval, limit: String(limit) });
  const url = `https://api.binance.com/api/v3/klines?${qs.toString()}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Binance API error ${res.status}: ${await res.text()}`);
  }
  const data = (await res.json()) as any[];
  // Binance returns arrays — map to typed Kline objects for clarity
  return data.map((row) => ({
    openTime: row[0],
    open: row[1],
    high: row[2],
    low: row[3],
    close: row[4],
    volume: row[5],
    closeTime: row[6],
    quoteAssetVolume: row[7],
    numberOfTrades: row[8],
    takerBuyBaseAssetVolume: row[9],
    takerBuyQuoteAssetVolume: row[10],
    ignore: row[11],
  }));
}

function klinesToBars(klines: Kline[], symbol = 'BTC/USDT', timeframe = '1d'): Bar[] {
  return klines.map((k) => ({
    symbol,
    timeframe,
    timestamp: new Date(k.openTime).toISOString(),
    open: Number(k.open),
    high: Number(k.high),
    low: Number(k.low),
    close: Number(k.close),
    volume: Number(k.volume),
    quoteVolume: Number(k.quoteAssetVolume),
    trades: k.numberOfTrades,
  }));
}

async function main() {
  const opts = parseArgs();
  const symbol = opts.symbol ?? 'BTCUSDT';
  const displaySymbol = (opts.displaySymbol as string) ?? 'BTC/USDT';
  const interval = (opts.interval as string) ?? '1d';
  const limit = Number(opts.limit ?? 100);
  const out = opts.out ?? `./data/${symbol.toLowerCase()}-${interval}.json`;

  console.log(`Fetching ${limit} klines for ${symbol} interval=${interval} ...`);
  try {
    const klines = await fetchKlines(symbol, interval, limit);
    const bars = klinesToBars(klines, displaySymbol, interval);

    const outDir = path.dirname(out);
    fs.mkdirSync(outDir, { recursive: true });
    fs.writeFileSync(out, JSON.stringify({ fetchedAt: new Date().toISOString(), bars }, null, 2));
    console.log(`Wrote ${bars.length} bars to ${out}`);
    console.log('Sample bar:', bars[bars.length - 1]);
  } catch (err: any) {
    console.error('Error fetching/writing klines:', err.message ?? err);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}