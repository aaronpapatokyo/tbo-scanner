/* eslint-disable no-console */
import 'dotenv/config';
import { ingestRange, IngestRangeParams } from './ingest-range';

function argVal(flag: string, def?: string) {
  const prefix = `--${flag}=`;
  const full = process.argv.find((a) => a.startsWith(prefix));
  if (full) return full.slice(prefix.length);
  const idx = process.argv.findIndex((a) => a === `--${flag}`);
  if (idx >= 0 && idx + 1 < process.argv.length) return process.argv[idx + 1];
  return def;
}

function splitCsv(s?: string) {
  if (!s) return [];
  return s
    .split(',')
    .map((x) => x.trim())
    .filter(Boolean);
}

async function runBatches<T>(items: T[], concurrency: number, worker: (t: T) => Promise<void>) {
  if (concurrency <= 1) {
    for (const it of items) {
      await worker(it);
    }
    return;
  }
  for (let i = 0; i < items.length; i += concurrency) {
    const batch = items.slice(i, i + concurrency);
    await Promise.all(batch.map((it) => worker(it)));
  }
}

async function main() {
  const symbols = splitCsv(argVal('symbols', 'BTC/USDT'));
  const timeframes = splitCsv(argVal('timeframes', '1d'));
  const sinceStr = argVal('since');
  const limitPerReq = Number(argVal('limitPerReq', '1000'));
  const speed = argVal('speed', 'Standard');
  const exchangeId = argVal('exchange', 'binance');
  const concurrency = Math.max(1, Number(argVal('concurrency', '1')) || 1);

  if (!sinceStr) {
    console.error('Missing --since; Usage: --since=2024-01-01T00:00:00Z');
    process.exit(1);
  }

  const since = new Date(sinceStr);
  if (!Number.isFinite(since.getTime())) {
    console.error('Invalid --since value:', sinceStr);
    process.exit(1);
  }

  const tasks: IngestRangeParams[] = [];
  for (const s of symbols) {
    for (const tf of timeframes) {
      tasks.push({
        symbol: s,
        timeframe: tf,
        since,
        limitPerReq,
        speed,
        exchangeId,
      });
    }
  }

  console.log(`Starting ingest-all for ${tasks.length} tasks (concurrency=${concurrency})`);
  let successes = 0;
  let failures = 0;

  const worker = async (t: IngestRangeParams) => {
    try {
      console.log(`Starting ingestRange ${t.symbol} ${t.timeframe}`);
      await ingestRange(t);
      successes++;
    } catch (err) {
      failures++;
      console.error(`Failed ingestRange for ${t.symbol} ${t.timeframe}:`, err);
    }
  };

  await runBatches(tasks, concurrency, worker);

  console.log(`ingest-all complete. successes=${successes}, failures=${failures}`);
  if (failures > 0) process.exitCode = 2;
}

/**
 * Run detection that also looks for CLI flags (covers tsx)
 */
const shouldRun = (() => {
  try {
    const scriptPath = process.argv[1] || '';
    const thisPath = new URL(import.meta.url).pathname;
    if (thisPath === scriptPath) return true;
    const fileName = thisPath.split('/').pop();
    if (fileName && scriptPath.endsWith(fileName)) return true;
    const cliFlags = ['--symbols', '--timeframes', '--since', '--limitPerReq', '--speed', '--exchange', '--concurrency'];
    if (process.argv.some(a => cliFlags.some(f => a === f || a.startsWith(f + '=')))) return true;
    return false;
  } catch {
    return false;
  }
})();

if (shouldRun) {
  main().catch((e) => {
    console.error(e);
    process.exit(1);
  });
}

export { main as ingestAll };