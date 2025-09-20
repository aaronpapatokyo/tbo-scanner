# Add Supabase RLS, watermark-based paginated ingestion, read view, schedules, tests, and docs

Summary
This PR implements security hygiene, database hardening (RLS), robust ingestion with pagination + watermarking, a read-model view, scheduled jobs, initial tests, a health check, and documentation.

Key changes
- Security
  - Ensure .env files are ignored; add .env.example and notes about rotating the Service Role key.
- Database
  - supabase/migrations/20250920_01_create_tbo_bars.sql: idempotent tbo_bars table and index.
  - supabase/migrations/20250920_02_enable_rls.sql: enable RLS on public.tbo_bars (no public policies).
  - supabase/migrations/20250920_03_ingest_runs.sql: ingest_runs watermark table.
  - supabase/migrations/20250920_04_view_latest.sql: v_tbo_latest view for latest per (symbol,timeframe,speed).
- Ingestion
  - src/ingest/watermark.ts: get/set watermark.
  - src/ingest/ingest-range.ts: paginated OHLCV fetch via ccxt; upserts into tbo_bars; updates watermark.
  - src/ingest/ingest-all.ts: orchestrates ingestion for configured pairs; resumes from watermark.
  - config/ingest.json: default pair BTC/USDT 1d.
  - package.json: scripts ingest:range, ingest:all.
- Scheduling and CI
  - .github/workflows/ingest.yml: daily ingest at 00:05 UTC using Actions secrets.
  - .github/workflows/health.yml: hourly freshness check.
  - .github/workflows/ci.yml: basic CI + tests on push/PR.
- Observability
  - scripts/check-freshness.ts: staleness check against v_tbo_latest with timeframe-based tolerance.
- Tests
  - tests/smoke.spec.ts: minimal smoke test scaffolding; placeholder for computeTBO test.
- Docs
  - docs/ingestion.md: how-to for backfill, watermarks, schedules, and health checks.

How to test locally
- Ensure .env contains SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.
- Range backfill:
  npm run ingest:range -- --symbol=BTC/USDT --timeframe=1d --since=2024-01-01T00:00:00Z
- Resume from watermark:
  npm run ingest:all
- Health check:
  npm run check:freshness
- Tests:
  npm test

Security notes
- RLS enabled on public.tbo_bars; no public read policies.
- Service Role key must only live in Actions secrets; rotate if exposed.

Acceptance criteria
- ingest:range performs paginated requests and upserts; updates ingest_runs; prints JSON summary.
- ingest:all ingests at least one pair without error when secrets are present.
- v_tbo_latest returns latest per (symbol,timeframe,speed).
- Workflows present; CI runs tests.
- Docs cover setup, secrets, and troubleshooting.