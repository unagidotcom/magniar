import React, { useEffect, useMemo, useState } from 'react';
import {
  Activity,
  AlertTriangle,
  CheckCircle2,
  Clock3,
  Edit,
  ExternalLink,
  Eye,
  Gauge,
  Globe,
  Power,
  PowerOff,
  RefreshCw,
  Search,
  Server,
  Shield,
  Trash2,
  X,
} from 'lucide-react';
import { Client } from '../../../types/clients';
import {
  WebsiteCheckIntervalMinutes,
  WebsiteInput,
  WebsitePlatform,
  WebsiteRecord,
  WebsiteStatus,
} from '../../../types/websites';
import { clientService } from '../../../services/clientService';
import {
  checkWebsiteNow,
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
import { WebsiteDetailPage } from './WebsiteDetailPage';

interface WebsitesPageProps {
  onNavigate?: (route: string) => void;
  onTriggerToast: (type: 'success' | 'info' | 'error', title: string, message?: string) => void;
  simulatedState?: 'normal' | 'skeleton' | 'empty' | 'error';
}

const PLATFORM_OPTIONS: WebsitePlatform[] = [
  'Auto Detect',
  'WordPress',
  'Shopify',
  'HTML / Static',
  'Custom',
  'Other',
];

const CHECK_INTERVAL_OPTIONS: WebsiteCheckIntervalMinutes[] = [5, 10, 15, 30, 60];
const STATUS_OPTIONS: Array<WebsiteStatus | 'ALL'> = ['ALL', 'UNKNOWN', 'ONLINE', 'DOWN', 'ERROR'];
const MONITORING_OPTIONS = ['ALL', 'ENABLED', 'DISABLED'];
const SORT_OPTIONS = ['OPERATIONS', 'LAST_CHECKED', 'STATUS', 'RESPONSE_TIME', 'WEBSITE'] as const;

type SortOption = typeof SORT_OPTIONS[number];

const emptyForm = (clientId = ''): WebsiteInput => ({
  name: '',
  url: '',
  client_id: clientId,
  platform: 'Auto Detect',
  hosting_provider: '',
  monitoring_enabled: true,
  check_interval_minutes: 10,
  internal_notes: '',
});

const displayValue = (value?: string | number) => {
  if (value === undefined || value === null || value === '') return <span>&mdash;</span>;
  return value;
};

const clientNameForWebsite = (website: WebsiteRecord, clients: Client[]) =>
  website.client?.business_name ||
  clients.find((client) => client.id === website.client_id)?.business_name ||
  'Unknown client';

const formatCheckInterval = (minutes: number) => {
  if (minutes === 60) return 'Every hour';
  return `Every ${minutes} minutes`;
};

const formatCheckIntervalShort = (minutes: number) => `${minutes} min`;

const formatLastChecked = (value?: string) => {
  if (!value) return 'Never checked';

  const checkedAt = new Date(value);
  if (Number.isNaN(checkedAt.getTime())) return value;

  const diffMs = Date.now() - checkedAt.getTime();
  if (diffMs < 0) return 'Just now';

  const diffMinutes = Math.floor(diffMs / 60_000);
  if (diffMinutes < 1) return 'Just now';
  if (diffMinutes < 60) return `${diffMinutes} min ago`;

  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) return `${diffHours} hr ago`;

  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 7) return `${diffDays} day${diffDays === 1 ? '' : 's'} ago`;

  return checkedAt.toLocaleDateString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  });
};

const formatExactTimestamp = (value?: string) => {
  if (!value) return 'No check has been recorded yet.';

  const checkedAt = new Date(value);
  if (Number.isNaN(checkedAt.getTime())) return value;

  return checkedAt.toLocaleString('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
};

const formatHttpValue = (value?: number) => (value === undefined || value === null ? <span>&mdash;</span> : value);

const formatResponseTime = (value?: number) =>
  value === undefined || value === null
    ? <span>&mdash;</span>
    : value >= 1000
      ? `${(value / 1000).toFixed(value >= 10_000 ? 0 : 1)} s`
      : `${value} ms`;

const isWebsiteStale = (website: WebsiteRecord) => {
  if (!website.monitoring_enabled || !website.last_checked_at) return false;

  const lastChecked = new Date(website.last_checked_at);
  if (Number.isNaN(lastChecked.getTime())) return true;

  return lastChecked.getTime() + website.check_interval_minutes * 60_000 < Date.now();
};

const getVisibleStatus = (website: WebsiteRecord) =>
  website.monitoring_enabled ? website.current_status : 'MONITORING OFF';

const getOperationalRank = (website: WebsiteRecord) => {
  if (!website.monitoring_enabled) return 5;
  if (website.current_status === 'DOWN') return 0;
  if (website.current_status === 'ERROR') return 1;
  if (website.current_status === 'UNKNOWN' || isWebsiteStale(website)) return 2;
  if (website.current_status === 'ONLINE') return 3;
  return 4;
};

const getWebsiteCardTone = (website: WebsiteRecord) => {
  if (!website.monitoring_enabled) return 'border-white/10 bg-slate-950/60';
  if (website.current_status === 'DOWN') return 'border-rose-500/30 bg-rose-950/20';
  if (website.current_status === 'ERROR') return 'border-amber-500/30 bg-amber-950/20';
  if (website.current_status === 'ONLINE') return 'border-sky-500/25 bg-slate-950/70';
  return 'border-cyan-500/20 bg-slate-950/60';
};

const compareLastChecked = (a?: string, b?: string) => {
  if (!a && !b) return 0;
  if (!a) return -1;
  if (!b) return 1;
  return new Date(a).getTime() - new Date(b).getTime();
};

const sortWebsites = (
  rows: WebsiteRecord[],
  sortOption: SortOption,
  clients: Client[]
) =>
  [...rows].sort((a, b) => {
    if (sortOption === 'WEBSITE') {
      return a.name.localeCompare(b.name);
    }

    if (sortOption === 'STATUS') {
      return getVisibleStatus(a).localeCompare(getVisibleStatus(b));
    }

    if (sortOption === 'RESPONSE_TIME') {
      return (b.last_response_time_ms || -1) - (a.last_response_time_ms || -1);
    }

    if (sortOption === 'LAST_CHECKED') {
      return compareLastChecked(a.last_checked_at, b.last_checked_at);
    }

    const rank = getOperationalRank(a) - getOperationalRank(b);
    if (rank !== 0) return rank;

    const freshness = compareLastChecked(a.last_checked_at, b.last_checked_at);
    if (freshness !== 0) return freshness;

    const clientName = clientNameForWebsite(a, clients).localeCompare(clientNameForWebsite(b, clients));
    if (clientName !== 0) return clientName;

    return a.name.localeCompare(b.name);
  });

const detailIdFromPath = () => {
  if (typeof window === 'undefined') return null;
  const [, adminSegment, routeSegment, websiteId] = window.location.pathname.split('/');
  if (adminSegment !== 'admin' || routeSegment !== 'websites' || !websiteId) return null;
  return websiteId;
};

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
        check_interval_minutes: website.check_interval_minutes,
        internal_notes: website.internal_notes || '',
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
      <div className="bg-slate-950 border border-white/10 rounded-xl w-full max-w-xl max-h-[90vh] overflow-y-auto p-6 space-y-5 shadow-2xl shadow-black/50">
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

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-3">
            <h4 className="text-[10px] text-[#0099FF] uppercase font-bold tracking-wider">
              Website Information
            </h4>

            <div>
              <label className="block text-[10px] text-white/40 uppercase mb-1">Website Name *</label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
                placeholder="Main website"
                className="w-full bg-slate-900/80 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#0099FF]"
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
                placeholder="https://example.com"
                className={`w-full bg-slate-900/80 border rounded-lg px-3 py-2 text-white focus:outline-none ${
                  urlError ? 'border-rose-500/60 focus:border-rose-400' : 'border-white/10 focus:border-[#0099FF]'
                }`}
              />
              <p className={`mt-1 text-[10px] ${urlError ? 'text-rose-300' : 'text-white/35'}`}>
                {urlError || 'URLs without a protocol are saved as HTTPS. Checks run server-side.'}
              </p>
            </div>

            <div>
              <label className="block text-[10px] text-white/40 uppercase mb-1">Client *</label>
              <select
                required
                value={form.client_id}
                onChange={(event) => setForm((current) => ({ ...current, client_id: event.target.value }))}
                className="w-full bg-slate-900/80 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#0099FF]"
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] text-white/40 uppercase mb-1">Platform</label>
                <select
                  value={form.platform}
                  onChange={(event) => setForm((current) => ({ ...current, platform: event.target.value }))}
                  className="w-full bg-slate-900/80 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#0099FF]"
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
                  className="w-full bg-slate-900/80 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#0099FF]"
                />
              </div>
            </div>
          </div>

          <div className="space-y-3 pt-4 border-t border-white/10">
            <h4 className="text-[10px] text-[#0099FF] uppercase font-bold tracking-wider">
              Monitoring
            </h4>

            <div className="flex items-center justify-between gap-3 p-3 bg-slate-900/70 border border-white/10 rounded-lg">
              <span>
                <span className="block text-white font-semibold">Monitoring</span>
                <span className="block text-[10px] text-white/40 mt-0.5">
                  Stores configuration only. Browser-based checks are not performed.
                </span>
              </span>
              <button
                type="button"
                onClick={() =>
                  setForm((current) => ({ ...current, monitoring_enabled: !current.monitoring_enabled }))
                }
                className={`min-w-20 rounded-lg border px-3 py-2 text-[11px] font-bold transition-colors ${
                  form.monitoring_enabled
                    ? 'bg-[#0099FF]/10 border-[#0099FF]/40 text-[#0099FF]'
                    : 'bg-white/5 border-white/10 text-white/45'
                }`}
                aria-pressed={form.monitoring_enabled}
              >
                {form.monitoring_enabled ? 'ON' : 'OFF'}
              </button>
            </div>

            {form.monitoring_enabled && (
              <div className="space-y-3 p-3 bg-slate-900/70 border border-white/10 rounded-lg">
                <div>
                  <div className="mb-2 text-[10px] text-white/40 uppercase">Checks</div>
                  <div className="flex items-center gap-2 text-white/80">
                    <CheckCircle2 className="h-4 w-4 text-[#0099FF]" />
                    <span>HTTPS Availability</span>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] text-white/40 uppercase mb-1">Frequency</label>
                  <select
                    value={form.check_interval_minutes}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        check_interval_minutes: Number(event.target.value) as WebsiteCheckIntervalMinutes,
                      }))
                    }
                    className="w-full bg-slate-950 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#0099FF]"
                  >
                    {CHECK_INTERVAL_OPTIONS.map((minutes) => (
                      <option key={minutes} value={minutes}>
                        {formatCheckInterval(minutes)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            <div>
              <label className="block text-[10px] text-white/40 uppercase mb-1">Internal Notes</label>
              <textarea
                value={form.internal_notes || ''}
                onChange={(event) => setForm((current) => ({ ...current, internal_notes: event.target.value }))}
                rows={3}
                placeholder="Internal monitoring or maintenance notes..."
                className="w-full resize-y bg-slate-900/80 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#0099FF]"
              />
            </div>
          </div>

          <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-end gap-3 pt-3 border-t border-white/10">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg border border-white/10"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving || clients.length === 0}
              className="px-4 py-2 bg-[#0099FF] hover:bg-[#0099FF]/80 disabled:opacity-50 text-white font-bold rounded-lg inline-flex items-center justify-center gap-2"
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
const WebsitesLoadingState: React.FC = () => (
  <div className="space-y-6 animate-pulse">
    <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
      {[1, 2, 3, 4, 5].map((item) => (
        <div key={item} className="p-3 rounded-xl border bg-slate-950/80 border-white/10 space-y-3">
          <div className="h-2.5 bg-white/10 rounded w-2/3" />
          <div className="h-7 bg-white/15 rounded w-1/3" />
          <div className="h-2.5 bg-white/5 rounded w-1/2" />
        </div>
      ))}
    </div>
    <div className="p-4 bg-slate-950/80 border border-white/10 rounded-xl flex flex-col lg:flex-row gap-3">
      <div className="h-9 bg-white/10 rounded-lg flex-1" />
      <div className="h-9 bg-white/10 rounded-lg w-full lg:w-56" />
      <div className="h-9 bg-white/10 rounded-lg w-full lg:w-40" />
    </div>
    <AdminSkeletonTable />
  </div>
);

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
  const [sortOption, setSortOption] = useState<SortOption>('OPERATIONS');
  const [detailWebsiteId, setDetailWebsiteId] = useState<string | null>(() => detailIdFromPath());
  const [detailRefreshKey, setDetailRefreshKey] = useState(0);
  const [selectedWebsite, setSelectedWebsite] = useState<WebsiteRecord | null>(null);
  const [editingWebsite, setEditingWebsite] = useState<WebsiteRecord | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [checkingWebsiteId, setCheckingWebsiteId] = useState<string | null>(null);
  const [deletingWebsite, setDeletingWebsite] = useState<WebsiteRecord | null>(null);

  const loadData = async (options?: { background?: boolean }) => {
    if (!options?.background) {
      setIsLoading(true);
    }
    setLoadError(null);
    try {
      const [websiteRows, clientRows] = await Promise.all([
        listWebsites(),
        clientService.getClients(),
      ]);
      setWebsites(websiteRows);
      setClients(clientRows);
      setSelectedWebsite((current) => (current ? websiteRows.find((row) => row.id === current.id) || null : null));
    } catch (err: any) {
      console.error('Websites module load failed:', err);
      setLoadError('Unable to load monitoring data.');
    } finally {
      if (!options?.background) {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    void loadData();

    const refreshTimer = window.setInterval(() => {
      void loadData({ background: true });
    }, 60_000);

    return () => window.clearInterval(refreshTimer);
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      setDetailWebsiteId(detailIdFromPath());
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const summary = useMemo(
    () => ({
      total: websites.length,
      online: websites.filter((website) => website.current_status === 'ONLINE').length,
      down: websites.filter((website) => website.current_status === 'DOWN').length,
      error: websites.filter((website) => website.current_status === 'ERROR').length,
      stale: websites.filter((website) => isWebsiteStale(website)).length,
      enabled: websites.filter((website) => website.monitoring_enabled).length,
      disabled: websites.filter((website) => !website.monitoring_enabled).length,
    }),
    [websites]
  );

  const filteredWebsites = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    const filtered = websites.filter((website) => {
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

    return sortWebsites(filtered, sortOption, clients);
  }, [clientFilter, clients, monitoringFilter, searchTerm, sortOption, statusFilter, websites]);

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

  const openWebsiteDetail = (websiteId: string) => {
    setDetailWebsiteId(websiteId);
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', `/admin/websites/${websiteId}`);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const closeWebsiteDetail = () => {
    setDetailWebsiteId(null);
    if (typeof window !== 'undefined' && window.location.pathname.startsWith('/admin/websites/')) {
      window.history.pushState({}, '', '/admin/websites');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSaveWebsite = async (input: WebsiteInput) => {
    setIsSaving(true);
    try {
      const saved = editingWebsite
        ? await updateWebsite(editingWebsite.id, input)
        : await createWebsite(input);
      await loadData();
      setDetailRefreshKey((current) => current + 1);
      setFormOpen(false);
      setEditingWebsite(null);
      setSelectedWebsite((current) => (current?.id === saved.id ? saved : current));
      onTriggerToast(
        'success',
        editingWebsite ? 'Website Updated' : 'Website Added',
        `${saved.name} is ready for server-side monitoring.`
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

  const handleCheckWebsite = async (website: WebsiteRecord) => {
    setCheckingWebsiteId(website.id);
    try {
      const result = await checkWebsiteNow(website.id);
      await loadData();

      if (result.skipped > 0 || result.checked === 0) {
        onTriggerToast('info', 'Website Not Checked', 'Monitoring is disabled for this website.');
        return;
      }

      const latest = result.results[0];
      if (!latest) {
        onTriggerToast('info', 'Website Not Checked', 'No monitoring result was returned.');
        return;
      }

      onTriggerToast(
        latest.status === 'DOWN' || latest.status === 'ERROR' ? 'error' : 'success',
        'Website Checked',
        `${website.name}: ${latest.status}${latest.http_status_code ? ` / HTTP ${latest.http_status_code}` : ''}`
      );
    } catch (err: any) {
      console.error('Website check failed:', err);
      onTriggerToast('error', 'Website Check Failed', err?.message || 'Could not check website.');
    } finally {
      setCheckingWebsiteId(null);
    }
  };

  if (detailWebsiteId && simulatedState === 'normal') {
    return (
      <div className="space-y-6">
        <WebsiteDetailPage
          websiteId={detailWebsiteId}
          refreshKey={detailRefreshKey}
          onBack={closeWebsiteDetail}
          onNavigate={onNavigate}
          onEditWebsite={openEditModal}
          onTriggerToast={onTriggerToast}
        />

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
      </div>
    );
  }

  if (simulatedState === 'skeleton' || (isLoading && !websites.length)) {
    return (
      <div className="space-y-6 animate-in fade-in duration-300 font-mono">
        <AdminPageHeader
          title="Websites"
          subtitle="Monitor and manage the websites you maintain for your clients."
          moduleCode="OPS-04 / WEBSITES"
        />
        <WebsitesLoadingState />
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
          title="Unable to load monitoring data"
          message={loadError || 'Please retry or verify admin access.'}
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
          title="No Websites Are Being Monitored Yet"
          description="Add your first client website to begin uptime monitoring."
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

      <section className="overflow-hidden rounded-2xl border border-sky-400/15 bg-slate-950 shadow-xl shadow-black/20">
        <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_420px]">
          <div className="p-5 sm:p-6 lg:p-7 border-b xl:border-b-0 xl:border-r border-white/10">
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] font-bold text-sky-300">
              <Activity className="h-3.5 w-3.5" />
              Live Website Operations
            </div>
            <h2 className="mt-3 text-2xl md:text-3xl font-display font-semibold text-white tracking-tight">
              Monitoring status across client websites.
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
              Server-side HTTPS checks are stored in Supabase and surfaced here for daily review, manual checks, and client maintenance records.
            </p>
            <div className="mt-5 flex flex-wrap gap-2 text-[11px]">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-sky-400/20 bg-sky-400/10 px-3 py-1.5 text-sky-200">
                <Server className="h-3.5 w-3.5" />
                {summary.enabled} monitored
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1.5 text-emerald-200">
                <Shield className="h-3.5 w-3.5" />
                {summary.online} online
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/20 bg-amber-400/10 px-3 py-1.5 text-amber-200">
                <Clock3 className="h-3.5 w-3.5" />
                {summary.stale} overdue
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-px bg-white/10">
            <button
              onClick={() => setStatusFilter('DOWN')}
              className="bg-slate-900/95 p-5 text-left hover:bg-rose-950/30 transition-colors"
            >
              <div className="flex items-center justify-between gap-3 text-rose-300">
                <span className="text-[10px] uppercase tracking-wider">Down</span>
                <AlertTriangle className="h-4 w-4" />
              </div>
              <div className="mt-3 text-3xl font-display font-semibold text-white">{summary.down}</div>
              <div className="mt-1 text-[11px] text-slate-400">Needs action</div>
            </button>
            <button
              onClick={() => setStatusFilter('ERROR')}
              className="bg-slate-900/95 p-5 text-left hover:bg-amber-950/30 transition-colors"
            >
              <div className="flex items-center justify-between gap-3 text-amber-300">
                <span className="text-[10px] uppercase tracking-wider">Errors</span>
                <Gauge className="h-4 w-4" />
              </div>
              <div className="mt-3 text-3xl font-display font-semibold text-white">{summary.error}</div>
              <div className="mt-1 text-[11px] text-slate-400">Check failures</div>
            </button>
            <button
              onClick={() => setStatusFilter('ONLINE')}
              className="bg-slate-900/95 p-5 text-left hover:bg-emerald-950/30 transition-colors"
            >
              <div className="flex items-center justify-between gap-3 text-emerald-300">
                <span className="text-[10px] uppercase tracking-wider">Online</span>
                <CheckCircle2 className="h-4 w-4" />
              </div>
              <div className="mt-3 text-3xl font-display font-semibold text-white">{summary.online}</div>
              <div className="mt-1 text-[11px] text-slate-400">Passing checks</div>
            </button>
            <button
              onClick={() => {
                setStatusFilter('ALL');
                setMonitoringFilter('ALL');
              }}
              className="bg-slate-900/95 p-5 text-left hover:bg-sky-950/30 transition-colors"
            >
              <div className="flex items-center justify-between gap-3 text-sky-300">
                <span className="text-[10px] uppercase tracking-wider">Total</span>
                <Globe className="h-4 w-4" />
              </div>
              <div className="mt-3 text-3xl font-display font-semibold text-white">{summary.total}</div>
              <div className="mt-1 text-[11px] text-slate-400">Website records</div>
            </button>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <button
          onClick={() => {
            setStatusFilter('ALL');
            setMonitoringFilter('ALL');
          }}
          className="p-4 rounded-xl border text-left transition-colors bg-slate-950/80 border-white/10 text-white/70 hover:border-white/30"
        >
          <div className="text-[10px] text-white/40 uppercase">Total Websites</div>
          <div className="text-lg font-bold text-white mt-1">{summary.total}</div>
          <div className="text-[10px] text-white/40 mt-1">Registered Records</div>
        </button>

        <button
          onClick={() => setStatusFilter('ONLINE')}
          className="p-4 rounded-xl border text-left transition-colors bg-slate-950/80 border-white/10 text-white/70 hover:border-emerald-500/50"
        >
          <div className="text-[10px] text-emerald-400 uppercase">Online</div>
          <div className="text-lg font-bold text-emerald-400 mt-1">{summary.online}</div>
          <div className="text-[10px] text-white/40 mt-1">Future Checks</div>
        </button>

        <button
          onClick={() => setStatusFilter('DOWN')}
          className="p-4 rounded-xl border text-left transition-colors bg-slate-950/80 border-white/10 text-white/70 hover:border-rose-500/50"
        >
          <div className="text-[10px] text-rose-400 uppercase">Down</div>
          <div className="text-lg font-bold text-rose-400 mt-1">{summary.down}</div>
          <div className="text-[10px] text-white/40 mt-1">Future Checks</div>
        </button>

        <button
          onClick={() => setStatusFilter('ERROR')}
          className="p-4 rounded-xl border text-left transition-colors bg-slate-950/80 border-white/10 text-white/70 hover:border-amber-500/50"
        >
          <div className="text-[10px] text-amber-400 uppercase">Error</div>
          <div className="text-lg font-bold text-amber-400 mt-1">{summary.error}</div>
          <div className="text-[10px] text-white/40 mt-1">Future Checks</div>
        </button>

        <button
          onClick={() => setMonitoringFilter('DISABLED')}
          className="p-4 rounded-xl border text-left transition-colors bg-slate-950/80 border-white/10 text-white/70 hover:border-white/40"
        >
          <div className="text-[10px] text-white/60 uppercase">Monitoring Disabled</div>
          <div className="text-lg font-bold text-white mt-1">{summary.disabled}</div>
          <div className="text-[10px] text-white/40 mt-1">Opted Out</div>
        </button>
      </div>

      <div className="p-4 bg-slate-950/80 border border-white/10 rounded-xl flex flex-col xl:flex-row xl:items-center justify-between gap-4">
        <div className="flex items-center gap-3 bg-slate-900/80 border border-white/10 rounded-lg px-3 py-2 flex-1 max-w-xl">
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
          <label className="sr-only" htmlFor="website-client-filter">Client</label>
          <select
            id="website-client-filter"
            value={clientFilter}
            onChange={(event) => setClientFilter(event.target.value)}
            className="bg-slate-900/80 border border-white/10 text-white font-mono text-xs rounded-lg p-2 focus:outline-none focus:border-[#0099FF]"
          >
            <option value="ALL">All Clients</option>
            {clients.map((client) => (
              <option key={client.id} value={client.id}>
                {client.business_name}
              </option>
            ))}
          </select>

          <label className="sr-only" htmlFor="website-status-filter">Status</label>
          <select
            id="website-status-filter"
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value as WebsiteStatus | 'ALL')}
            className="bg-slate-900/80 border border-white/10 text-white font-mono text-xs rounded-lg p-2 focus:outline-none focus:border-[#0099FF]"
          >
            {STATUS_OPTIONS.map((status) => (
              <option key={status} value={status}>
                {status === 'ALL' ? 'All Statuses' : status}
              </option>
            ))}
          </select>

          <label className="sr-only" htmlFor="website-monitoring-filter">Monitoring</label>
          <select
            id="website-monitoring-filter"
            value={monitoringFilter}
            onChange={(event) => setMonitoringFilter(event.target.value)}
            className="bg-slate-900/80 border border-white/10 text-white font-mono text-xs rounded-lg p-2 focus:outline-none focus:border-[#0099FF]"
          >
            {MONITORING_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option === 'ALL' ? 'All Monitoring' : option}
              </option>
            ))}
          </select>

          <label className="sr-only" htmlFor="website-sort">Sort</label>
          <select
            id="website-sort"
            value={sortOption}
            onChange={(event) => setSortOption(event.target.value as SortOption)}
            className="bg-slate-900/80 border border-white/10 text-white font-mono text-xs rounded-lg p-2 focus:outline-none focus:border-[#0099FF]"
          >
            <option value="OPERATIONS">Problem First</option>
            <option value="LAST_CHECKED">Last Checked</option>
            <option value="STATUS">Status</option>
            <option value="RESPONSE_TIME">Response Time</option>
            <option value="WEBSITE">Website Name</option>
          </select>

          {(clientFilter !== 'ALL' || statusFilter !== 'ALL' || monitoringFilter !== 'ALL' || searchTerm) && (
            <button
              onClick={() => {
                setClientFilter('ALL');
                setStatusFilter('ALL');
                setMonitoringFilter('ALL');
                setSearchTerm('');
              }}
              className="px-2.5 py-2 bg-white/5 hover:bg-white/10 text-[#0099FF] rounded-lg border border-white/10 text-[11px]"
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
              ? 'Add your first client website to begin uptime monitoring.'
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
          <div className="hidden md:block bg-slate-950/80 border border-white/10 rounded-xl overflow-hidden min-w-0 shadow-xl shadow-black/10">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1120px] text-left font-mono text-xs">
                <thead className="bg-slate-900/90 border-b border-white/10 text-slate-400 uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="p-3.5">Client</th>
                    <th className="p-3.5">Website</th>
                    <th className="p-3.5">Platform</th>
                    <th className="p-3.5">Status</th>
                    <th className="p-3.5">HTTP</th>
                    <th className="p-3.5">Response</th>
                    <th className="p-3.5">Last Checked</th>
                    <th className="p-3.5">Frequency</th>
                    <th className="p-3.5">Monitoring</th>
                    <th className="p-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.05]">
                  {filteredWebsites.map((website) => {
                    const stale = isWebsiteStale(website);

                    return (
                    <tr key={website.id} className="hover:bg-sky-500/[0.04] transition-colors">
                      <td className="p-3.5 text-white/80 font-medium max-w-[180px]">
                        <span className="truncate block">{clientNameForWebsite(website, clients)}</span>
                      </td>
                      <td className="p-3.5">
                        <div className="text-white font-bold text-sm truncate max-w-[180px]">
                          {website.name}
                        </div>
                        <a
                          href={website.normalized_url}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-1 text-[10px] text-[#0099FF] hover:text-white inline-flex items-center gap-1 truncate max-w-[210px]"
                        >
                          <span className="truncate">{website.normalized_url}</span>
                          <ExternalLink className="w-3 h-3 shrink-0" />
                        </a>
                      </td>
                      <td className="p-3.5 text-white/70">{website.platform}</td>
                      <td className="p-3.5">
                        <div className="flex flex-col items-start gap-1.5">
                          <AdminStatusBadge status={getVisibleStatus(website)} />
                          {stale && (
                            <span className="inline-flex items-center gap-1 text-[10px] text-amber-300">
                              <AlertTriangle className="w-3 h-3" />
                              Check overdue
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="p-3.5 text-white/50">{formatHttpValue(website.last_http_status_code)}</td>
                      <td className="p-3.5 text-white/50">{formatResponseTime(website.last_response_time_ms)}</td>
                      <td className="p-3.5 text-white/50" title={formatExactTimestamp(website.last_checked_at)}>
                        {formatLastChecked(website.last_checked_at)}
                      </td>
                      <td className="p-3.5 text-white/60">{formatCheckIntervalShort(website.check_interval_minutes)}</td>
                      <td className="p-3.5">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border text-[10px] font-semibold ${
                            website.monitoring_enabled
                              ? 'bg-[#0099FF]/10 text-[#0099FF] border-[#0099FF]/30'
                              : 'bg-white/5 text-white/40 border-white/10'
                          }`}
                        >
                          {website.monitoring_enabled ? <Power className="w-3 h-3" /> : <PowerOff className="w-3 h-3" />}
                          {website.monitoring_enabled ? 'On' : 'Off'}
                        </span>
                      </td>
                      <td className="p-3.5">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => openWebsiteDetail(website.id)}
                            className="p-1.5 bg-white/5 hover:bg-white/10 text-white/70 hover:text-white rounded-lg border border-white/10 inline-flex items-center gap-1 text-[11px]"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>View</span>
                          </button>
                          <button
                            onClick={() => openEditModal(website)}
                            className="p-1.5 bg-white/5 hover:bg-white/10 text-white/70 hover:text-white rounded-lg border border-white/10 inline-flex items-center gap-1 text-[11px]"
                          >
                            <Edit className="w-3.5 h-3.5" />
                            <span>Edit</span>
                          </button>
                          <button
                            onClick={() => void handleCheckWebsite(website)}
                            disabled={checkingWebsiteId === website.id || !website.monitoring_enabled}
                            className="p-1.5 bg-[#0099FF]/10 hover:bg-[#0099FF]/20 disabled:opacity-40 disabled:cursor-not-allowed text-[#0099FF] rounded-lg border border-[#0099FF]/20 inline-flex items-center gap-1 text-[11px]"
                            title={website.monitoring_enabled ? 'Run server-side HTTPS check' : 'Monitoring is disabled'}
                          >
                            <RefreshCw
                              className={`w-3.5 h-3.5 ${
                                checkingWebsiteId === website.id ? 'animate-spin' : ''
                              }`}
                            />
                            <span>{checkingWebsiteId === website.id ? 'Checking' : 'Check Now'}</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div className="block md:hidden space-y-3">
            {filteredWebsites.map((website) => {
              const stale = isWebsiteStale(website);

              return (
              <div
                key={website.id}
                className={`w-full p-4 border rounded-xl space-y-4 shadow-lg shadow-black/10 ${getWebsiteCardTone(website)}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1 min-w-0">
                    <div className="text-white font-bold text-sm truncate">{website.name}</div>
                    <div className="text-[#0099FF] text-[11px] truncate">{website.normalized_url}</div>
                  </div>
                  <div className="flex flex-col items-end gap-1.5">
                    <AdminStatusBadge status={getVisibleStatus(website)} size="sm" />
                    {stale && (
                      <span className="inline-flex items-center gap-1 text-[10px] text-amber-300">
                        <AlertTriangle className="w-3 h-3" />
                        Check overdue
                      </span>
                    )}
                  </div>
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
                    <div className="text-white/35 uppercase">HTTP</div>
                    <div className="text-white/60">{formatHttpValue(website.last_http_status_code)}</div>
                  </div>
                  <div>
                    <div className="text-white/35 uppercase">Response</div>
                    <div className="text-white/60">{formatResponseTime(website.last_response_time_ms)}</div>
                  </div>
                  <div>
                    <div className="text-white/35 uppercase">Last Checked</div>
                    <div className="text-white/60" title={formatExactTimestamp(website.last_checked_at)}>
                      {formatLastChecked(website.last_checked_at)}
                    </div>
                  </div>
                  <div>
                    <div className="text-white/35 uppercase">Frequency</div>
                    <div className="text-white/60">{formatCheckIntervalShort(website.check_interval_minutes)}</div>
                  </div>
                  <div>
                    <div className="text-white/35 uppercase">Monitoring</div>
                    <div className={website.monitoring_enabled ? 'text-[#0099FF]' : 'text-white/40'}>
                      {website.monitoring_enabled ? 'On' : 'Off'}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-3 border-t border-white/10">
                  <button
                    onClick={() => openWebsiteDetail(website.id)}
                    className="px-3 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg border border-white/10 inline-flex items-center justify-center gap-1.5 text-[11px]"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View</span>
                  </button>
                  <button
                    onClick={() => void handleCheckWebsite(website)}
                    disabled={checkingWebsiteId === website.id || !website.monitoring_enabled}
                    className="px-3 py-2 bg-[#0099FF]/10 hover:bg-[#0099FF]/20 disabled:opacity-40 disabled:cursor-not-allowed text-[#0099FF] rounded-lg border border-[#0099FF]/20 inline-flex items-center justify-center gap-1.5 text-[11px]"
                  >
                    <RefreshCw
                      className={`w-3.5 h-3.5 ${
                        checkingWebsiteId === website.id ? 'animate-spin' : ''
                      }`}
                    />
                    <span>{checkingWebsiteId === website.id ? 'Checking' : 'Check Now'}</span>
                  </button>
                </div>
              </div>
              );
            })}
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
            <div className="p-4 bg-slate-950/80 border border-white/10 rounded-xl space-y-3">
              <div className="text-white/40 uppercase text-[10px]">Status</div>
              <div className="flex items-center justify-between gap-3">
                <div className="flex flex-col items-start gap-1.5">
                  <AdminStatusBadge status={getVisibleStatus(selectedWebsite)} />
                  {isWebsiteStale(selectedWebsite) && (
                    <span className="inline-flex items-center gap-1 text-[10px] text-amber-300">
                      <AlertTriangle className="w-3 h-3" />
                      Check overdue
                    </span>
                  )}
                </div>
                <span className="text-white/50" title={formatExactTimestamp(selectedWebsite.last_checked_at)}>
                  {formatLastChecked(selectedWebsite.last_checked_at)}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-3 pt-2">
                <div className="p-3 bg-slate-900/70 border border-white/10 rounded-lg">
                  <div className="text-white/35 uppercase text-[10px]">HTTP</div>
                  <div className="text-white/70 mt-1">{formatHttpValue(selectedWebsite.last_http_status_code)}</div>
                </div>
                <div className="p-3 bg-slate-900/70 border border-white/10 rounded-lg">
                  <div className="text-white/35 uppercase text-[10px]">Response</div>
                  <div className="text-white/70 mt-1">{formatResponseTime(selectedWebsite.last_response_time_ms)}</div>
                </div>
                <div className="p-3 bg-slate-900/70 border border-white/10 rounded-lg">
                  <div className="text-white/35 uppercase text-[10px]">Last Check</div>
                  <div className="text-white/70 mt-1" title={formatExactTimestamp(selectedWebsite.last_checked_at)}>
                    {formatLastChecked(selectedWebsite.last_checked_at)}
                  </div>
                </div>
              </div>
              <div className="text-[10px] text-white/35">
                Exact timestamp: {formatExactTimestamp(selectedWebsite.last_checked_at)}
              </div>
            </div>

            <div className="p-4 bg-slate-950/80 border border-white/10 rounded-xl space-y-3">
              <div className="text-white/40 uppercase text-[10px]">Monitoring</div>
              <div className="flex items-center justify-between gap-3">
                <span className="text-white/40 uppercase">Monitoring</span>
                <span className={selectedWebsite.monitoring_enabled ? 'text-[#0099FF]' : 'text-white/40'}>
                  {selectedWebsite.monitoring_enabled ? 'ON' : 'OFF'}
                </span>
              </div>
              {selectedWebsite.monitoring_enabled && (
                <>
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-white/40 uppercase">Check</span>
                    <span className="text-white/80 inline-flex items-center gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-[#0099FF]" />
                      HTTPS Availability
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-white/40 uppercase">Frequency</span>
                    <span className="text-white/80 inline-flex items-center gap-2">
                      <Clock3 className="h-3.5 w-3.5 text-[#0099FF]" />
                      {formatCheckInterval(selectedWebsite.check_interval_minutes)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-white/40 uppercase">Last checked</span>
                    <span className="text-white/80">{formatLastChecked(selectedWebsite.last_checked_at)}</span>
                  </div>
                </>
              )}
              <p className="border-t border-white/10 pt-3 text-white/50 leading-relaxed">
                Checks run through the server-side monitoring function. The browser does not fetch client websites.
              </p>
            </div>

            <div className="p-4 bg-slate-950/80 border border-white/10 rounded-xl space-y-3">
              <div className="text-white/40 uppercase text-[10px]">Website</div>
              <div className="flex items-center justify-between gap-3">
                <span className="text-white/40 uppercase">Website name</span>
                <span className="text-white font-medium text-right">{selectedWebsite.name}</span>
              </div>
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
            </div>

            <div className="p-4 bg-slate-950/80 border border-white/10 rounded-xl space-y-2">
              <div className="text-white/40 uppercase text-[10px]">Notes</div>
              <p className="whitespace-pre-wrap text-white/70 leading-relaxed">
                {selectedWebsite.internal_notes || 'No internal notes.'}
              </p>
            </div>

            <div className="flex items-center justify-end gap-2">
              <button
                onClick={() => void handleCheckWebsite(selectedWebsite)}
                disabled={checkingWebsiteId === selectedWebsite.id || !selectedWebsite.monitoring_enabled}
                className="px-3 py-2 bg-[#0099FF]/10 hover:bg-[#0099FF]/20 disabled:opacity-40 disabled:cursor-not-allowed text-[#0099FF] rounded-lg border border-[#0099FF]/20 inline-flex items-center gap-1.5"
              >
                <RefreshCw
                  className={`w-3.5 h-3.5 ${
                    checkingWebsiteId === selectedWebsite.id ? 'animate-spin' : ''
                  }`}
                />
                <span>Check Now</span>
              </button>
              <button
                onClick={() => openEditModal(selectedWebsite)}
                className="px-3 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg border border-white/10 inline-flex items-center gap-1.5"
              >
                <Edit className="w-3.5 h-3.5" />
                <span>Edit Website</span>
              </button>
              <button
                onClick={() => setDeletingWebsite(selectedWebsite)}
                className="px-3 py-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 rounded-lg border border-rose-500/20 inline-flex items-center gap-1.5"
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
            ? `Remove ${deletingWebsite.name} from the Websites module. Its monitoring check history will also be removed.`
            : undefined
        }
        confirmLabel="Delete Website"
        confirmVariant="danger"
        onConfirm={() => void handleDeleteWebsite()}
      />
    </div>
  );
};
