create table if not exists public.ingest_runs (
  symbol       text        not null,
  timeframe    text        not null,
  speed        text        not null default 'Standard',
  last_ts      timestamptz,
  last_status  text,
  updated_at   timestamptz not null default now(),
  constraint ingest_runs_pk primary key (symbol, timeframe, speed)
);
create index if not exists ingest_runs_updated_at_idx
  on public.ingest_runs (updated_at desc);
