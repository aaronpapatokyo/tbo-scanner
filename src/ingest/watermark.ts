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
