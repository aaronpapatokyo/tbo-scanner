# Ingestion, watermarks, schedules, and health checks

## Secrets
Set repository-level Actions secrets:
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`

Do NOT commit `.env`. Use `.env.example` locally.

## Local backfill (range)
```bash
npm run ingest:range -- --symbol=BTC/USDT --timeframe=1d --since=2024-01-01T00:00:00Z
