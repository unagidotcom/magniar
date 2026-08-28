import {
  Client,
  ClientStatus,
  ClientContact,
  ClientActivity,
  ClientNote,
  ClientHealth,
  PortalStatus,
} from '../types/clients';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

type ClientRow = {
  id: string;
  source_prospect_id?: string | null;
  source_request_id?: string | null;
  business_name: string;
  industry: string;
  business_model: string;
  company_size: string;
  primary_market: string;
  markets_served: string;
  website?: string | null;
  logo_url?: string | null;
  description: string;
  primary_objective: string;
  client_since: string;
  account_owner: string;
  status: ClientStatus;
  health: ClientHealth;
  health_reason?: string | null;
  pause_reason?: string | null;
  next_action: Client['next_action'];
  contacts: ClientContact[];
  services: Client['services'];
  platforms: Client['platforms'];
  projects: Client['projects'];
  activities: ClientActivity[];
  documents: Client['documents'];
  notes: ClientNote[];
  portal_status: PortalStatus;
  portal_invited_at?: string | null;
  show_on_homepage?: boolean;
  homepage_label?: string | null;
  homepage_order?: number;
  raw_client_data?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
};

const requireSupabase = () => {
  if (!isSupabaseConfigured || !supabase) {
    throw new Error('Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.');
  }
  return supabase;
};

const formatTimestamp = (value: string | null | undefined) => {
  if (!value) return '';
  return value.replace('T', ' ').substring(0, 16);
};

const normalizeClient = (row: ClientRow): Client => ({
  id: row.id,
  source_prospect_id: row.source_prospect_id || undefined,
  source_request_id: row.source_request_id || undefined,
  business_name: row.business_name,
  industry: row.industry,
  business_model: row.business_model,
  company_size: row.company_size,
  primary_market: row.primary_market,
  markets_served: row.markets_served,
  website: row.website || '',
  logo_url: row.logo_url || undefined,
  description: row.description || '',
  primary_objective: row.primary_objective || '',
  client_since: row.client_since,
  account_owner: row.account_owner,
  status: row.status,
  health: row.health,
  health_reason: row.health_reason || undefined,
  pause_reason: row.pause_reason || undefined,
  next_action: row.next_action || {
    title: 'Complete Account Onboarding & Setup',
    due_date: 'Next Week',
    owner: row.account_owner,
  },
  contacts: Array.isArray(row.contacts) ? row.contacts : [],
  services: Array.isArray(row.services) ? row.services : [],
  platforms: Array.isArray(row.platforms) ? row.platforms : [],
  projects: Array.isArray(row.projects) ? row.projects : [],
  activities: Array.isArray(row.activities) ? row.activities : [],
  documents: Array.isArray(row.documents) ? row.documents : [],
  notes: Array.isArray(row.notes) ? row.notes : [],
  portal_status: row.portal_status,
  portal_invited_at: row.portal_invited_at || undefined,
  show_on_homepage: row.show_on_homepage,
  homepage_label: row.homepage_label || undefined,
  homepage_order: row.homepage_order,
  created_at: formatTimestamp(row.created_at),
  updated_at: formatTimestamp(row.updated_at),
});

const buildActivity = (
  type: ClientActivity['type'],
  title: string,
  description: string,
  author = 'Magniar Admin'
): ClientActivity => ({
  id: `act-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
  type,
  title,
  description,
  timestamp: new Date().toLocaleDateString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  }),
  author,
});

const isMissingLogoUrlColumnError = (error: unknown) => {
  const message =
    typeof error === 'object' && error && 'message' in error
      ? String((error as { message?: unknown }).message || '')
      : String(error || '');

  return message.includes("'logo_url'") && message.includes("'clients'");
};

class ClientService {
  public async getClients(): Promise<Client[]> {
    const db = requireSupabase();
    const { data, error } = await db
      .from('clients')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return ((data || []) as ClientRow[]).map(normalizeClient);
  }

  public async getClient(id: string): Promise<Client | undefined> {
    const db = requireSupabase();
    const { data, error } = await db
      .from('clients')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) throw error;
    return data ? normalizeClient(data as ClientRow) : undefined;
  }

  public async createClient(newClientData: Partial<Client>): Promise<Client> {
    const db = requireSupabase();
    const primaryContact = newClientData.contacts?.[0];
    const nowLabel = new Date().toLocaleDateString('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
    });
    const accountOwner = newClientData.account_owner || 'Growth Team';

    const contacts = primaryContact
      ? [
          {
            ...primaryContact,
            id: primaryContact.id || `cnt-${Date.now()}`,
            is_primary: true,
          },
        ]
      : [];

    const payload: Record<string, unknown> = {
      source_prospect_id: newClientData.source_prospect_id || null,
      source_request_id: newClientData.source_request_id || null,
      business_name: newClientData.business_name || 'New Client Business',
      industry: newClientData.industry || 'E-COMMERCE',
      business_model: newClientData.business_model || 'DTC',
      company_size: newClientData.company_size || '10-50 employees',
      primary_market: newClientData.primary_market || 'North America',
      markets_served: newClientData.markets_served || 'US',
      website: newClientData.website || null,
      description: newClientData.description || '',
      primary_objective: newClientData.primary_objective || '',
      account_owner: accountOwner,
      status: newClientData.status || 'ONBOARDING',
      health: newClientData.health || 'HEALTHY',
      next_action: {
        title: 'Complete Account Onboarding & Setup',
        due_date: 'Next Week',
        owner: accountOwner,
      },
      contacts,
      services: newClientData.services || [],
      platforms: newClientData.platforms || [],
      projects: newClientData.projects || [],
      activities: [
        buildActivity(
          'CLIENT_CREATED',
          'Client Record Registered',
          'Client account created from Admin OS.',
          accountOwner
        ),
      ],
      documents: [],
      notes: [
        {
          id: `nt-${Date.now()}`,
          text: newClientData.notes?.[0]?.text || 'Initial account setup note.',
          author: accountOwner,
          created_at: nowLabel,
          visibility: 'INTERNAL',
        },
      ],
      portal_status: 'NOT_INVITED',
      show_on_homepage: true,
      homepage_label: newClientData.business_model || newClientData.industry || null,
      raw_client_data: newClientData,
    };

    if (typeof newClientData.logo_url === 'string' && newClientData.logo_url.trim()) {
      payload.logo_url = newClientData.logo_url.trim();
    }

    let { data, error } = await db.from('clients').insert(payload).select('*').single();

    if (error && isMissingLogoUrlColumnError(error) && 'logo_url' in payload) {
      const fallbackPayload = { ...payload };
      delete fallbackPayload.logo_url;
      const fallbackResult = await db.from('clients').insert(fallbackPayload).select('*').single();
      data = fallbackResult.data;
      error = fallbackResult.error;
    }

    if (error) throw error;
    return normalizeClient(data as ClientRow);
  }

  public async updateStatus(
    id: string,
    newStatus: ClientStatus,
    reason?: string
  ): Promise<Client | undefined> {
    const current = await this.getClient(id);
    if (!current) return undefined;

    const health: ClientHealth =
      newStatus === 'PAUSED'
        ? 'PAUSED'
        : newStatus === 'ATTENTION'
          ? 'ATTENTION'
          : 'HEALTHY';

    const activities = [
      buildActivity(
        'STATUS_CHANGE',
        `Client Status Changed: ${current.status} -> ${newStatus}`,
        reason ? `Status changed to ${newStatus}. Reason: ${reason}` : `Status changed to ${newStatus}.`
      ),
      ...current.activities,
    ];

    const db = requireSupabase();
    const { data, error } = await db
      .from('clients')
      .update({
        status: newStatus,
        health,
        pause_reason: newStatus === 'PAUSED' ? reason || 'Client account paused.' : null,
        health_reason: newStatus === 'ATTENTION' ? reason || 'Attention required on account.' : null,
        activities,
      })
      .eq('id', id)
      .select('*')
      .single();

    if (error) throw error;
    return data ? normalizeClient(data as ClientRow) : undefined;
  }

  public async addContact(
    clientId: string,
    contact: Omit<ClientContact, 'id'>
  ): Promise<ClientContact | undefined> {
    const current = await this.getClient(clientId);
    if (!current) return undefined;

    const newContact: ClientContact = {
      ...contact,
      id: `cnt-${Date.now()}`,
    };

    const contacts = contact.is_primary
      ? current.contacts.map((c) => ({ ...c, is_primary: false })).concat(newContact)
      : current.contacts.concat(newContact);

    const activities = [
      buildActivity(
        'CONTACT_ADDED',
        `New Contact Added: ${newContact.name}`,
        `Added ${newContact.name} (${newContact.role}) to client contacts.`
      ),
      ...current.activities,
    ];

    const db = requireSupabase();
    const { error } = await db
      .from('clients')
      .update({ contacts, activities })
      .eq('id', clientId);

    if (error) throw error;
    return newContact;
  }

  public async addNote(
    clientId: string,
    text: string,
    author = 'Magniar Admin'
  ): Promise<ClientNote | undefined> {
    const current = await this.getClient(clientId);
    if (!current) return undefined;

    const newNote: ClientNote = {
      id: `nt-${Date.now()}`,
      text,
      author,
      created_at: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric',
      }),
      visibility: 'INTERNAL',
    };

    const notes = [newNote, ...current.notes];
    const activities = [
      buildActivity('NOTE', 'Internal Account Note Added', text, author),
      ...current.activities,
    ];

    const db = requireSupabase();
    const { error } = await db
      .from('clients')
      .update({ notes, activities })
      .eq('id', clientId);

    if (error) throw error;
    return newNote;
  }

  public async invitePortal(clientId: string): Promise<boolean> {
    const current = await this.getClient(clientId);
    if (!current) return false;

    const invitedAt = new Date().toLocaleDateString('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
    });
    const activities = [
      buildActivity(
        'NOTE',
        'Client Portal Invitation Issued',
        'Portal invitation marked as issued.',
      ),
      ...current.activities,
    ];

    const db = requireSupabase();
    const { error } = await db
      .from('clients')
      .update({
        portal_status: 'INVITED',
        portal_invited_at: invitedAt,
        activities,
      })
      .eq('id', clientId);

    if (error) throw error;
    return true;
  }
}

export const clientService = new ClientService();
