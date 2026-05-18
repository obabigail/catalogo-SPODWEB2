import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey =
  process.env.REACT_APP_SUPABASE_ANON_KEY || process.env.REACT_APP_SUPABASE_KEY;

export const hasConfiguredSupabase = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = hasConfiguredSupabase
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;
