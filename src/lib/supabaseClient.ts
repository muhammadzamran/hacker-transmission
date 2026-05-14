// ==========================================
// File: src/lib/supabaseClient.ts
// Purpose: Configures and exports the Supabase client for Authentication.
// Beginner Note: Supabase requires a URL and an Anon Key. We provide fallback mock mode
// so you can test the simulation instantly without setup!
// ==========================================

import { createClient } from '@supabase/supabase-js';

// Default public demo keys or empty strings to allow user input / fallback
const env = (import.meta as unknown as { env: Record<string, string> }).env || {};

const supabaseUrl = env.VITE_SUPABASE_URL || 'https://xyzcompany.supabase.co';
const supabaseAnonKey = env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.demo.key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// We also provide a helper to check if real credentials are provided
export const hasValidSupabaseKeys = () => {
  return Boolean(env.VITE_SUPABASE_URL && env.VITE_SUPABASE_ANON_KEY);
};
