import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || "https://xuatwcayvmymqfhmxdcx.supabase.co";
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_KEY || "your-anon-or-publishable-key-here";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);