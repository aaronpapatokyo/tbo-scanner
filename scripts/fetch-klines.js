const ccxt = require('ccxt');
const { createClient } = require('@supabase/supabase-js');

// TODO: Replace with your own Supabase credentials
const SUPABASE_URL = process.env.SUPABASE_URL || 'https://xuatwcayvmymqfhmxdcx.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_KEY || 'sb_secret_tlXe7rw9Sd4X6DUUleADVA_HPs4BCgM';

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