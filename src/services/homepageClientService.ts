import { supabase, isSupabaseConfigured } from '../lib/supabase';

export interface HomepageClient {
  id: string;
  business_name: string;
  industry: string;
  homepage_label: string;
  website?: string | null;
  logo_url?: string | null;
}

export async function listHomepageClients(): Promise<HomepageClient[]> {
  if (!isSupabaseConfigured || !supabase) {
    return [];
  }

  const { data, error } = await supabase.rpc('list_homepage_clients');

  if (error) {
    console.error('Homepage client showcase load failed:', error);
    return [];
  }

  return (data || []) as HomepageClient[];
}
