import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Create Supabase client with service role key for server-side operations
// Only create client if environment variables are available
export const supabase = supabaseUrl && supabaseServiceRoleKey 
  ? createClient(supabaseUrl, supabaseServiceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    })
  : null;

function ensureSupabaseClient() {
  if (!supabase) {
    throw new Error(
      'SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set in environment variables'
    );
  }
  return supabase;
}

// Type definitions for the tbo_bars table
export interface TBOBarRow {
  symbol: string;
  timeframe: string;
  ts: string; // ISO timestamp
  speed: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  tbo_fast: number;
  tbo_mid_fast: number;
  tbo_mid_slow: number;
  tbo_slow: number;
  open_long: boolean;
  open_short: boolean;
  close_long: boolean;
  close_short: boolean;
  crossup: boolean;
  crossdown: boolean;
  breakout: boolean;
  breakdown: boolean;
  support: number | null;
  resistance: number | null;
  created_at?: string;
  updated_at?: string;
}

/**
 * Upsert TBO bar data into the database
 * @param rows Array of TBO bar data to insert/update
 * @returns Promise resolving to operation result
 */
export async function upsertTBOBars(rows: TBOBarRow[]) {
  const client = ensureSupabaseClient();
  const { data, error } = await client
    .from('tbo_bars')
    .upsert(rows, {
      onConflict: 'symbol,timeframe,ts,speed',
      ignoreDuplicates: false
    });

  if (error) {
    throw new Error(`Failed to upsert TBO bars: ${error.message}`);
  }

  return data;
}

/**
 * Get TBO bars for a specific symbol and timeframe
 * @param symbol Trading pair symbol (e.g., 'BTC/USDT')
 * @param timeframe Timeframe (e.g., '1d', '4h')
 * @param speed TBO speed setting
 * @param limit Maximum number of records to return
 * @returns Promise resolving to TBO bar data
 */
export async function getTBOBars(
  symbol: string,
  timeframe: string,
  speed: string,
  limit: number = 100
) {
  const client = ensureSupabaseClient();
  const { data, error } = await client
    .from('tbo_bars')
    .select('*')
    .eq('symbol', symbol)
    .eq('timeframe', timeframe)
    .eq('speed', speed)
    .order('ts', { ascending: false })
    .limit(limit);

  if (error) {
    throw new Error(`Failed to fetch TBO bars: ${error.message}`);
  }

  return data as TBOBarRow[];
}

/**
 * Get the latest timestamp for a symbol/timeframe/speed combination
 * @param symbol Trading pair symbol
 * @param timeframe Timeframe
 * @param speed TBO speed setting
 * @returns Promise resolving to latest timestamp or null if no data exists
 */
export async function getLatestTimestamp(
  symbol: string,
  timeframe: string,
  speed: string
): Promise<Date | null> {
  const client = ensureSupabaseClient();
  const { data, error } = await client
    .from('tbo_bars')
    .select('ts')
    .eq('symbol', symbol)
    .eq('timeframe', timeframe)
    .eq('speed', speed)
    .order('ts', { ascending: false })
    .limit(1)
    .single();

  if (error && error.code !== 'PGRST116') { // PGRST116 is "no rows found"
    throw new Error(`Failed to fetch latest timestamp: ${error.message}`);
  }

  return data ? new Date(data.ts) : null;
}