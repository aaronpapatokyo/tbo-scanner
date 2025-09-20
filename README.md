# TBO Scanner (Starter)

This repo contains:
- TypeScript port of the TBO indicator (from your Pine Script)
- Technical Analysis utilities (EMA, SMA, RSI, Bollinger Bands)
- A CLI script to fetch Binance spot OHLCV with CCXT and compute TBO signals for validation
- Supabase schema and ingestion jobs for persistence

## Prerequisites
- Node.js 18+
- pnpm or npm
- Supabase project (for ingestion features)

## Setup
1. Copy `.env.example` to `.env`
2. Install deps
   - `pnpm install` (or `npm install`)
3. Run a quick test:
   - `pnpm run tbo --symbol=BTC/USDT --timeframe=1h --since=2024-01-01`

This prints the latest computed TBO signals and key series values.

For Supabase ingestion:
4. Create a Supabase project at https://supabase.com
5. Update `.env` with your SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY
6. Run the schema: Execute `supabase/schema.sql` in your Supabase SQL editor

## Example
```bash
pnpm run tbo --symbol=ETH/USDT --timeframe=4h --limit=1000
```

Use TradingView with the same symbol/timeframe and compare signals visually. If anything looks off, please share a screenshot/time index and we’ll adjust.

## Notes on Parity
- The port preserves the Pine logic, including the exact TBO speeds, confirmation bars, and breakout/breakdown logic (including the MA_increasing/MA_decreasing behavior as written).
- Breakout method default is 'XL' as in the script.
- Support/Resistance use the same RSI thresholds (35/65) and last-crossover logic.

## Roadmap
- ✅ PR 1 (this): Indicator + CLI validator + Supabase bootstrap
- PR 2: Next.js scanner UI, filters for: Open Long, Open Short, Close Long, Close Short, Cross Up, Cross Down, Breakout, Breakdown, Resistance, Support, TBO Fast/Mid Fast/Mid Slow/Slow lines
- PR 3: Deploy to Vercel + Vercel Cron + expansion to more pairs

## Attribution
- TBO Pine Script © thebettertraders by kaio (https://github.com/kaiomp) under the Mozilla Public License 2.0. This repository includes a TypeScript port of the indicator logic with attribution per MPL 2.0 

## Inspect a specific bar (new)
Use `--at=YYYY-MM-DD` (UTC) and the CLI will fetch a warmup window and print the signals for that exact bar.

Examples:
```bash
# BTC/USDT daily — 2025-09-16 (with 400 warmup bars)
npm run tbo -- --symbol=BTC/USDT --timeframe=1d --at=2025-09-16 --warmup=400

# ETH/USDT daily — 2023-11-21 (default warmup 400)
npm run tbo -- --symbol=ETH/USDT --timeframe=1d --at=2023-11-21
```

Tip: Set TradingView’s timezone to UTC and ensure you’re on Binance spot (BTCUSDT) to match candles.
## Supabase Ingestion
Backfill historical data into Supabase for persistence and faster querying.

### Setup
1. Create a Supabase project
2. Run `supabase/schema.sql` to create the `tbo_bars` table
3. Set environment variables in `.env`:
   ```
   SUPABASE_URL=https://your-project-id.supabase.co
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
   ```

### Usage
```bash
# Backfill BTC/USDT daily data since June 1, 2025
npm run ingest:tbo -- --symbol=BTC/USDT --timeframe=1d --since=2025-06-01T00:00:00Z

# Backfill with custom settings
npm run ingest:tbo -- --symbol=ETH/USDT --timeframe=4h --since=2024-01-01T00:00:00Z --speed=Fast --verbose
```

**Ingestion flags:**
- `--symbol=SYMBOL` - Trading pair (e.g., BTC/USDT)
- `--timeframe=TF` - Timeframe (5m, 30m, 1h, 4h, 1d, 1w)
- `--since=ISO` - Start date (ISO format, e.g., 2025-06-01T00:00:00Z)
- `--limit=N` - Maximum candles to fetch (default: 1500)
- `--speed=SPEED` - TBO speed (Standard, Fast, Slow)
- `--chunkSize=N` - Database insert chunk size (default: 100)
- `--verbose` - Print detailed progress information

### Verification
After ingestion, verify data in Supabase:
```sql
-- Check total rows
SELECT COUNT(*) FROM public.tbo_bars;

-- View latest data
SELECT symbol, timeframe, speed, ts, close 
FROM public.tbo_bars 
ORDER BY ts DESC 
LIMIT 10;

-- Check for signals
SELECT symbol, timeframe, ts, open_long, open_short, breakout, breakdown
FROM public.tbo_bars 
WHERE open_long OR open_short OR breakout OR breakdown
ORDER BY ts DESC
LIMIT 20;
```