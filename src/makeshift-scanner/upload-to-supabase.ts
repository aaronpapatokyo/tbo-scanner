import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';

function parseArgs() {
  const args = process.argv.slice(2);
  const opts: Record<string, string> = {};
  for (let i = 0; i < args.length; i++) {
    const a = args[i];
    if (a.startsWith('--')) {
      const key = a.slice(2);
      const val = args[i + 1] && !args[i + 1].startsWith('--') ? args[i + 1] : 'true';
      if (val !== 'true') i++;
      opts[key] = val;
    }
  }
  return opts;
}

function chunk<T>(arr: T[], size: number) {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

async function getTableColumns(supabase: any, schema: string, table: string): Promise<string[]> {
  const { data, error } = await supabase
    .from('information_schema.columns')
    .select('column_name')
    .eq('table_schema', schema)
    .eq('table_name', table)
    .order('ordinal_position', { ascending: true });

  if (error) {
    throw new Error(`Failed to fetch table columns: ${error.message ?? JSON.stringify(error)}`);
  }
  return (data ?? []).map((r: any) => r.column_name);
}

function toIsoTimestampAny(value: any): string | null {
  if (value === null || value === undefined) return null;
  // numbers (ms) or numeric strings
  if (typeof value === 'number' && Number.isFinite(value)) {
    return new Date(value).toISOString();
  }
  if (typeof value === 'string') {
    // pure digits -> ms since epoch
    if (/^\d+$/.test(value)) {
      const n = Number(value);
      if (Number.isFinite(n)) return new Date(n).toISOString();
    }
    const d = new Date(value);
    if (!isNaN(d.getTime())) return d.toISOString();
  }
  return null;
}

async function main() {
  const opts = parseArgs();
  const file = opts.file ?? './data/btc-usdt-1d.json';
  const batchSize = Number(opts.batch ?? 50);

  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SUPABASE_KEY = process.env.SUPABASE_KEY ?? process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!SUPABASE_URL || !SUPABASE_KEY) {
    console.error('Missing SUPABASE_URL or SUPABASE_KEY (or SUPABASE_SERVICE_ROLE_KEY) environment variables.');
    process.exit(1);
  }

  const fullPath = path.resolve(file);
  if (!fs.existsSync(fullPath)) {
    console.error('File not found:', fullPath);
    process.exit(1);
  }

  const payload = JSON.parse(fs.readFileSync(fullPath, 'utf-8'));
  const bars = payload.bars ?? payload.data ?? payload;
  if (!Array.isArray(bars) || bars.length === 0) {
    console.error('No bars found in file.');
    process.exit(1);
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {});

  // Get table column list and only keep keys that exist in the table
  let allowedColumns: string[] = [];
  try {
    allowedColumns = await getTableColumns(supabase, 'public', 'tbo_bars');
    if (!allowedColumns || allowedColumns.length === 0) {
      throw new Error('No columns returned for public.tbo_bars');
    }
  } catch (err: any) {
    console.error('Could not retrieve table columns from Supabase:', err.message ?? err);
    console.error('As a fallback, the uploader will strip unknown keys and ensure ts is provided.');
    // conservative fallback list (include ts since your DB requires it)
    allowedColumns = [
      'symbol','timeframe','ts','timestamp','open','high','low','close','volume',
      'inserted_at','updated_at','speed'
    ];
  }

  // Map scanner fields and ensure ts is non-null (convert to ISO timestamptz string when possible)
  const mappedRows: Record<string, any>[] = [];
  let skipped = 0;
  for (const b of bars) {
    const tsCandidate = toIsoTimestampAny(b.timestamp ?? b.ts ?? b.openTime ?? b.open_time);
    if (!tsCandidate) {
      // skip rows with no parsable timestamp to avoid NOT NULL violations
      skipped++;
      continue;
    }

    const mapped: Record<string, any> = {
      symbol: b.symbol,
      timeframe: b.timeframe,
      // populate both ts and timestamp where available; DB will only accept known columns
      ts: tsCandidate,
      timestamp: tsCandidate,
      open: b.open,
      high: b.high,
      low: b.low,
      close: b.close,
      volume: b.volume,
      // keep other scanner-provided fields if present; these will be pruned below if not allowed
      trades: b.trades ?? null,
      inserted_at: b.inserted_at ?? undefined,
      updated_at: b.updated_at ?? undefined,
      speed: b.speed ?? undefined,
    };

    // prune to only allowed columns and remove undefined values
    const pruned: Record<string, any> = {};
    for (const k of Object.keys(mapped)) {
      if (allowedColumns.includes(k) && mapped[k] !== undefined) {
        pruned[k] = mapped[k];
      }
    }
    mappedRows.push(pruned);
  }

  if (skipped > 0) {
    console.warn(`Skipped ${skipped} rows because no valid timestamp could be derived.`);
  }
  if (mappedRows.length === 0) {
    console.error('No rows to upload after filtering; aborting.');
    process.exit(1);
  }

  const chunks = chunk(mappedRows, batchSize);
  console.log(`Uploading ${mappedRows.length} rows to public.tbo_bars in ${chunks.length} batches (batchSize=${batchSize})...`);

  for (let i = 0; i < chunks.length; i++) {
    const batch = chunks[i];
    const { data, error } = await supabase
      .from('tbo_bars')
      .upsert(batch, { onConflict: 'symbol,timeframe,ts' });

    if (error) {
      console.error(`Batch ${i + 1}/${chunks.length} failed:`, error);
      process.exit(1);
    } else {
      console.log(`Batch ${i + 1}/${chunks.length} OK (${batch.length} rows).`);
    }
  }

  console.log('Upload complete.');
}

main().catch((err) => {
  console.error('Uploader error:', err);
  process.exit(1);
});