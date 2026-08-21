import { supabase, isSupabaseConfigured } from '../lib/supabase';

export interface AdminDisplayProfile {
  displayName: string;
  displayEmail: string;
  roleLabel: string;
}

export const defaultAdminDisplayProfile: AdminDisplayProfile = {
  displayName: 'Administrator',
  displayEmail: '',
  roleLabel: 'Super Admin',
};

const requireSupabase = () => {
  if (!isSupabaseConfigured || !supabase) {
    throw new Error('Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.');
  }
  return supabase;
};

export function initialsForName(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return 'AD';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}

export async function getCurrentAdminDisplayProfile(): Promise<AdminDisplayProfile> {
  const db = requireSupabase();
  const {
    data: { user },
    error,
  } = await db.auth.getUser();

  if (error) throw error;

  const metadata = user?.user_metadata || {};
  const authEmail = user?.email || '';
  const displayName =
    metadata.admin_display_name ||
    metadata.display_name ||
    metadata.full_name ||
    defaultAdminDisplayProfile.displayName;
  const displayEmail = metadata.admin_display_email || authEmail;
  const roleLabel = metadata.admin_role_label || defaultAdminDisplayProfile.roleLabel;

  return {
    displayName,
    displayEmail,
    roleLabel,
  };
}

export async function saveCurrentAdminDisplayProfile(
  profile: AdminDisplayProfile
): Promise<AdminDisplayProfile> {
  const db = requireSupabase();
  const {
    data: { user },
    error: userError,
  } = await db.auth.getUser();

  if (userError) throw userError;
  if (!user) throw new Error('No authenticated admin session found.');

  const nextProfile = {
    displayName: profile.displayName.trim() || defaultAdminDisplayProfile.displayName,
    displayEmail: profile.displayEmail.trim() || user.email || '',
    roleLabel: profile.roleLabel.trim() || defaultAdminDisplayProfile.roleLabel,
  };

  const { error } = await db.auth.updateUser({
    data: {
      ...user.user_metadata,
      admin_display_name: nextProfile.displayName,
      admin_display_email: nextProfile.displayEmail,
      admin_role_label: nextProfile.roleLabel,
    },
  });

  if (error) throw error;
  return nextProfile;
}
