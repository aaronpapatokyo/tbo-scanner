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
