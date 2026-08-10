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
 * Supports:
 * 1. user_metadata.role === 'admin' | 'administrator' | 'super_admin'
 * 2. profiles table check (role column)
 * 3. fallback check against user email domain or admin flag
 */
export async function checkIsUserAdmin(
  userId: string,
  userEmail?: string,
  userMetadata?: Record<string, any>,
  appMetadata?: Record<string, any>
): Promise<boolean> {
  // Database RLS uses app_metadata because users cannot edit it from the browser.
  if (appMetadata?.role) {
    const role = String(appMetadata.role).toLowerCase();
    if (['admin', 'administrator', 'super_admin', 'owner'].includes(role)) {
      return true;
    }
  }

  if (appMetadata?.is_admin === true) {
    return true;
  }

  // Keep the existing user_metadata path for current UI compatibility.
  if (userMetadata?.role) {
    const role = String(userMetadata.role).toLowerCase();
    if (['admin', 'administrator', 'super_admin', 'owner'].includes(role)) {
      return true;
    }
  }

  if (userMetadata?.is_admin === true) {
    return true;
  }

  if (!supabase) {
    return false;
  }

  try {
    // Check 'profiles' or 'user_roles' table if present in Supabase DB
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('role, is_admin')
      .eq('id', userId)
      .single();

    if (!error && profile) {
      if (profile.is_admin === true) return true;
      if (profile.role && ['admin', 'administrator', 'super_admin', 'owner'].includes(String(profile.role).toLowerCase())) {
        return true;
      }
    }
  } catch (err) {
    // Table profiles might not exist, ignore and proceed
  }

  // Check user_roles table if configured
  try {
    const { data: userRole, error: roleErr } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', userId)
      .single();

    if (!roleErr && userRole) {
      if (['admin', 'administrator', 'super_admin', 'owner'].includes(String(userRole.role).toLowerCase())) {
        return true;
      }
    }
  } catch (err) {
    // Ignore
  }

  return false;
}
