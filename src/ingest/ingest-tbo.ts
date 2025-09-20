#!/usr/bin/env tsx
import ccxt from 'ccxt';
import { computeTBO, TBOSpeed } from '../lib/tbo';
import { upsertTBOBars, getLatestTimestamp, type TBOBarRow } from './supabase';

type IngestArgs = {
  symbol: string;
  timeframe: string;
  since?: number;
  limit?: number;
  speed?: TBOSpeed;
  chunkSize?: number;
  verbose?: boolean;
};

function timeframeToMs(tf: string): number {
  const m = tf.match(/^(\d+)([mhdw])$/i);
  if (!m) throw new Error(`Unsupported timeframe: ${tf}`);
  const n = Number(m[1]);
  const u = m[2].toLowerCase();
  const unit =
    u === 'm' ? 60_000 :
    u === 'h' ? 3_600_000 :
    u === 'd' ? 86_400_000 :
    u === 'w' ? 604_800_000 :
    0;
  if (!unit) throw new Error(`Unsupported timeframe unit: ${u}`);
  return n * unit;
}

function parseArgs(): IngestArgs {
  const args = Object.fromEntries(process.argv.slice(2).map((s: string) => {
    const [k, v] = s.replace(/^--/, '').split('=');
    return [k, v ?? 'true'];
  })) as any;

  if (!args.symbol || !args.timeframe) {
    console.error('Usage: tsx src/ingest/ingest-tbo.ts --symbol=BTC/USDT --timeframe=1d [--since=2025-06-01T00:00:00Z] [--limit=1000] [--speed=Standard] [--chunkSize=100] [--verbose]');
    process.exit(1);
  }

  let sinceNum: number | undefined;
  if (args.since) {
    sinceNum = isNaN(Number(args.since)) ? Date.parse(args.since) : Number(args.since);
    if (isNaN(sinceNum)) {
      throw new Error(`Invalid --since value: ${args.since}. Use ISO format like 2025-06-01T00:00:00Z`);
    }
  }

  const limit = args.limit ? Number(args.limit) : undefined;
  const speed = (args.speed ?? 'Standard') as TBOSpeed;
  const chunkSize = args.chunkSize ? Number(args.chunkSize) : 100;
  const verbose = args.verbose === 'true' || args.verbose === '' || args.verbose === true;

  return { symbol: args.symbol, timeframe: args.timeframe, since: sinceNum, limit, speed, chunkSize, verbose };
}

async function main() {
  const { symbol, timeframe, since, limit, speed, chunkSize, verbose } = parseArgs();
  const tfMs = timeframeToMs(timeframe);

  console.log(`Starting TBO ingestion for ${symbol} ${timeframe} (speed: ${speed!})`);

  // Initialize Binance exchange
  const ex = new (ccxt as any).binance({ enableRateLimit: true, timeout: 30000 });
  if (verbose) (ex as any).verbose = false; // Suppress ccxt verbose for cleaner output
  await ex.loadMarkets();
  
  if (!ex.markets[symbol]) {
    console.error(`Symbol ${symbol} not found on Binance. Example: BTC/USDT`);
    process.exit(1);
  }

  // Determine fetch window
  let effectiveSince = since;
  let effectiveLimit = limit;

  // If no since provided, check database for latest timestamp
  if (!effectiveSince) {
    try {
      const latestTs = await getLatestTimestamp(symbol, timeframe, speed!);
      if (latestTs) {
        effectiveSince = latestTs.getTime() + tfMs; // Start from next candle
        console.log(`Found existing data. Starting from ${new Date(effectiveSince).toISOString()}`);
      } else {
        // Default to 1 year back for initial backfill
        effectiveSince = Date.now() - 365 * 24 * 60 * 60 * 1000;
        console.log(`No existing data found. Starting backfill from ${new Date(effectiveSince).toISOString()}`);
      }
    } catch (error) {
      console.warn('Failed to check latest timestamp, using default since:', error);
      effectiveSince = Date.now() - 365 * 24 * 60 * 60 * 1000;
    }
  }

  if (!effectiveLimit) {
    effectiveLimit = 1500; // Binance default maximum
  }

  console.log(`Fetching OHLCV data since ${new Date(effectiveSince).toISOString()} (limit=${effectiveLimit})`);
  
  let totalProcessed = 0;
  let totalInserted = 0;
  const startTime = Date.now();

  try {
    // Fetch OHLCV data
    const t0 = Date.now();
    const ohlcv = await ex.fetchOHLCV(symbol, timeframe, effectiveSince, effectiveLimit);
    const t1 = Date.now();
    
    console.log(`Fetched ${ohlcv.length} candles in ${t1 - t0}ms`);

    if (ohlcv.length === 0) {
      console.log('No new candles to process.');
      return;
    }

    // Prepare data arrays for TBO computation
    const timestamps: number[] = [];
    const opens: number[] = [];
    const highs: number[] = [];
    const lows: number[] = [];
    const closes: number[] = [];
    const volumes: number[] = [];

    for (const [ts, o, h, l, c, v] of ohlcv) {
      timestamps.push(ts);
      opens.push(o);
      highs.push(h);
      lows.push(l);
      closes.push(c);
      volumes.push(v);
    }

    // Compute TBO indicators
    console.log('Computing TBO indicators...');
    const { series } = computeTBO(opens, highs, lows, closes, { speed: speed! });

    // Prepare rows for database insertion
    const rows: TBOBarRow[] = [];
    for (let i = 0; i < series.length; i++) {
      const bar = series[i];
      rows.push({
        symbol,
        timeframe,
        ts: new Date(timestamps[i]).toISOString(),
        speed: speed!,
        open: opens[i],
        high: highs[i],
        low: lows[i],
        close: closes[i],
        volume: volumes[i],
        tbo_fast: bar.TBO_Fast,
        tbo_mid_fast: bar.TBO_Mid_Fast,
        tbo_mid_slow: bar.TBO_Mid_Slow,
        tbo_slow: bar.TBO_Slow,
        open_long: bar.open_long,
        open_short: bar.open_short,
        close_long: bar.close_long,
        close_short: bar.close_short,
        crossup: bar.crossup,
        crossdown: bar.crossdown,
        breakout: bar.breakout,
        breakdown: bar.breakdown,
        support: bar.support,
        resistance: bar.resistance
      });
    }

    // Insert data in chunks
    console.log(`Inserting ${rows.length} rows in chunks of ${chunkSize}...`);
    
    for (let i = 0; i < rows.length; i += chunkSize!) {
      const chunk = rows.slice(i, i + chunkSize!);
      const chunkStart = Date.now();
      
      try {
        await upsertTBOBars(chunk);
        const chunkEnd = Date.now();
        
        totalProcessed += chunk.length;
        totalInserted += chunk.length;
        
        if (verbose) {
          console.log(`Inserted chunk ${Math.floor(i / chunkSize!) + 1}/${Math.ceil(rows.length / chunkSize!)} (${chunk.length} rows) in ${chunkEnd - chunkStart}ms`);
        }
      } catch (error) {
        console.error(`Failed to insert chunk starting at index ${i}:`, error);
        // Continue with next chunk on error
      }
    }

    const endTime = Date.now();
    const duration = (endTime - startTime) / 1000;
    
    console.log(`✅ Ingestion completed:`);
    console.log(`   Symbol: ${symbol}`);
    console.log(`   Timeframe: ${timeframe}`);
    console.log(`   Speed: ${speed!}`);
    console.log(`   Processed: ${totalProcessed} bars`);
    console.log(`   Inserted: ${totalInserted} bars`);
    console.log(`   Duration: ${duration.toFixed(2)}s`);
    console.log(`   Rate: ${(totalProcessed / duration).toFixed(2)} bars/sec`);

  } catch (error) {
    console.error('Ingestion failed:', error);
    process.exit(1);
  }
}

main().catch((error) => {
  console.error('Unhandled error:', error);
  process.exit(1);
});