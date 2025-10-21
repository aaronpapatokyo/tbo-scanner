const ccxt = require('ccxt');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

console.log('SUPABASE_URL:', process.env.SUPABASE_URL);
console.log('SUPABASE_KEY:', process.env.SUPABASE_KEY ? '[found]' : '[missing]');

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error("SUPABASE_URL and SUPABASE_KEY must be set in your .env file");
  process.exit(1);
}

// Config
const EXCHANGE = 'binance'; // or any ccxt-supported exchange
const SYMBOL = 'BTC/USDT';  // Change as desired
const TIMEFRAME = '1h';     // '1d', '5m', etc.
const LIMIT = 100;          // Number of bars to fetch (max 1000 for Binance)

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function main() {
  const exchange = new ccxt[EXCHANGE]();
  console.log(`Fetching ${LIMIT} bars for ${SYMBOL} (${TIMEFRAME}) from ${EXCHANGE}...`);
  const ohlcv = await exchange.fetchOHLCV(SYMBOL, TIMEFRAME, undefined, LIMIT);

  // Each ohlcv entry: [timestamp, open, high, low, close, volume]
  for (const [ts, open, high, low, close, volume] of ohlcv) {
    const { error } = await supabase
      .from('tbo_bars')
      .upsert([{
        symbol: SYMBOL,
        timeframe: TIMEFRAME,
        ts: new Date(ts).toISOString(),
        open,
        high,
        low,
        close,
        volume
        // Add other columns here as needed!
      }]);
    if (error) {
      console.error('Supabase upsert error:', error);
    }
  }
  console.log(`Inserted ${ohlcv.length} bars into Supabase!`);
}

main().catch(console.error);