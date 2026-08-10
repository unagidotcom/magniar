import { Client, ClientStatus, ClientContact, ClientActivity, ClientNote } from '../types/clients';
import { MOCK_CLIENTS } from '../data/mockClientsData';

class ClientService {
  private clients: Client[] = [...MOCK_CLIENTS];

  public getClients(): Client[] {
    return [...this.clients];
  }

  public getClient(id: string): Client | undefined {
    return this.clients.find(
      (c) => c.id === id || c.id.toLowerCase() === id.toLowerCase()
    );
  }

  public createClient(newClientData: Partial<Client>): Client {
    const nextNum = this.clients.length + 8;
    const newId = `MG-CL-2026-${String(nextNum).padStart(3, '0')}`;
    const now = new Date().toISOString().replace('T', ' ').substring(0, 16);

    const primaryContact: ClientContact = {
      id: `cnt-${Date.now()}`,
      name: newClientData.contacts?.[0]?.name || 'Primary Contact',
      role: newClientData.contacts?.[0]?.role || 'Founder',
      email: newClientData.contacts?.[0]?.email || 'contact@example.com',
      phone: newClientData.contacts?.[0]?.phone || '',
      is_primary: true,
      notes: 'Initial primary contact created during client setup.',
    };

    const created: Client = {
      id: newId,
      source_prospect_id: newClientData.source_prospect_id || undefined,
      source_request_id: newClientData.source_request_id || undefined,
      business_name: newClientData.business_name || 'New Client Business',
      industry: newClientData.industry || 'E-COMMERCE',
      business_model: newClientData.business_model || 'DTC',
      company_size: newClientData.company_size || '10-50 employees',
      primary_market: newClientData.primary_market || 'North America',
      markets_served: newClientData.markets_served || 'US',
      website: newClientData.website || 'https://example.com',
      description:
        newClientData.description || 'Newly registered client business in Magniar OS.',
      primary_objective:
        newClientData.primary_objective || 'Scale cross-channel growth & digital infrastructure.',
      client_since: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      account_owner: newClientData.account_owner || 'Growth Team',
      status: newClientData.status || 'ONBOARDING',
      health: 'HEALTHY',
      next_action: {
        title: 'Complete Account Onboarding & Setup',
        due_date: 'Next Week',
        owner: newClientData.account_owner || 'Growth Team',
      },
      contacts: newClientData.contacts && newClientData.contacts.length > 0 ? newClientData.contacts : [primaryContact],
      services: newClientData.services || [
        {
          id: `srv-${Date.now()}`,
          name: 'Meta Ads Management',
          status: 'ACTIVE',
          owner: 'Performance Media Team',
          started_at: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
          associated_projects_count: 1,
          monthly_fee_display: '$5,000 / mo',
        },
      ],
      platforms: newClientData.platforms || [
        { name: 'Meta Ads Manager', category: 'ADS', status: 'PENDING' },
        { name: 'Google Ads', category: 'ADS', status: 'PENDING' },
      ],
      projects: [],
      activities: [
        {
          id: `act-${Date.now()}`,
          type: 'CLIENT_CREATED',
          title: 'Client Record Registered',
          description: `Client record ${newId} created in Clients Directory.`,
          timestamp: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
          author: 'Kaelen Voss',
        },
      ],
      documents: [],
      notes: [
        {
          id: `nt-${Date.now()}`,
          text: newClientData.notes?.[0]?.text || 'Initial account setup note.',
          author: 'Kaelen Voss',
          created_at: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
          visibility: 'INTERNAL',
        },
      ],
      portal_status: 'NOT_INVITED',
      created_at: now,
      updated_at: now,
    };

    this.clients.unshift(created);
    return created;
  }

  public updateStatus(
    id: string,
    newStatus: ClientStatus,
    reason?: string
  ): Client | undefined {
    const client = this.getClient(id);
    if (!client) return undefined;

    const oldStatus = client.status;
    client.status = newStatus;
    if (newStatus === 'PAUSED') {
      client.health = 'PAUSED';
      client.pause_reason = reason || 'Client account paused.';
    } else if (newStatus === 'ATTENTION') {
      client.health = 'ATTENTION';
      client.health_reason = reason || 'Attention required on account.';
    } else if (newStatus === 'ACTIVE' || newStatus === 'ONBOARDING') {
      client.health = 'HEALTHY';
      client.health_reason = undefined;
      client.pause_reason = undefined;
    }
    client.updated_at = new Date().toISOString().replace('T', ' ').substring(0, 16);

    client.activities.unshift({
      id: `act-${Date.now()}`,
      type: 'STATUS_CHANGE',
      title: `Client Status Changed: ${oldStatus} → ${newStatus}`,
      description: reason ? `Status changed to ${newStatus}. Reason: ${reason}` : `Status changed to ${newStatus}.`,
      timestamp: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      author: 'Kaelen Voss',
    });

    return client;
  }

  public addContact(clientId: string, contact: Omit<ClientContact, 'id'>): ClientContact | undefined {
    const client = this.getClient(clientId);
    if (!client) return undefined;

    const newContact: ClientContact = {
      ...contact,
      id: `cnt-${Date.now()}`,
    };

    if (contact.is_primary) {
      client.contacts.forEach((c) => {
        c.is_primary = false;
      });
    }

    client.contacts.push(newContact);
    client.updated_at = new Date().toISOString().replace('T', ' ').substring(0, 16);

    client.activities.unshift({
      id: `act-${Date.now()}`,
      type: 'CONTACT_ADDED',
      title: `New Contact Added: ${newContact.name}`,
      description: `Added ${newContact.name} (${newContact.role}) to client contacts.`,
      timestamp: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      author: 'Kaelen Voss',
    });

    return newContact;
  }

  public addNote(clientId: string, text: string, author: string = 'Kaelen Voss'): ClientNote | undefined {
    const client = this.getClient(clientId);
    if (!client) return undefined;

    const newNote: ClientNote = {
      id: `nt-${Date.now()}`,
      text,
      author,
      created_at: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      visibility: 'INTERNAL',
    };

    client.notes.unshift(newNote);
    client.updated_at = new Date().toISOString().replace('T', ' ').substring(0, 16);

    client.activities.unshift({
      id: `act-${Date.now()}`,
      type: 'NOTE',
      title: 'Internal Account Note Added',
      description: text,
      timestamp: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      author,
    });

    return newNote;
  }

  public invitePortal(clientId: string): boolean {
    const client = this.getClient(clientId);
    if (!client) return false;

    client.portal_status = 'INVITED';
    client.portal_invited_at = new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
    client.updated_at = new Date().toISOString().replace('T', ' ').substring(0, 16);

    client.activities.unshift({
      id: `act-${Date.now()}`,
      type: 'NOTE',
      title: 'Client Portal Invitation Issued',
      description: 'Sent portal invitation email to primary contact.',
      timestamp: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      author: 'Kaelen Voss',
    });

    return true;
  }
}

export const clientService = new ClientService();
