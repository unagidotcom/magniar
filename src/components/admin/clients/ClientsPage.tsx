import React, { useState, useEffect } from 'react';
import { Client, ClientStatus, ClientContact } from '../../../types/clients';
import { clientService } from '../../../services/clientService';
import { ClientTable } from './ClientTable';
import { ClientCard } from './ClientCard';
import { ClientDetail } from './ClientDetail';
import { NewClientModal } from './NewClientModal';
import { Chapter17DesignReview } from './Chapter17DesignReview';
import { AdminPageHeader } from '../AdminPageHeader';
import { AdminSkeletonTable } from '../AdminSkeleton';
import { AdminEmptyState } from '../AdminEmptyState';
import { AdminErrorState } from '../AdminErrorState';
import { Search, Filter, Plus, RefreshCw, X, Building2, Users, Briefcase, ShieldCheck } from 'lucide-react';

interface ClientsPageProps {
  onNavigate?: (route: string) => void;
  onTriggerToast: (type: 'success' | 'info' | 'error', title: string, message?: string) => void;
  simulatedState?: 'normal' | 'skeleton' | 'empty' | 'error';
}

export const ClientsPage: React.FC<ClientsPageProps> = ({
  onNavigate,
  onTriggerToast,
  simulatedState = 'normal',
}) => {
  const [clients, setClients] = useState<Client[]>([]);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  // Filter & search states
  const [activeStatusFilter, setActiveStatusFilter] = useState<string>('ALL');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [ownerFilter, setOwnerFilter] = useState<string>('ALL');
  const [tierFilter, setTierFilter] = useState<string>('ALL');

  // Modal state
  const [newClientModalOpen, setNewClientModalOpen] = useState<boolean>(false);

  // Load clients data
  const refreshData = () => {
    const list = clientService.getClients();
    setClients(list);
    if (selectedClient) {
      const updated = list.find((c) => c.id === selectedClient.id);
      if (updated) setSelectedClient(updated);
    }
  };

  useEffect(() => {
    refreshData();
  }, []);

  if (simulatedState === 'skeleton') {
    return (
      <div className="space-y-6 animate-in fade-in duration-300 font-mono">
        <div className="h-10 bg-white/10 rounded w-1/3 animate-pulse" />
        <AdminSkeletonTable />
      </div>
    );
  }

  if (simulatedState === 'empty') {
    return (
      <div className="space-y-6 animate-in fade-in duration-300 font-mono">
        <AdminPageHeader
          title="Clients Directory"
          subtitle="Contracted client relationships, active engagements, contacts, documents, and client portal settings."
          moduleCode="CRM-03 / CLIENTS"
          primaryActionLabel="+ New Client"
          onPrimaryAction={() => setNewClientModalOpen(true)}
        />
        <AdminEmptyState
          title="No Contracted Clients Found"
          description="There are currently no active or onboarding client records in the directory."
          actionLabel="+ Register First Client"
          onAction={() => setNewClientModalOpen(true)}
        />
        <NewClientModal
          isOpen={newClientModalOpen}
          onClose={() => setNewClientModalOpen(false)}
          onSubmit={(data) => {
            const created = clientService.createClient(data);
            refreshData();
            onTriggerToast('success', 'Client Registered', `Created client record ${created.id} for ${created.business_name}.`);
          }}
        />
      </div>
    );
  }

  if (simulatedState === 'error') {
    return (
      <div className="space-y-6 animate-in fade-in duration-300 font-mono">
        <AdminPageHeader
          title="Clients Directory"
          subtitle="Contracted client relationships, active engagements, contacts, documents, and client portal settings."
          moduleCode="CRM-03 / CLIENTS"
        />
        <AdminErrorState
          title="Failed to fetch Clients Directory dataset"
          message="Server returned status code 500 (Clients Directory Database Connection Timeout)."
          onRetry={() => {
            refreshData();
            onTriggerToast('info', 'Retrying Fetch', 'Re-syncing clients directory ledger state...');
          }}
        />
      </div>
    );
  }

  // Summary counts
  const totalClients = clients.length;
  const activeClients = clients.filter((c) => c.status === 'ACTIVE').length;
  const onboardingClients = clients.filter((c) => c.status === 'ONBOARDING').length;
  const attentionClients = clients.filter((c) => c.status === 'ATTENTION').length;
  const pausedClients = clients.filter((c) => c.status === 'PAUSED').length;

  const uniqueOwners = Array.from(new Set(clients.map((c) => c.account_owner))).filter(Boolean);

  // Filter logic
  const filteredClients = clients.filter((c) => {
    // Status filter
    if (activeStatusFilter !== 'ALL' && c.status !== activeStatusFilter) return false;

    // Owner filter
    if (ownerFilter !== 'ALL' && c.account_owner !== ownerFilter) return false;

    // Tier filter
    if (tierFilter !== 'ALL' && c.tier !== tierFilter) return false;

    // Search query
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      const matchName = c.business_name.toLowerCase().includes(q);
      const matchId = c.id.toLowerCase().includes(q);
      const matchIndustry = c.industry.toLowerCase().includes(q);
      const matchOwner = c.account_owner.toLowerCase().includes(q);
      const matchContacts = c.contacts.some(
        (cnt) => cnt.name.toLowerCase().includes(q) || cnt.email.toLowerCase().includes(q)
      );
      const matchServices = c.services.some((s) => s.service_name.toLowerCase().includes(q));

      return matchName || matchId || matchIndustry || matchOwner || matchContacts || matchServices;
    }

    return true;
  });

  const handleUpdateStatus = (id: string, status: ClientStatus, reason?: string) => {
    clientService.updateStatus(id, status, reason);
    refreshData();
  };

  const handleAddContact = (clientId: string, contact: Omit<ClientContact, 'id'>) => {
    clientService.addContact(clientId, contact);
    refreshData();
    onTriggerToast('success', 'Contact Added', `Added ${contact.name} to client contact directory.`);
  };

  const handleAddNote = (clientId: string, text: string) => {
    clientService.addNote(clientId, text, 'Kaelen Voss');
    refreshData();
    onTriggerToast('success', 'Note Added', 'Appended note to client activity log.');
  };

  const handleInvitePortal = (clientId: string) => {
    clientService.invitePortal(clientId);
    refreshData();
  };

  const handleOpenSourceRequest = (requestCode: string) => {
    if (onNavigate) {
      onNavigate('requests');
      onTriggerToast('info', 'Navigated to Request', `Opened source request ${requestCode}`);
    } else {
      onTriggerToast('info', 'Source Request Link', `Linked Request Code: ${requestCode}`);
    }
  };

  const handleOpenSourceProspect = (prospectId: string) => {
    if (onNavigate) {
      onNavigate('prospects');
      onTriggerToast('info', 'Navigated to Prospect', `Opened source prospect ${prospectId}`);
    } else {
      onTriggerToast('info', 'Source Prospect Link', `Linked Prospect Code: ${prospectId}`);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 font-mono text-xs">
      {/* Chapter 17 Design Review Collapsible Documentation */}
      <Chapter17DesignReview />

      {selectedClient ? (
        <ClientDetail
          client={selectedClient}
          onBack={() => setSelectedClient(null)}
          onUpdateStatus={handleUpdateStatus}
          onAddContact={handleAddContact}
          onAddNote={handleAddNote}
          onInvitePortal={handleInvitePortal}
          onOpenSourceRequest={handleOpenSourceRequest}
          onOpenSourceProspect={handleOpenSourceProspect}
          onTriggerToast={onTriggerToast}
        />
      ) : (
        <div className="space-y-6">
          {/* Page Header */}
          <AdminPageHeader
            title="Clients Directory"
            subtitle="Commercial clients with active retainers, projects, contacts, agreements, and client portal status."
            moduleCode="CRM-03 / CLIENTS"
            primaryActionLabel="+ Register Client"
            onPrimaryAction={() => setNewClientModalOpen(true)}
            secondaryActionLabel="Export Clients CSV"
            onSecondaryAction={() => {
              onTriggerToast('success', 'Clients Export Completed', 'Downloaded clients_directory_export.csv');
            }}
          />

          {/* Directory Summary Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            <button
              onClick={() => setActiveStatusFilter('ALL')}
              className={`p-3 rounded-[2px] border text-left transition-colors cursor-pointer ${
                activeStatusFilter === 'ALL'
                  ? 'bg-[#0099FF]/10 border-[#0099FF] text-white font-bold'
                  : 'bg-[#0A0A0C] border-white/10 text-white/70 hover:border-white/30'
              }`}
            >
              <div className="text-[10px] text-white/40 uppercase">Total Accounts</div>
              <div className="text-lg font-bold text-white mt-1">{totalClients}</div>
              <div className="text-[10px] text-white/40 mt-1">All Records</div>
            </button>

            <button
              onClick={() => setActiveStatusFilter('ACTIVE')}
              className={`p-3 rounded-[2px] border text-left transition-colors cursor-pointer ${
                activeStatusFilter === 'ACTIVE'
                  ? 'bg-emerald-500/10 border-emerald-500 text-white font-bold'
                  : 'bg-[#0A0A0C] border-white/10 text-white/70 hover:border-white/30'
              }`}
            >
              <div className="text-[10px] text-emerald-400 uppercase">Active</div>
              <div className="text-lg font-bold text-emerald-400 mt-1">{activeClients}</div>
              <div className="text-[10px] text-white/40 mt-1">Ongoing Retainers</div>
            </button>

            <button
              onClick={() => setActiveStatusFilter('ONBOARDING')}
              className={`p-3 rounded-[2px] border text-left transition-colors cursor-pointer ${
                activeStatusFilter === 'ONBOARDING'
                  ? 'bg-[#0099FF]/10 border-[#0099FF] text-white font-bold'
                  : 'bg-[#0A0A0C] border-white/10 text-white/70 hover:border-white/30'
              }`}
            >
              <div className="text-[10px] text-[#0099FF] uppercase">Onboarding</div>
              <div className="text-lg font-bold text-[#0099FF] mt-1">{onboardingClients}</div>
              <div className="text-[10px] text-white/40 mt-1">Kickoff Stage</div>
            </button>

            <button
              onClick={() => setActiveStatusFilter('ATTENTION')}
              className={`p-3 rounded-[2px] border text-left transition-colors cursor-pointer ${
                activeStatusFilter === 'ATTENTION'
                  ? 'bg-amber-500/10 border-amber-500 text-white font-bold'
                  : 'bg-[#0A0A0C] border-white/10 text-white/70 hover:border-white/30'
              }`}
            >
              <div className="text-[10px] text-amber-400 uppercase">Attention</div>
              <div className="text-lg font-bold text-amber-400 mt-1">{attentionClients}</div>
              <div className="text-[10px] text-white/40 mt-1">Requires Review</div>
            </button>

            <button
              onClick={() => setActiveStatusFilter('PAUSED')}
              className={`p-3 rounded-[2px] border text-left transition-colors cursor-pointer ${
                activeStatusFilter === 'PAUSED'
                  ? 'bg-white/10 border-white/40 text-white font-bold'
                  : 'bg-[#0A0A0C] border-white/10 text-white/70 hover:border-white/30'
              }`}
            >
              <div className="text-[10px] text-white/60 uppercase">Paused</div>
              <div className="text-lg font-bold text-white mt-1">{pausedClients}</div>
              <div className="text-[10px] text-white/40 mt-1">On Hold</div>
            </button>
          </div>

          {/* Search and Filters Controls */}
          <div className="p-4 bg-[#0A0A0C] border border-white/10 rounded-[2px] flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="flex items-center gap-3 bg-[#050505] border border-white/10 rounded-[2px] px-3 py-2 flex-1 max-w-md">
              <Search className="w-4 h-4 text-white/40" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search clients by company, contact, ID, service, owner..."
                className="w-full bg-transparent font-mono text-xs text-white focus:outline-none placeholder:text-white/30"
              />
              {searchTerm && (
                <button onClick={() => setSearchTerm('')} className="text-white/40 hover:text-white">
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Filter Dropdowns */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] text-white/40 uppercase">Owner:</span>
                <select
                  value={ownerFilter}
                  onChange={(e) => setOwnerFilter(e.target.value)}
                  className="bg-[#050505] border border-white/10 text-white font-mono text-xs rounded-[2px] p-2 focus:outline-none focus:border-[#0099FF]"
                >
                  <option value="ALL">All Owners</option>
                  {uniqueOwners.map((own) => (
                    <option key={own} value={own}>
                      {own}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-1.5">
                <span className="text-[10px] text-white/40 uppercase">Tier:</span>
                <select
                  value={tierFilter}
                  onChange={(e) => setTierFilter(e.target.value)}
                  className="bg-[#050505] border border-white/10 text-white font-mono text-xs rounded-[2px] p-2 focus:outline-none focus:border-[#0099FF]"
                >
                  <option value="ALL">All Tiers</option>
                  <option value="ENTERPRISE">ENTERPRISE</option>
                  <option value="GROWTH">GROWTH</option>
                  <option value="SCALE">SCALE</option>
                  <option value="STANDARD">STANDARD</option>
                </select>
              </div>

              {(activeStatusFilter !== 'ALL' || ownerFilter !== 'ALL' || tierFilter !== 'ALL' || searchTerm !== '') && (
                <button
                  onClick={() => {
                    setActiveStatusFilter('ALL');
                    setOwnerFilter('ALL');
                    setTierFilter('ALL');
                    setSearchTerm('');
                  }}
                  className="px-2.5 py-2 bg-white/5 hover:bg-white/10 text-[#0099FF] rounded-[2px] border border-white/10 text-[11px]"
                >
                  Clear Filters
                </button>
              )}
            </div>
          </div>

          {/* Record Count Bar */}
          <div className="flex items-center justify-between text-xs text-white/50 px-1">
            <span>
              Showing <strong className="text-white">{filteredClients.length}</strong> of{' '}
              <strong className="text-white">{clients.length}</strong> client records
              {activeStatusFilter !== 'ALL' && ` [Status: ${activeStatusFilter}]`}
            </span>

            <button
              onClick={() => {
                refreshData();
                onTriggerToast('info', 'Refreshed Directory', 'Synced latest client dataset.');
              }}
              className="hover:text-white flex items-center gap-1 text-[11px]"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Refresh</span>
            </button>
          </div>

          {/* List Views: Table on Desktop, Cards on Mobile */}
          {filteredClients.length === 0 ? (
            <AdminEmptyState
              title="No Client Records Match Filters"
              description="Try clearing your search term or adjusting filter options."
              actionLabel="Clear All Filters"
              onAction={() => {
                setActiveStatusFilter('ALL');
                setOwnerFilter('ALL');
                setTierFilter('ALL');
                setSearchTerm('');
              }}
            />
          ) : (
            <>
              {/* Desktop Table View */}
              <div className="hidden md:block">
                <ClientTable
                  clients={filteredClients}
                  onOpenClient={(cli) => setSelectedClient(cli)}
                  onOpenSourceProspect={handleOpenSourceProspect}
                  onOpenSourceRequest={handleOpenSourceRequest}
                />
              </div>

              {/* Mobile Card View */}
              <div className="block md:hidden space-y-3">
                {filteredClients.map((cli) => (
                  <ClientCard
                    key={cli.id}
                    client={cli}
                    onOpenClient={(c) => setSelectedClient(c)}
                    onOpenSourceProspect={handleOpenSourceProspect}
                    onOpenSourceRequest={handleOpenSourceRequest}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      )}

      {/* New Client Modal */}
      <NewClientModal
        isOpen={newClientModalOpen}
        onClose={() => setNewClientModalOpen(false)}
        onSubmit={(data) => {
          const created = clientService.createClient(data);
          refreshData();
          onTriggerToast('success', 'CLIENT REGISTERED', `Created client record ${created.id} for ${created.business_name}.`);
        }}
      />
    </div>
  );
};
