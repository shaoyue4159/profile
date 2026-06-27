import { createClient, SupabaseClient } from '@supabase/supabase-js';

interface SupabaseCredentials {
  url: string;
  anonKey: string;
}

function getSupabaseCredentials(): SupabaseCredentials {
  const url = process.env.COZE_SUPABASE_URL;
  const anonKey = process.env.COZE_SUPABASE_ANON_KEY;

  if (!url) throw new Error('COZE_SUPABASE_URL is not set');
  if (!anonKey) throw new Error('COZE_SUPABASE_ANON_KEY is not set');

  return { url, anonKey };
}

function getSupabaseServiceRoleKey(): string | undefined {
  return process.env.COZE_SUPABASE_SERVICE_ROLE_KEY;
}

function getSupabaseClient(token?: string): SupabaseClient {
  const { url, anonKey } = getSupabaseCredentials();
  const key = token ? anonKey : (getSupabaseServiceRoleKey() ?? anonKey);

  return createClient(url, key, {
    global: token
      ? { headers: { Authorization: `Bearer ${token}` } }
      : undefined,
    db: { timeout: 60000 },
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

function loadEnv(): void {
  // Next.js and Vercel load environment variables before this module runs.
}

export {
  loadEnv,
  getSupabaseCredentials,
  getSupabaseServiceRoleKey,
  getSupabaseClient,
};
