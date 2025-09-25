import { createClient, SupabaseClient } from "@supabase/supabase-js";

export function getServiceClient(): SupabaseClient {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url) throw new Error("Missing SUPABASE_URL env var.");
  if (!key) throw new Error("Missing SUPABASE_SERVICE_ROLE_KEY env var (service role key).");

  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: { headers: { "x-client-info": "tbo-scanner-ingest" } },
  });
}