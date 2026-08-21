import { supabase, isSupabaseConfigured } from '../lib/supabase';

export interface BusinessSettings {
  id: boolean;
  legal_name: string;
  display_name: string;
  email?: string | null;
  phone?: string | null;
  website?: string | null;
  address_line_1?: string | null;
  address_line_2?: string | null;
  city?: string | null;
  region?: string | null;
  postal_code?: string | null;
  country?: string | null;
  tax_id_label?: string | null;
  tax_id_value?: string | null;
  default_currency: string;
  payment_instructions?: string | null;
  invoice_footer?: string | null;
  created_at?: string;
  updated_at?: string;
}

export const defaultBusinessSettings: BusinessSettings = {
  id: true,
  legal_name: '',
  display_name: 'Magniar',
  email: '',
  phone: '',
  website: '',
  address_line_1: '',
  address_line_2: '',
  city: '',
  region: '',
  postal_code: '',
  country: '',
  tax_id_label: '',
  tax_id_value: '',
  default_currency: 'USD',
  payment_instructions: '',
  invoice_footer: '',
};

const requireSupabase = () => {
  if (!isSupabaseConfigured || !supabase) {
    throw new Error('Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.');
  }
  return supabase;
};

export async function getBusinessSettings(): Promise<BusinessSettings> {
  const db = requireSupabase();
  const { data, error } = await db
    .from('business_settings')
    .select('*')
    .eq('id', true)
    .maybeSingle();

  if (error) throw error;
  return data ? { ...defaultBusinessSettings, ...(data as BusinessSettings) } : defaultBusinessSettings;
}

export async function saveBusinessSettings(
  settings: BusinessSettings
): Promise<BusinessSettings> {
  const db = requireSupabase();
  const payload: BusinessSettings = {
    ...settings,
    id: true,
    legal_name: settings.legal_name.trim(),
    display_name: settings.display_name.trim() || 'Magniar',
    default_currency: settings.default_currency.trim().toUpperCase() || 'USD',
  };

  const { data, error } = await db
    .from('business_settings')
    .upsert(payload, { onConflict: 'id' })
    .select('*')
    .single();

  if (error) throw error;
  return { ...defaultBusinessSettings, ...(data as BusinessSettings) };
}
