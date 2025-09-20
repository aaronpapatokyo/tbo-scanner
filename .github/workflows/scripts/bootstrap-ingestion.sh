#!/usr/bin/env bash
set -euo pipefail

echo "Scaffolding ingestion, RLS, view, schedules, health, tests, and docs..."

mkdir -p supabase/migrations src/ingest scripts config .github/workflows tests docs

# --- SQL migrations ---
cat > supabase/migrations/20250920_01_create_tbo_bars.sql <<'SQL'
create table if not exists public.tbo_bars (
  symbol      text            not null,
  timeframe   text            not null,
  speed       text            not null default 'Standard',
  ts          timestamptz     not null,
  open        double precision not null,
  high        double precision not null,
  low         double precision not null,
  close       double precision not null,
  volume      double precision,
  exchange    text            not null default 'binance',
  inserted_at timestamptz     not null default now(),
  updated_at  timestamptz     not null default now(),
  constraint tbo_bars_pk primary key (symbol, timeframe, speed, ts)
);
create index if not exists tbo_bars_symbol_tf_speed_ts_idx
  on public.tbo_bars (symbol, timeframe, speed, ts desc);
SQL

cat > supabase/migrations/20250920_02_enable_rls.sql <<'SQL'
do $$
begin
  if exists (
    select 1 from information_schema.tables
    where table_schema = 'public' and table_name = 'tbo_bars'
  ) then
    execute 'alter table public.tbo_bars enable row level security';
  end if;
end $$;
SQL

cat > supabase/migrations/20250920_03_ingest_runs.sql <<'SQL'
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
SQL

cat > supabase/migrations/20250920_04_view_latest.sql <<'SQL'
create or replace view public.v_tbo_latest as
select distinct on (symbol, timeframe, speed)
  symbol, timeframe, speed, ts, open, high, low, close, volume, exchange, inserted_at, updated_at
from public.tbo_bars
order by symbol, timeframe, speed, ts desc;
SQL

# --- TypeScript ingestion helpers and CLIs ---
cat > src/ingest/supabaseClient.ts <<'TS'
import { createClient, SupabaseClient } from '@supabase/supabase-js';

let cached: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient {
  if (cached) return cached;
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in environment.');
  }
  cached = createClient(url, key, { auth: { persistSession: false } });
  return cached;
}
TS

cat > src/ingest/watermark.ts <<'TS'
import { getSupabase } from './supabaseClient';

export type WatermarkKey = {
  symbol: string;
  timeframe: string;
  speed: string;
};

export async function getWatermark(key: WatermarkKey): Promise<Date | null> {
  const sb = getSupabase();
  const { data, error } = await sb
    .from('ingest_runs')
    .select('last_ts')
    .eq('symbol', key.symbol)
    .eq('timeframe', key.timeframe)
    .eq('speed', key.speed)
    .maybeSingle();

  if (error) throw error;
  return data?.last_ts ? new Date(data.last_ts) : null;
}

export async function setWatermark(
  key: WatermarkKey,
  lastTs: Date,
  status: string = 'ok'
): Promise<void> {
  const sb = getSupabase();
  const { error } = await sb
    .from('ingest_runs')
    .upsert(
      {
        symbol: key.symbol,
        timeframe: key.timeframe,
        speed: key.speed,
        last_ts: lastTs.toISOString(),
        last_status: status,
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'symbol,timeframe,speed' }
    );
  if (error) throw error;
}
TS

cat > src/ingest/ingest-range.ts <<'TS'
/* eslint-disable no-console */
import 'dotenv/config';
import ccxt from 'ccxt';
import { getSupabase } from './supabaseClient';
import { setWatermark } from './watermark';

function argVal(flag: string, def?: string) {
  const f = process.argv.find((a) => a.startsWith(\`--\${flag}=\`));
  return f ? f.split('=').slice(1).join('=').trim() : def;
}

const TF_MS: Record<string, number> = {
  '1m': 60_000,
  '5m': 300_000,
  '15m': 900_000,
  '1h': 3_600_000,
  '4h': 14_400_000,
  '1d': 86_400_000,
  '1w': 604_800_000,
};

export type IngestRangeParams = {
  symbol: string;
  timeframe: string;
  since: Date;
  until?: Date;
  limitPerReq?: number;
  speed?: string;
  exchangeId?: string;
};

export async function ingestRange(params: IngestRangeParams) {
  const {
    symbol,
    timeframe,
    since,
    until = new Date(),
    limitPerReq = 1000,
    speed = 'Standard',
    exchangeId = 'binance',
  } = params;

  const tfMs = TF_MS[timeframe];
  if (!tfMs) throw new Error(\`Unsupported timeframe: \${timeframe}\`);

  const exchangeCls = (ccxt as any)[exchangeId];
  if (!exchangeCls) throw new Error(\`Unknown exchange: \${exchangeId}\`);
  const exchange = new exchangeCls({ enableRateLimit: true });

  const sb = getSupabase();

  let cursor = since.getTime();
  const end = until.getTime();

  let total = 0;
  let firstTs: number | null = null;
  let lastTs: number | null = null;

  while (cursor <= end) {
    const limit = Math.min(limitPerReq, 1500);
    const batch = await exchange.fetchOHLCV(symbol, timeframe, cursor, limit);
    if (!batch || batch.length === 0) break;

    const rows = batch.map((b: any[]) => {
      const [t, o, h, l, c, v] = b;
      firstTs ??= t;
      lastTs = t;
      return {
        symbol,
        timeframe,
        speed,
        ts: new Date(t).toISOString(),
        open: Number(o),
        high: Number(h),
        low: Number(l),
        close: Number(c),
        volume: v == null ? null : Number(v),
        exchange: exchangeId,
        updated_at: new Date().toISOString(),
      };
    });

    const chunkSize = 1000;
    for (let i = 0; i < rows.length; i += chunkSize) {
      const chunk = rows.slice(i, i + chunkSize);
      const { error } = await sb
        .from('tbo_bars')
        .upsert(chunk, {
          onConflict: 'symbol,timeframe,speed,ts',
          ignoreDuplicates: false,
        });
      if (error) throw error;
    }

    total += rows.length;

    const next = (lastTs as number) + tfMs;
    cursor = next <= cursor ? cursor + tfMs : next;

    if (speed !== 'Fast') await new Promise((r) => setTimeout(r, 500));
  }

  if (lastTs != null) {
    await setWatermark({ symbol, timeframe, speed }, new Date(lastTs));
  }

  const summary = {
    symbol,
    timeframe,
    speed,
    totalRowsUpserted: total,
    firstTs: firstTs ? new Date(firstTs).toISOString() : null,
    lastTs: lastTs ? new Date(lastTs).toISOString() : null,
  };
  console.log(JSON.stringify(summary, null, 2));
  return summary;
}

if (require.main === module) {
  const symbol = argVal('symbol');
  const timeframe = argVal('timeframe');
  const sinceStr = argVal('since');
  const untilStr = argVal('until');
  const limitPerReq = Number(argVal('limitPerReq', '1000'));
  const speed = argVal('speed', 'Standard');
  const exchangeId = argVal('exchange', 'binance');

  if (!symbol || !timeframe || !sinceStr) {
    console.error('Usage: tsx src/ingest/ingest-range.ts --symbol=BTC/USDT --timeframe=1d --since=2024-01-01T00:00:00Z [--until=ISO] [--limitPerReq=1000] [--speed=Standard|Fast] [--exchange=binance]');
    process.exit(1);
  }

  ingestRange({
    symbol,
    timeframe,
    since: new Date(sinceStr),
    until: untilStr ? new Date(untilStr) : undefined,
    limitPerReq,
    speed,
    exchangeId,
  }).catch((e) => {
    console.error(e);
    process.exit(1);
  });
}
TS

cat > src/ingest/ingest-all.ts <<'TS'
/* eslint-disable no-console */
import 'dotenv/config';
import fs from 'node:fs';
import path from 'node:path';
import { getWatermark } from './watermark';
import { ingestRange } from './ingest-range';

type Pair = { symbol: string; timeframe: string; speed?: string };

function argVal(flag: string) {
  const f = process.argv.find((a) => a.startsWith(\`--\${flag}=\`));
  return f ? f.split('=').slice(1).join('=').trim() : undefined;
}

const root = process.cwd();
const cfgPath = path.join(root, 'config', 'ingest.json');

function loadPairs(): Pair[] {
  if (!fs.existsSync(cfgPath)) {
    return [{ symbol: 'BTC/USDT', timeframe: '1d', speed: 'Standard' }];
  }
  const raw = fs.readFileSync(cfgPath, 'utf8');
  return JSON.parse(raw);
}

(async () => {
  const sinceOverride = argVal('since');
  the untilOverride = argVal('until');

  const pairs = loadPairs();
  const results: any[] = [];

  for (const p of pairs) {
    const speed = p.speed ?? 'Standard';
    let since: Date;

    if (sinceOverride) {
      since = new Date(sinceOverride);
    } else {
      const wm = await getWatermark({
        symbol: p.symbol,
        timeframe: p.timeframe,
        speed,
      });
      since = wm ?? new Date(Date.now() - 90 * 24 * 3600_000);
    }

    const until = untilOverride ? new Date(untilOverride) : undefined;

    console.log(
      \`Ingesting \${p.symbol} \${p.timeframe} (\${speed}) from \${since.toISOString()}\${until ? ' to ' + until.toISOString() : ''}\`
    );

    const r = await ingestRange({
      symbol: p.symbol,
      timeframe: p.timeframe,
      speed,
      since,
      until,
    });
    results.push(r);
  }

  console.log(JSON.stringify({ results }, null, 2));
})();
TS

# --- Health check ---
cat > scripts/check-freshness.ts <<'TS'
/* eslint-disable no-console */
import 'dotenv/config';
import { getSupabase } from '../src/ingest/supabaseClient';
import fs from 'node:fs';
import path from 'node:path';

const TF_MS: Record<string, number> = {
  '1m': 60_000,
  '5m': 300_000,
  '15m': 900_000,
  '1h': 3_600_000,
  '4h': 14_400_000,
  '1d': 86_400_000,
  '1w': 604_800_000,
};

function toleranceMsFor(timeframe: string): number {
  return (TF_MS[timeframe] ?? 86_400_000) * 2;
}

type Pair = { symbol: string; timeframe: string; speed?: string };

function loadPairs(): Pair[] {
  const p = path.join(process.cwd(), 'config', 'ingest.json');
  if (!fs.existsSync(p)) return [{ symbol: 'BTC/USDT', timeframe: '1d', speed: 'Standard' }];
  return JSON.parse(fs.readFileSync(p, 'utf8'));
}

(async () => {
  const sb = getSupabase();
  const pairs = loadPairs();

  const failures: string[] = [];

  for (const p of pairs) {
    const speed = p.speed ?? 'Standard';
    const { data, error } = await sb
      .from('v_tbo_latest')
      .select('symbol,timeframe,speed,ts')
      .eq('symbol', p.symbol)
      .eq('timeframe', p.timeframe)
      .eq('speed', speed)
      .maybeSingle();

    if (error) throw error;
    if (!data?.ts) {
      failures.push(\`\${p.symbol} \${p.timeframe} (\${speed}): no data\`);
      continue;
    }
    const latest = new Date(data.ts).getTime();
    const age = Date.now() - latest;
    const tol = toleranceMsFor(p.timeframe);

    if (age > tol) {
      failures.push(
        \`\${p.symbol} \${p.timeframe} (\${speed}) stale by \${(age / 3600_000).toFixed(
          2
        )}h (tol \${(tol / 3600_000).toFixed(2)}h)\`
      );
    } else {
      console.log(
        \`\${p.symbol} \${p.timeframe} (\${speed}) OK; age \${(age / 3600_000).toFixed(2)}h <= tol \${(tol / 3600_000).toFixed(2)}h\`
      );
    }
  }

  if (failures.length) {
    console.error('Staleness failures:\n' + failures.map((f) => '- ' + f).join('\n'));
    process.exit(1);
  }
  console.log('Freshness OK');
})();
TS

# --- Config ---
cat > config/ingest.json <<'JSON'
[
  { "symbol": "BTC/USDT", "timeframe": "1d", "speed": "Standard" }
]
JSON

# --- GitHub Actions workflows ---
cat > .github/workflows/ingest.yml <<'YML'
name: Ingest
on:
  schedule:
    - cron: '5 0 * * *'
  workflow_dispatch:

jobs:
  ingest:
    runs-on: ubuntu-latest
    env:
      SUPABASE_URL: ${{ secrets.SUPABASE_URL }}
      SUPABASE_SERVICE_ROLE_KEY: ${{ secrets.SUPABASE_SERVICE_ROLE_KEY }}
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run ingest:all
YML

cat > .github/workflows/health.yml <<'YML'
name: Health
on:
  schedule:
    - cron: '0 * * * *'
  workflow_dispatch:

jobs:
  health:
    runs-on: ubuntu-latest
    env:
      SUPABASE_URL: ${{ secrets.SUPABASE_URL }}
      SUPABASE_SERVICE_ROLE_KEY: ${{ secrets.SUPABASE_SERVICE_ROLE_KEY }}
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run check:freshness
YML

cat > .github/workflows/ci.yml <<'YML'
name: CI
on:
  push:
    branches: ['**']
  pull_request:

jobs:
  ci:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm test -- --reporter=dot
YML

# --- Tests ---
cat > tests/smoke.spec.ts <<'TS'
import { describe, it, expect } from 'vitest';

describe('smoke', () => {
  it('works', () => {
    expect(1 + 1).toBe(2);
  });

  it.skip('computes TBO over fixture OHLCV', async () => {
    // TODO: import computeTBO and assert shape
  });
});
TS

# --- Docs ---
cat > docs/ingestion.md <<'MD'
# Ingestion, watermarks, schedules, and health checks

## Secrets
Set repository-level Actions secrets:
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`

Do NOT commit `.env`. Use `.env.example` locally.

## Local backfill (range)
```bash
npm run ingest:range -- --symbol=BTC/USDT --timeframe=1d --since=2024-01-01T00:00:00Z