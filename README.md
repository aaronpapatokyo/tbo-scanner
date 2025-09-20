# TBO Scanner (Starter)

This repo contains:
- TypeScript port of the TBO indicator (from your Pine Script)
- Technical Analysis utilities (EMA, SMA, RSI, Bollinger Bands)
- A CLI script to fetch Binance spot OHLCV with CCXT and compute TBO signals for validation

Next steps (planned in follow-up PRs):
- Supabase schema and ingestion jobs
- Next.js app with a scanner UI and filters for TBO signals

## Prerequisites
- Node.js 18+
- pnpm or npm

## Setup
1. Copy `.env.example` to `.env`
2. Install deps
   - `pnpm install` (or `npm install`)
3. Run a quick test:
   - `pnpm run tbo --symbol=BTC/USDT --timeframe=1h --since=2024-01-01`

This prints the latest computed TBO signals and key series values.

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
- PR 1 (this): Indicator + CLI validator
- PR 2: Supabase schema + ingestion (CCXT batch for Binance USDT spot + timeframes: 5m, 30m, 1h, 4h, 1d, 1w)
- PR 3: Next.js scanner UI, filters for: Open Long, Open Short, Close Long, Close Short, Cross Up, Cross Down, Breakout, Breakdown, Resistance, Support, TBO Fast/Mid Fast/Mid Slow/Slow lines
- PR 4: Deploy to Vercel + Vercel Cron + expansion to more pairs

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