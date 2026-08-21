import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl !== 'MY_SUPABASE_URL' && 
  supabaseAnonKey !== 'MY_SUPABASE_ANON_KEY'
);

let clientInstance: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient | null {
  if (!isSupabaseConfigured) {
    return null;
  }
  if (!clientInstance) {
    clientInstance = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    });
  }
  return clientInstance;
}

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    })
  : null;

/**
 * Check if a given user has administrator permissions.
 * This must match database RLS: only app_metadata is trusted because users cannot
 * edit it from the browser.
 */
export async function checkIsUserAdmin(
  _userId: string,
  _userEmail?: string,
  _userMetadata?: Record<string, any>,
  appMetadata?: Record<string, any>
): Promise<boolean> {
  if (appMetadata?.role) {
    const role = String(appMetadata.role).toLowerCase();
    if (['admin', 'administrator', 'super_admin', 'owner'].includes(role)) {
      return true;
    }
  }

  if (appMetadata?.is_admin === true) {
    return true;
  }

  return false;
}
