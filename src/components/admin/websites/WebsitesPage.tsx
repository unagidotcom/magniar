import React, { useEffect, useMemo, useState } from 'react';
import {
  Edit,
  ExternalLink,
  Eye,
  Globe,
  Power,
  PowerOff,
  RefreshCw,
  Search,
  Trash2,
  X,
} from 'lucide-react';
import { Client } from '../../../types/clients';
import { WebsiteInput, WebsitePlatform, WebsiteRecord, WebsiteStatus } from '../../../types/websites';
import { clientService } from '../../../services/clientService';
import {
  createWebsite,
  deleteWebsite,
  listWebsites,
  normalizeWebsiteUrl,
  updateWebsite,
} from '../../../services/websiteService';
import { AdminDrawer } from '../AdminDrawer';
import { AdminEmptyState } from '../AdminEmptyState';
import { AdminErrorState } from '../AdminErrorState';
import { AdminModal } from '../AdminModal';
import { AdminPageHeader } from '../AdminPageHeader';
import { AdminSkeletonTable } from '../AdminSkeleton';
import { AdminStatusBadge } from '../AdminStatusBadge';

interface WebsitesPageProps {
  onNavigate?: (route: string) => void;
  onTriggerToast: (type: 'success' | 'info' | 'error', title: string, message?: string) => void;
  simulatedState?: 'normal' | 'skeleton' | 'empty' | 'error';
}

const PLATFORM_OPTIONS: WebsitePlatform[] = [
  'HTML / Static',
  'WordPress',
  'Shopify',
  'Webflow',
  'React',
  'Next.js',
  'Vercel',
  'Other',
];

const STATUS_OPTIONS: Array<WebsiteStatus | 'ALL'> = ['ALL', 'UNKNOWN', 'ONLINE', 'DOWN', 'ERROR'];
const MONITORING_OPTIONS = ['ALL', 'ENABLED', 'DISABLED'];

const emptyForm = (clientId = ''): WebsiteInput => ({
  name: '',
  url: '',
  client_id: clientId,
  platform: 'Other',
  hosting_provider: '',
  monitoring_enabled: true,
});

const displayValue = (value?: string | number) => {
  if (value === undefined || value === null || value === '') return <span>&mdash;</span>;
  return value;
};

const clientNameForWebsite = (website: WebsiteRecord, clients: Client[]) =>
  website.client?.business_name ||
  clients.find((client) => client.id === website.client_id)?.business_name ||
  'Unknown client';

interface WebsiteFormModalProps {
  isOpen: boolean;
  clients: Client[];
  website?: WebsiteRecord | null;
  isSaving: boolean;
  onClose: () => void;
  onSubmit: (input: WebsiteInput) => void;
}

const WebsiteFormModal: React.FC<WebsiteFormModalProps> = ({
  isOpen,
  clients,
  website,
  isSaving,
  onClose,
  onSubmit,
}) => {
  const [form, setForm] = useState<WebsiteInput>(() => emptyForm(clients[0]?.id || ''));
  const [urlError, setUrlError] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    if (website) {
      setForm({
        name: website.name,
        url: website.url,
        client_id: website.client_id,
        platform: website.platform,
        hosting_provider: website.hosting_provider || '',
        monitoring_enabled: website.monitoring_enabled,
      });
    } else {
      setForm(emptyForm(clients[0]?.id || ''));
    }
    setUrlError(null);
  }, [clients, isOpen, website]);

  if (!isOpen) return null;

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    try {
      normalizeWebsiteUrl(form.url);
      setUrlError(null);
    } catch (err: any) {
      setUrlError(err?.message || 'Enter a valid website URL.');
      return;
    }

    onSubmit(form);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200 font-mono text-xs text-white">
      <div className="bg-[#0A0A0C] border border-white/10 rounded-[2px] w-full max-w-xl max-h-[90vh] overflow-y-auto p-6 space-y-5">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-[#0099FF]" />
            <h3 className="font-bold text-sm text-white uppercase">
              {website ? 'Edit Website Record' : 'Add Website Record'}
            </h3>
          </div>
          <button onClick={onClose} className="text-white/40 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-3">
            <h4 className="text-[10px] text-[#0099FF] uppercase font-bold tracking-wider">
              01 - Website Identity
            </h4>

            <div>
              <label className="block text-[10px] text-white/40 uppercase mb-1">Website Name *</label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
                placeholder="Main website"
                className="w-full bg-[#050505] border border-white/10 rounded-[2px] px-3 py-2 text-white focus:outline-none focus:border-[#0099FF]"
              />
            </div>

            <div>
              <label className="block text-[10px] text-white/40 uppercase mb-1">Website URL *</label>
              <input
                type="text"
                required
                value={form.url}
                onChange={(event) => {
                  setForm((current) => ({ ...current, url: event.target.value }));
                  setUrlError(null);
                }}
                placeholder="example.com"
                className={`w-full bg-[#050505] border rounded-[2px] px-3 py-2 text-white focus:outline-none ${
                  urlError ? 'border-rose-500/60 focus:border-rose-400' : 'border-white/10 focus:border-[#0099FF]'
                }`}
              />
              <p className={`mt-1 text-[10px] ${urlError ? 'text-rose-300' : 'text-white/35'}`}>
                {urlError || 'URLs without a protocol will be saved as HTTPS. No live check is performed yet.'}
              </p>
            </div>

            <div>
              <label className="block text-[10px] text-white/40 uppercase mb-1">Client *</label>
              <select
                required
                value={form.client_id}
                onChange={(event) => setForm((current) => ({ ...current, client_id: event.target.value }))}
                className="w-full bg-[#050505] border border-white/10 rounded-[2px] px-3 py-2 text-white focus:outline-none focus:border-[#0099FF]"
              >
                <option value="" disabled>
                  Select an existing client
                </option>
                {clients.map((client) => (
                  <option key={client.id} value={client.id}>
                    {client.business_name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-3 pt-2 border-t border-white/10">
            <h4 className="text-[10px] text-[#0099FF] uppercase font-bold tracking-wider">
              02 - Metadata
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] text-white/40 uppercase mb-1">Platform</label>
                <select
                  value={form.platform}
                  onChange={(event) => setForm((current) => ({ ...current, platform: event.target.value }))}
                  className="w-full bg-[#050505] border border-white/10 rounded-[2px] px-3 py-2 text-white focus:outline-none focus:border-[#0099FF]"
                >
                  {PLATFORM_OPTIONS.map((platform) => (
                    <option key={platform} value={platform}>
                      {platform}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[10px] text-white/40 uppercase mb-1">Hosting Provider</label>
                <input
                  type="text"
                  value={form.hosting_provider || ''}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, hosting_provider: event.target.value }))
                  }
                  placeholder="Vercel, SiteGround, Cloudflare..."
                  className="w-full bg-[#050505] border border-white/10 rounded-[2px] px-3 py-2 text-white focus:outline-none focus:border-[#0099FF]"
                />
              </div>
            </div>

            <label className="flex items-center justify-between gap-3 p-3 bg-[#050505] border border-white/10 rounded-[2px]">
              <span>
                <span className="block text-white font-semibold">Monitoring Enabled</span>
                <span className="block text-[10px] text-white/40 mt-0.5">
                  This only stores the preference. Actual checks are not implemented yet.
                </span>
              </span>
              <input
                type="checkbox"
                checked={form.monitoring_enabled}
                onChange={(event) =>
                  setForm((current) => ({ ...current, monitoring_enabled: event.target.checked }))
                }
                className="h-4 w-4 accent-[#0099FF]"
              />
            </label>
          </div>

          <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-end gap-3 pt-3 border-t border-white/10">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-[2px] border border-white/10"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving || clients.length === 0}
              className="px-4 py-2 bg-[#0099FF] hover:bg-[#0099FF]/80 disabled:opacity-50 text-white font-bold rounded-[2px] inline-flex items-center justify-center gap-2"
            >
              {isSaving && <RefreshCw className="w-3.5 h-3.5 animate-spin" />}
              {website ? 'Save Website' : 'Add Website'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export const WebsitesPage: React.FC<WebsitesPageProps> = ({
  onNavigate,
  onTriggerToast,
  simulatedState = 'normal',
}) => {
  const [websites, setWebsites] = useState<WebsiteRecord[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [clientFilter, setClientFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState<WebsiteStatus | 'ALL'>('ALL');
  const [monitoringFilter, setMonitoringFilter] = useState('ALL');
  const [selectedWebsite, setSelectedWebsite] = useState<WebsiteRecord | null>(null);
  const [editingWebsite, setEditingWebsite] = useState<WebsiteRecord | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [deletingWebsite, setDeletingWebsite] = useState<WebsiteRecord | null>(null);

  const loadData = async () => {
    setIsLoading(true);
    setLoadError(null);
    try {
      const [websiteRows, clientRows] = await Promise.all([
        listWebsites(),
        clientService.getClients(),
      ]);
      setWebsites(websiteRows);
      setClients(clientRows);
      if (selectedWebsite) {
        setSelectedWebsite(websiteRows.find((row) => row.id === selectedWebsite.id) || null);
      }
    } catch (err: any) {
      console.error('Websites module load failed:', err);
      setLoadError(err?.message || 'Failed to load websites.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void loadData();
  }, []);

  const summary = useMemo(
    () => ({
      total: websites.length,
      online: websites.filter((website) => website.current_status === 'ONLINE').length,
      down: websites.filter((website) => website.current_status === 'DOWN').length,
      error: websites.filter((website) => website.current_status === 'ERROR').length,
      disabled: websites.filter((website) => !website.monitoring_enabled).length,
    }),
    [websites]
  );

  const filteredWebsites = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    return websites.filter((website) => {
      const clientName = clientNameForWebsite(website, clients);

      if (clientFilter !== 'ALL' && website.client_id !== clientFilter) return false;
      if (statusFilter !== 'ALL' && website.current_status !== statusFilter) return false;
      if (monitoringFilter === 'ENABLED' && !website.monitoring_enabled) return false;
      if (monitoringFilter === 'DISABLED' && website.monitoring_enabled) return false;

      if (!query) return true;

      return (
        website.name.toLowerCase().includes(query) ||
        website.url.toLowerCase().includes(query) ||
        website.normalized_url.toLowerCase().includes(query) ||
        clientName.toLowerCase().includes(query)
      );
    });
  }, [clientFilter, clients, monitoringFilter, searchTerm, statusFilter, websites]);

  const openAddModal = () => {
    if (clients.length === 0) {
      onTriggerToast('error', 'No Clients Available', 'Create a client before adding a website.');
      return;
    }

    setEditingWebsite(null);
    setFormOpen(true);
  };

  const openEditModal = (website: WebsiteRecord) => {
    setEditingWebsite(website);
    setFormOpen(true);
  };

  const handleSaveWebsite = async (input: WebsiteInput) => {
    setIsSaving(true);
    try {
      const saved = editingWebsite
        ? await updateWebsite(editingWebsite.id, input)
        : await createWebsite(input);
      await loadData();
      setFormOpen(false);
      setEditingWebsite(null);
      setSelectedWebsite((current) => (current?.id === saved.id ? saved : current));
      onTriggerToast(
        'success',
        editingWebsite ? 'Website Updated' : 'Website Added',
        `${saved.name} is ready for future monitoring.`
      );
    } catch (err: any) {
      console.error('Website save failed:', err);
      onTriggerToast('error', 'Website Not Saved', err?.message || 'Could not save website.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteWebsite = async () => {
    if (!deletingWebsite) return;

    try {
      await deleteWebsite(deletingWebsite.id);
      setWebsites((current) => current.filter((website) => website.id !== deletingWebsite.id));
      if (selectedWebsite?.id === deletingWebsite.id) {
        setSelectedWebsite(null);
      }
      onTriggerToast('success', 'Website Deleted', `${deletingWebsite.name} was removed.`);
    } catch (err: any) {
      console.error('Website deletion failed:', err);
      onTriggerToast('error', 'Website Not Deleted', err?.message || 'Could not delete website.');
    } finally {
      setDeletingWebsite(null);
    }
  };

  if (simulatedState === 'skeleton' || (isLoading && !websites.length)) {
    return (
      <div className="space-y-6 animate-in fade-in duration-300 font-mono">
        <AdminPageHeader
          title="Websites"
          subtitle="Monitor and manage the websites you maintain for your clients."
          moduleCode="OPS-04 / WEBSITES"
        />
        <AdminSkeletonTable />
      </div>
    );
  }

  if (simulatedState === 'error' || loadError) {
    return (
      <div className="space-y-6 animate-in fade-in duration-300 font-mono">
        <AdminPageHeader
          title="Websites"
          subtitle="Monitor and manage the websites you maintain for your clients."
          moduleCode="OPS-04 / WEBSITES"
        />
        <AdminErrorState
          title="Failed to load websites"
          message={loadError || 'Website records failed to load.'}
          onRetry={() => void loadData()}
        />
      </div>
    );
  }

  if (simulatedState === 'empty') {
    return (
      <div className="space-y-6 animate-in fade-in duration-300 font-mono">
        <AdminPageHeader
          title="Websites"
          subtitle="Monitor and manage the websites you maintain for your clients."
          moduleCode="OPS-04 / WEBSITES"
          primaryActionLabel="+ Add Website"
          onPrimaryAction={openAddModal}
        />
        <AdminEmptyState
          title="No Website Records"
          description="Add a website record and connect it to an existing client."
          actionLabel="+ Add Website"
          onAction={openAddModal}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-300 font-mono text-xs">
      <AdminPageHeader
        title="Websites"
        subtitle="Monitor and manage the websites you maintain for your clients."
        moduleCode="OPS-04 / WEBSITES"
        primaryActionLabel="+ Add Website"
        onPrimaryAction={openAddModal}
        onRefresh={() => {
          void loadData();
          onTriggerToast('info', 'Websites Refreshed', 'Latest website records loaded.');
        }}
      />

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <button
          onClick={() => {
            setStatusFilter('ALL');
            setMonitoringFilter('ALL');
          }}
          className="p-3 rounded-[2px] border text-left transition-colors bg-[#0A0A0C] border-white/10 text-white/70 hover:border-white/30"
        >
          <div className="text-[10px] text-white/40 uppercase">Total Websites</div>
          <div className="text-lg font-bold text-white mt-1">{summary.total}</div>
          <div className="text-[10px] text-white/40 mt-1">Registered Records</div>
        </button>

        <button
          onClick={() => setStatusFilter('ONLINE')}
          className="p-3 rounded-[2px] border text-left transition-colors bg-[#0A0A0C] border-white/10 text-white/70 hover:border-emerald-500/50"
        >
          <div className="text-[10px] text-emerald-400 uppercase">Online</div>
          <div className="text-lg font-bold text-emerald-400 mt-1">{summary.online}</div>
          <div className="text-[10px] text-white/40 mt-1">Future Checks</div>
        </button>

        <button
          onClick={() => setStatusFilter('DOWN')}
          className="p-3 rounded-[2px] border text-left transition-colors bg-[#0A0A0C] border-white/10 text-white/70 hover:border-rose-500/50"
        >
          <div className="text-[10px] text-rose-400 uppercase">Down</div>
          <div className="text-lg font-bold text-rose-400 mt-1">{summary.down}</div>
          <div className="text-[10px] text-white/40 mt-1">Future Checks</div>
        </button>

        <button
          onClick={() => setStatusFilter('ERROR')}
          className="p-3 rounded-[2px] border text-left transition-colors bg-[#0A0A0C] border-white/10 text-white/70 hover:border-amber-500/50"
        >
          <div className="text-[10px] text-amber-400 uppercase">Error</div>
          <div className="text-lg font-bold text-amber-400 mt-1">{summary.error}</div>
          <div className="text-[10px] text-white/40 mt-1">Future Checks</div>
        </button>

        <button
          onClick={() => setMonitoringFilter('DISABLED')}
          className="p-3 rounded-[2px] border text-left transition-colors bg-[#0A0A0C] border-white/10 text-white/70 hover:border-white/40"
        >
          <div className="text-[10px] text-white/60 uppercase">Monitoring Disabled</div>
          <div className="text-lg font-bold text-white mt-1">{summary.disabled}</div>
          <div className="text-[10px] text-white/40 mt-1">Opted Out</div>
        </button>
      </div>

      <div className="p-4 bg-[#0A0A0C] border border-white/10 rounded-[2px] flex flex-col xl:flex-row xl:items-center justify-between gap-4">
        <div className="flex items-center gap-3 bg-[#050505] border border-white/10 rounded-[2px] px-3 py-2 flex-1 max-w-xl">
          <Search className="w-4 h-4 text-white/40" />
          <input
            type="text"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search websites by name, URL, or client..."
            className="w-full bg-transparent font-mono text-xs text-white focus:outline-none placeholder:text-white/30"
          />
          {searchTerm && (
            <button onClick={() => setSearchTerm('')} className="text-white/40 hover:text-white">
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2 text-xs">
          <select
            value={clientFilter}
            onChange={(event) => setClientFilter(event.target.value)}
            className="bg-[#050505] border border-white/10 text-white font-mono text-xs rounded-[2px] p-2 focus:outline-none focus:border-[#0099FF]"
          >
            <option value="ALL">All Clients</option>
            {clients.map((client) => (
              <option key={client.id} value={client.id}>
                {client.business_name}
              </option>
            ))}
          </select>

          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value as WebsiteStatus | 'ALL')}
            className="bg-[#050505] border border-white/10 text-white font-mono text-xs rounded-[2px] p-2 focus:outline-none focus:border-[#0099FF]"
          >
            {STATUS_OPTIONS.map((status) => (
              <option key={status} value={status}>
                {status === 'ALL' ? 'All Statuses' : status}
              </option>
            ))}
          </select>

          <select
            value={monitoringFilter}
            onChange={(event) => setMonitoringFilter(event.target.value)}
            className="bg-[#050505] border border-white/10 text-white font-mono text-xs rounded-[2px] p-2 focus:outline-none focus:border-[#0099FF]"
          >
            {MONITORING_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option === 'ALL' ? 'All Monitoring' : option}
              </option>
            ))}
          </select>

          {(clientFilter !== 'ALL' || statusFilter !== 'ALL' || monitoringFilter !== 'ALL' || searchTerm) && (
            <button
              onClick={() => {
                setClientFilter('ALL');
                setStatusFilter('ALL');
                setMonitoringFilter('ALL');
                setSearchTerm('');
              }}
              className="px-2.5 py-2 bg-white/5 hover:bg-white/10 text-[#0099FF] rounded-[2px] border border-white/10 text-[11px]"
            >
              Clear Filters
            </button>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between text-xs text-white/50 px-1">
        <span>
          Showing <strong className="text-white">{filteredWebsites.length}</strong> of{' '}
          <strong className="text-white">{websites.length}</strong> website records
        </span>

        <button
          onClick={() => {
            void loadData();
            onTriggerToast('info', 'Refreshed Websites', 'Synced latest website records.');
          }}
          className="hover:text-white flex items-center gap-1 text-[11px]"
        >
          <RefreshCw className="w-3 h-3" />
          <span>Refresh</span>
        </button>
      </div>

      {clients.length === 0 ? (
        <AdminEmptyState
          title="No Clients Available"
          description="A website must belong to an existing client."
          actionLabel="Open Clients Directory"
          onAction={() => onNavigate?.('clients')}
        />
      ) : filteredWebsites.length === 0 ? (
        <AdminEmptyState
          title={websites.length === 0 ? 'No Website Records' : 'No Websites Match Filters'}
          description={
            websites.length === 0
              ? 'Add your first client website record. Monitoring will be connected in a later phase.'
              : 'Try clearing search or filter options.'
          }
          actionLabel={websites.length === 0 ? '+ Add Website' : 'Clear All Filters'}
          onAction={() => {
            if (websites.length === 0) {
              openAddModal();
              return;
            }
            setClientFilter('ALL');
            setStatusFilter('ALL');
            setMonitoringFilter('ALL');
            setSearchTerm('');
          }}
        />
      ) : (
        <>
          <div className="hidden md:block bg-[#0A0A0C] border border-white/10 rounded-[2px] overflow-hidden min-w-0">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1080px] text-left font-mono text-xs">
                <thead className="bg-[#050505] border-b border-white/10 text-white/40 uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="p-3.5">Website</th>
                    <th className="p-3.5">Client</th>
                    <th className="p-3.5">URL</th>
                    <th className="p-3.5">Platform</th>
                    <th className="p-3.5">Status</th>
                    <th className="p-3.5">HTTP</th>
                    <th className="p-3.5">Response</th>
                    <th className="p-3.5">Last Checked</th>
                    <th className="p-3.5">Monitoring</th>
                    <th className="p-3.5 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.05]">
                  {filteredWebsites.map((website) => (
                    <tr
                      key={website.id}
                      className="hover:bg-white/[0.02] transition-colors"
                    >
                      <td className="p-3.5">
                        <div className="text-white font-bold text-sm truncate max-w-[180px]">
                          {website.name}
                        </div>
                        <div className="text-[10px] text-white/35 truncate max-w-[180px]">
                          {website.id}
                        </div>
                      </td>
                      <td className="p-3.5 text-white/80 font-medium max-w-[180px]">
                        <span className="truncate block">{clientNameForWebsite(website, clients)}</span>
                      </td>
                      <td className="p-3.5 max-w-[240px]">
                        <a
                          href={website.normalized_url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[#0099FF] hover:text-white inline-flex items-center gap-1 truncate max-w-full"
                        >
                          <span className="truncate">{website.normalized_url}</span>
                          <ExternalLink className="w-3 h-3 shrink-0" />
                        </a>
                      </td>
                      <td className="p-3.5 text-white/70">{website.platform}</td>
                      <td className="p-3.5">
                        <AdminStatusBadge status={website.current_status} />
                      </td>
                      <td className="p-3.5 text-white/50">{displayValue(website.last_http_status_code)}</td>
                      <td className="p-3.5 text-white/50">
                        {website.last_response_time_ms ? `${website.last_response_time_ms} ms` : <span>&mdash;</span>}
                      </td>
                      <td className="p-3.5 text-white/50">{displayValue(website.last_checked_at)}</td>
                      <td className="p-3.5">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-[2px] border text-[10px] font-semibold ${
                            website.monitoring_enabled
                              ? 'bg-[#0099FF]/10 text-[#0099FF] border-[#0099FF]/30'
                              : 'bg-white/5 text-white/40 border-white/10'
                          }`}
                        >
                          {website.monitoring_enabled ? <Power className="w-3 h-3" /> : <PowerOff className="w-3 h-3" />}
                          {website.monitoring_enabled ? 'Enabled' : 'Disabled'}
                        </span>
                      </td>
                      <td className="p-3.5">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => setSelectedWebsite(website)}
                            className="p-1.5 bg-white/5 hover:bg-white/10 text-white/70 hover:text-white rounded-[2px] border border-white/10 inline-flex items-center gap-1 text-[11px]"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>View</span>
                          </button>
                          <button
                            onClick={() => openEditModal(website)}
                            className="p-1.5 bg-white/5 hover:bg-white/10 text-white/70 hover:text-white rounded-[2px] border border-white/10 inline-flex items-center gap-1 text-[11px]"
                          >
                            <Edit className="w-3.5 h-3.5" />
                            <span>Edit</span>
                          </button>
                          <button
                            onClick={() => setDeletingWebsite(website)}
                            className="p-1.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 rounded-[2px] border border-rose-500/20 inline-flex items-center gap-1 text-[11px]"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="block md:hidden space-y-3">
            {filteredWebsites.map((website) => (
              <button
                key={website.id}
                onClick={() => setSelectedWebsite(website)}
                className="w-full p-4 bg-[#0A0A0C] border border-white/10 rounded-[2px] text-left space-y-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1 min-w-0">
                    <div className="text-white font-bold text-sm truncate">{website.name}</div>
                    <div className="text-[#0099FF] text-[11px] truncate">{website.normalized_url}</div>
                  </div>
                  <AdminStatusBadge status={website.current_status} size="sm" />
                </div>

                <div className="grid grid-cols-2 gap-3 text-[11px]">
                  <div>
                    <div className="text-white/35 uppercase">Client</div>
                    <div className="text-white/80 truncate">{clientNameForWebsite(website, clients)}</div>
                  </div>
                  <div>
                    <div className="text-white/35 uppercase">Platform</div>
                    <div className="text-white/80 truncate">{website.platform}</div>
                  </div>
                  <div>
                    <div className="text-white/35 uppercase">Last Checked</div>
                    <div className="text-white/60">&mdash;</div>
                  </div>
                  <div>
                    <div className="text-white/35 uppercase">Monitoring</div>
                    <div className={website.monitoring_enabled ? 'text-[#0099FF]' : 'text-white/40'}>
                      {website.monitoring_enabled ? 'Enabled' : 'Disabled'}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </>
      )}

      <WebsiteFormModal
        isOpen={formOpen}
        clients={clients}
        website={editingWebsite}
        isSaving={isSaving}
        onClose={() => {
          if (isSaving) return;
          setFormOpen(false);
          setEditingWebsite(null);
        }}
        onSubmit={(input) => void handleSaveWebsite(input)}
      />

      <AdminDrawer
        isOpen={!!selectedWebsite}
        onClose={() => setSelectedWebsite(null)}
        title={selectedWebsite?.name || ''}
        subtitle={selectedWebsite ? clientNameForWebsite(selectedWebsite, clients) : undefined}
        status={selectedWebsite?.current_status}
      >
        {selectedWebsite && (
          <div className="space-y-6 font-mono text-xs">
            <div className="p-4 bg-[#050505] border border-white/10 rounded-[2px] space-y-3">
              <div className="flex items-center justify-between gap-3">
                <span className="text-white/40 uppercase">URL</span>
                <a
                  href={selectedWebsite.normalized_url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#0099FF] hover:text-white inline-flex items-center gap-1 min-w-0"
                >
                  <span className="truncate">{selectedWebsite.normalized_url}</span>
                  <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                </a>
              </div>
              <div className="flex items-center justify-between gap-3">
                <span className="text-white/40 uppercase">Client</span>
                <span className="text-white font-medium">{clientNameForWebsite(selectedWebsite, clients)}</span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <span className="text-white/40 uppercase">Platform</span>
                <span className="text-white/80">{selectedWebsite.platform}</span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <span className="text-white/40 uppercase">Hosting</span>
                <span className="text-white/80">{displayValue(selectedWebsite.hosting_provider)}</span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <span className="text-white/40 uppercase">Monitoring Status</span>
                <span className={selectedWebsite.monitoring_enabled ? 'text-[#0099FF]' : 'text-white/40'}>
                  {selectedWebsite.monitoring_enabled ? 'Enabled' : 'Disabled'}
                </span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <span className="text-white/40 uppercase">Current Status</span>
                <AdminStatusBadge status={selectedWebsite.current_status} />
              </div>
            </div>

            <div className="p-4 bg-[#050505] border border-white/10 rounded-[2px] space-y-2">
              <div className="text-white/40 uppercase text-[10px]">Monitoring</div>
              <p className="text-white/70 leading-relaxed">
                This record is ready for monitoring, but HTTPS checks, uptime history, alerts,
                and automated checks have not been implemented yet.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="p-3 bg-[#050505] border border-white/10 rounded-[2px]">
                <div className="text-white/35 uppercase text-[10px]">HTTP</div>
                <div className="text-white/70 mt-1">&mdash;</div>
              </div>
              <div className="p-3 bg-[#050505] border border-white/10 rounded-[2px]">
                <div className="text-white/35 uppercase text-[10px]">Response</div>
                <div className="text-white/70 mt-1">&mdash;</div>
              </div>
              <div className="p-3 bg-[#050505] border border-white/10 rounded-[2px]">
                <div className="text-white/35 uppercase text-[10px]">Last Check</div>
                <div className="text-white/70 mt-1">&mdash;</div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2">
              <button
                onClick={() => openEditModal(selectedWebsite)}
                className="px-3 py-2 bg-white/5 hover:bg-white/10 text-white rounded-[2px] border border-white/10 inline-flex items-center gap-1.5"
              >
                <Edit className="w-3.5 h-3.5" />
                <span>Edit Website</span>
              </button>
              <button
                onClick={() => setDeletingWebsite(selectedWebsite)}
                className="px-3 py-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 rounded-[2px] border border-rose-500/20 inline-flex items-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete</span>
              </button>
            </div>
          </div>
        )}
      </AdminDrawer>

      <AdminModal
        isOpen={!!deletingWebsite}
        onClose={() => setDeletingWebsite(null)}
        title="Delete Website Record"
        description={
          deletingWebsite
            ? `Remove ${deletingWebsite.name} from the Websites module. Monitoring history is not implemented yet.`
            : undefined
        }
        confirmLabel="Delete Website"
        confirmVariant="danger"
        onConfirm={() => void handleDeleteWebsite()}
      />
    </div>
  );
};
