const ccxt = require('ccxt');
const { createClient } = require('@supabase/supabase-js');

// TODO: Replace with your own Supabase credentials
const SUPABASE_URL = process.env.SUPABASE_URL || 'https://xuatwcayvmymqfhmxdcx.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh1YXR3Y2F5dm15bXFmaG14ZGN4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgyNjMwNDAsImV4cCI6MjA3MzgzOTA0MH0.ARB9M0gygiBde5euHnN7KFOX3PrJsonD3RdkneNFR7I';

// Example config
const EXCHANGE = 'binance';
const SYMBOL = 'BTC/USDT';
const TIMEFRAME = '1h'; // or '1d', '5m', etc.
const LIMIT = 100; // Number of bars to fetch

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function main() {
  const exchange = new ccxt[EXCHANGE]();
  const ohlcv = await exchange.fetchOHLCV(SYMBOL, TIMEFRAME, undefined, LIMIT);

  // Each ohlcv entry: [timestamp, open, high, low, close, volume]
  for (const [ts, open, high, low, close, volume] of ohlcv) {
    const { error } = await supabase
      .from('tbo_bars') // <-- your table name
      .upsert([{
        symbol: SYMBOL,
        timeframe: TIMEFRAME,
        ts: new Date(ts).toISOString(),
        open,
        high,
        low,
        close,
        volume
      }]);

    if (error) {
      console.error('Supabase upsert error:', error);
    }
  }

  console.log(`Inserted ${ohlcv.length} bars into Supabase!`);
}

main().catch(console.error);