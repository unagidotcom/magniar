import React, { useEffect, useMemo, useState } from 'react';
import {
  Activity,
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  Clock3,
  Database,
  Edit,
  ExternalLink,
  KeyRound,
  Package,
  Palette,
  RefreshCw,
  Shield,
} from 'lucide-react';
import {
  WebsiteCheckRecord,
  WebsiteCheckSummary,
  WebsiteHistoryRange,
  WebsiteHistoryStatusFilter,
  WebsiteRecord,
  WordPressSiteReport,
} from '../../../types/websites';
import {
  checkWebsiteNow,
  getWebsiteById,
  getWebsiteCheckSummary,
  getLatestWordPressSiteReport,
  getWordPressReportEndpoint,
  listWebsiteChecks,
  regenerateWordPressTrackerKey,
} from '../../../services/websiteService';
import { AdminEmptyState } from '../AdminEmptyState';
import { AdminErrorState } from '../AdminErrorState';
import { AdminSkeletonCard, AdminSkeletonTable } from '../AdminSkeleton';
import { AdminStatusBadge } from '../AdminStatusBadge';

interface WebsiteDetailPageProps {
  websiteId: string;
  refreshKey?: number;
  onBack: () => void;
  onNavigate?: (route: string) => void;
  onEditWebsite: (website: WebsiteRecord) => void;
  onTriggerToast: (type: 'success' | 'info' | 'error', title: string, message?: string) => void;
}

const HISTORY_LIMIT = 25;
const TIME_RANGE_OPTIONS: WebsiteHistoryRange[] = ['24H', '7D', '30D'];
const STATUS_FILTER_OPTIONS: WebsiteHistoryStatusFilter[] = ['ALL', 'ONLINE', 'DOWN', 'ERROR'];

const displayDash = (value?: string | number | null) =>
  value === undefined || value === null || value === '' ? <span>&mdash;</span> : value;

const formatUrlHost = (value: string) => {
  try {
    return new URL(value).hostname.replace(/^www\./, '');
  } catch {
    return value;
  }
};

const formatExactTimestamp = (value?: string | null) => {
  if (!value) return 'Never';

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return date.toLocaleString('en-US', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

const formatRelativeTime = (value?: string | null) => {
  if (!value) return 'Never';

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  const diffMs = Date.now() - date.getTime();
  if (diffMs < 0) return 'Just now';

  const minutes = Math.floor(diffMs / 60_000);
  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes} min ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hr ago`;

  const days = Math.floor(hours / 24);
  if (days < 7) return `${days} day${days === 1 ? '' : 's'} ago`;

  return formatExactTimestamp(value);
};

const formatResponseTime = (value?: number | null) =>
  value === undefined || value === null
    ? <span>&mdash;</span>
    : value >= 1000
      ? `${(value / 1000).toFixed(value >= 10_000 ? 0 : 1)} s`
      : `${value} ms`;

const formatInterval = (minutes: number) => (minutes === 60 ? 'Every hour' : `Every ${minutes} minutes`);

const visibleStatus = (website: WebsiteRecord) =>
  website.monitoring_enabled ? website.current_status : 'MONITORING OFF';

const isOverdue = (website: WebsiteRecord) => {
  if (!website.monitoring_enabled || !website.last_checked_at) return false;

  const lastChecked = new Date(website.last_checked_at);
  if (Number.isNaN(lastChecked.getTime())) return true;

  return lastChecked.getTime() + website.check_interval_minutes * 60_000 < Date.now();
};

const sanitizeErrorMessage = (value?: string | null) => {
  if (!value) return <span>&mdash;</span>;
  return value.replace(/\s+/g, ' ').slice(0, 160);
};

const rangeLabel = (range: WebsiteHistoryRange) => {
  if (range === '24H') return '24 Hours';
  if (range === '7D') return '7 Days';
  return '30 Days';
};

const metricCard = (label: string, value: React.ReactNode, sublabel?: string) => (
  <div className="bg-slate-950/80 border border-white/10 rounded-xl p-4 min-w-0 shadow-lg shadow-black/10">
    <div className="font-mono text-[10px] text-white/40 uppercase tracking-wider">{label}</div>
    <div className="mt-2 text-xl font-display font-semibold text-white truncate">{value}</div>
    {sublabel && <div className="mt-1 text-[11px] text-white/40 truncate">{sublabel}</div>}
  </div>
);

const trackerCard = (
  label: string,
  value: React.ReactNode,
  sublabel: string,
  icon: React.ReactNode,
  tone = 'text-slate-300'
) => (
  <div className="rounded-xl border border-white/10 bg-slate-900/70 p-4">
    <div className="flex items-start justify-between gap-3">
      <div className="min-w-0">
        <div className="font-mono text-[10px] uppercase tracking-wider text-white/40">{label}</div>
        <div className={`mt-2 text-lg font-display font-semibold ${tone}`}>{value}</div>
      </div>
      <div className="rounded-lg border border-white/10 bg-slate-950/80 p-2 text-[#0099FF]">
        {icon}
      </div>
    </div>
    <div className="mt-2 text-[11px] leading-relaxed text-white/45">{sublabel}</div>
  </div>
);

const flagLabel = (value?: boolean | null, trueLabel = 'Yes', falseLabel = 'No') => {
  if (value === null || value === undefined) return 'Waiting';
  return value ? trueLabel : falseLabel;
};

const healthTone = (status?: WordPressSiteReport['health_status']) => {
  if (status === 'GOOD') return 'text-emerald-300';
  if (status === 'WARNING') return 'text-amber-300';
  if (status === 'CRITICAL') return 'text-rose-300';
  return 'text-slate-200';
};

interface WordPressTrackerPanelProps {
  website: WebsiteRecord;
  report: WordPressSiteReport | null;
  generatedTrackerKey: string | null;
  isGeneratingTrackerKey: boolean;
  onGenerateTrackerKey: () => void;
  onCopy: (value: string, label: string) => void;
}

const WordPressTrackerPanel: React.FC<WordPressTrackerPanelProps> = ({
  website,
  report,
  generatedTrackerKey,
  isGeneratingTrackerKey,
  onGenerateTrackerKey,
  onCopy,
}) => {
  const isWordPress = String(website.platform || '').toLowerCase().includes('wordpress');
  const adminUrl = `${website.normalized_url.replace(/\/$/, '')}/wp-admin/`;
  const endpoint = getWordPressReportEndpoint();
  const connectionLabel = report
    ? `Last report ${formatRelativeTime(report.reported_at)}`
    : website.wordpress_tracker_enabled
      ? 'Key generated'
      : 'Awaiting key';

  return (
    <section className="overflow-hidden rounded-2xl border border-sky-400/15 bg-slate-950 shadow-xl shadow-black/20">
      <div className="grid grid-cols-1 xl:grid-cols-[340px_minmax(0,1fr)]">
        <div className="border-b border-white/10 p-5 sm:p-6 xl:border-b-0 xl:border-r">
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-sky-300">
            <Shield className="h-3.5 w-3.5" />
            WordPress Tracker
          </div>
          <h2 className="mt-3 text-xl font-display font-semibold text-white">
            Site intelligence panel
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-300">
            Plugin data will appear here after this website is connected to the Magniar WordPress tracker.
          </p>

          <div className="mt-5 space-y-3 text-xs">
            <div className="flex items-center justify-between gap-3 rounded-lg border border-white/10 bg-slate-900/70 p-3">
              <span className="text-white/40 uppercase">Platform</span>
              <span className={isWordPress ? 'text-sky-200' : 'text-amber-200'}>
                {isWordPress ? 'WordPress' : website.platform}
              </span>
            </div>
            <div className="flex items-center justify-between gap-3 rounded-lg border border-white/10 bg-slate-900/70 p-3">
              <span className="text-white/40 uppercase">Connection</span>
              <span className={report ? 'text-emerald-200' : 'text-amber-200'}>{connectionLabel}</span>
            </div>
            <div className="flex items-center justify-between gap-3 rounded-lg border border-white/10 bg-slate-900/70 p-3">
              <span className="text-white/40 uppercase">Health</span>
              <span className={healthTone(report?.health_status)}>{report?.health_status || 'Waiting'}</span>
            </div>
            <div className="rounded-lg border border-white/10 bg-slate-900/70 p-3">
              <div className="text-white/40 uppercase">Admin URL</div>
              <a
                href={adminUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-flex max-w-full items-center gap-1.5 text-[#0099FF] hover:text-white"
              >
                <span className="truncate">{formatUrlHost(adminUrl)}/wp-admin</span>
                <ExternalLink className="h-3.5 w-3.5 shrink-0" />
              </a>
            </div>
            <div className="grid grid-cols-1 gap-2 pt-2">
              <button
                type="button"
                onClick={() => onCopy(website.id, 'Website ID')}
                className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-left text-white/70 hover:bg-white/10 hover:text-white"
              >
                Copy Website ID
              </button>
              {endpoint && (
                <button
                  type="button"
                  onClick={() => onCopy(endpoint, 'Tracker endpoint')}
                  className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-left text-white/70 hover:bg-white/10 hover:text-white"
                >
                  Copy Tracker Endpoint
                </button>
              )}
              <button
                type="button"
                onClick={onGenerateTrackerKey}
                disabled={isGeneratingTrackerKey}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#0099FF]/25 bg-[#0099FF]/10 px-3 py-2 font-bold text-[#0099FF] hover:bg-[#0099FF]/20 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <RefreshCw className={`h-3.5 w-3.5 ${isGeneratingTrackerKey ? 'animate-spin' : ''}`} />
                {website.wordpress_tracker_enabled ? 'Regenerate Tracker Key' : 'Generate Tracker Key'}
              </button>
            </div>
          </div>
        </div>

        <div className="p-5 sm:p-6">
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-[#0099FF]">
                Plugin Report
              </div>
              <div className="mt-1 text-white/55">
                {report
                  ? `Latest report received ${formatExactTimestamp(report.reported_at)}.`
                  : 'No WordPress tracker report has been received for this website yet.'}
              </div>
            </div>
            <span
              className={`inline-flex w-fit items-center gap-1.5 rounded-full border px-3 py-1.5 text-[11px] ${
                report
                  ? 'border-emerald-400/20 bg-emerald-400/10 text-emerald-200'
                  : 'border-amber-400/20 bg-amber-400/10 text-amber-200'
              }`}
            >
              {report ? <CheckCircle2 className="h-3.5 w-3.5" /> : <Clock3 className="h-3.5 w-3.5" />}
              {report ? 'Connected' : 'Pending connection'}
            </span>
          </div>

          {generatedTrackerKey && (
            <div className="mb-4 rounded-xl border border-amber-400/25 bg-amber-400/10 p-4">
              <div className="text-[10px] font-bold uppercase tracking-wider text-amber-200">
                One-time tracker key
              </div>
              <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:items-center">
                <code className="min-w-0 flex-1 truncate rounded-lg border border-white/10 bg-slate-950/80 px-3 py-2 text-[11px] text-white">
                  {generatedTrackerKey}
                </code>
                <button
                  type="button"
                  onClick={() => onCopy(generatedTrackerKey, 'Tracker key')}
                  className="rounded-lg border border-amber-400/25 bg-amber-400/10 px-3 py-2 text-[11px] font-bold text-amber-100 hover:bg-amber-400/20"
                >
                  Copy Key
                </button>
              </div>
              <p className="mt-2 text-[11px] leading-relaxed text-amber-100/70">
                Store this in the WordPress plugin when it is built. The full key will not be shown again after leaving this page.
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
            {trackerCard(
              'WordPress Core',
              report?.wordpress_version || 'Waiting',
              report?.wordpress_update_available === true ? 'Core update is available.' : 'Version, update status, and auto-update state.',
              <Shield className="h-4 w-4" />,
              report?.wordpress_update_available ? 'text-amber-300' : 'text-slate-200'
            )}
            {trackerCard(
              'PHP Runtime',
              report?.php_version || 'Waiting',
              report ? flagLabel(report.php_supported, 'Supported runtime', 'Review PHP version') : 'PHP version and compatibility warnings.',
              <Database className="h-4 w-4" />,
              report?.php_supported === false ? 'text-amber-300' : 'text-slate-200'
            )}
            {trackerCard(
              'Plugins',
              report ? `${report.plugin_count} total` : 'Waiting',
              report ? `${report.active_plugin_count} active, ${report.inactive_plugin_count} inactive, ${report.plugin_updates_available} updates.` : 'Installed count, active count, and available updates.',
              <Package className="h-4 w-4" />,
              report && report.plugin_updates_available > 0 ? 'text-amber-300' : 'text-slate-200'
            )}
            {trackerCard(
              'Themes',
              report?.active_theme_name || 'Waiting',
              report ? `${report.active_theme_version || 'Version unknown'} / ${report.theme_updates_available} theme updates.` : 'Active theme and theme update information.',
              <Palette className="h-4 w-4" />,
              report && report.theme_updates_available > 0 ? 'text-amber-300' : 'text-slate-200'
            )}
            {trackerCard(
              'Security',
              report ? flagLabel(report.ssl_enabled, 'SSL active', 'SSL issue') : 'Waiting',
              report ? `Admin SSL: ${flagLabel(report.admin_ssl_enabled)} / Search visible: ${flagLabel(report.search_engine_visible)}` : 'SSL, visibility, and basic hardening flags.',
              <KeyRound className="h-4 w-4" />,
              report?.ssl_enabled === false || report?.admin_ssl_enabled === false ? 'text-rose-300' : 'text-slate-200'
            )}
            {trackerCard(
              'Backups',
              report ? flagLabel(report.backup_detected, 'Detected', 'Not detected') : 'Waiting',
              report?.backup_last_run_at ? `Latest signal: ${formatRelativeTime(report.backup_last_run_at)}` : 'Latest backup signal when the plugin supports it.',
              <CheckCircle2 className="h-4 w-4" />,
              report?.backup_detected === false ? 'text-amber-300' : 'text-slate-200'
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

const MonitoringChart: React.FC<{ checks: WebsiteCheckRecord[] }> = ({ checks }) => {
  const plottedChecks = checks
    .filter((check) => typeof check.response_time_ms === 'number')
    .slice()
    .reverse();

  const failedChecks = checks.filter((check) => check.status !== 'ONLINE');

  if (checks.length === 0) {
    return (
      <div className="h-64 border border-white/10 bg-slate-950 rounded-xl flex items-center justify-center text-white/40 text-xs">
        No response-time data yet.
      </div>
    );
  }

  if (plottedChecks.length === 0) {
    return (
      <div className="h-64 border border-white/10 bg-slate-950 rounded-xl flex items-center justify-center text-white/40 text-xs">
        Recent checks have no response-time values to plot.
      </div>
    );
  }

  const width = 720;
  const height = 260;
  const padding = 36;
  const values = plottedChecks.map((check) => check.response_time_ms || 0);
  const maxValue = Math.max(...values, 100);
  const xFor = (index: number) =>
    padding + (index / Math.max(plottedChecks.length - 1, 1)) * (width - padding * 2);
  const yFor = (value: number) =>
    height - padding - (value / maxValue) * (height - padding * 2);

  const points = plottedChecks
    .map((check, index) => `${xFor(index)},${yFor(check.response_time_ms || 0)}`)
    .join(' ');

  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-slate-950">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-label="Response time history chart. Failed checks without response time are not plotted as zero."
        className="w-full h-64"
      >
        {[0, 1, 2, 3].map((line) => {
          const y = padding + line * ((height - padding * 2) / 3);
          return <line key={line} x1={padding} x2={width - padding} y1={y} y2={y} stroke="rgba(255,255,255,0.08)" />;
        })}
        <polyline fill="none" stroke="#0099FF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" points={points} />
        {plottedChecks.map((check, index) => (
          <circle
            key={check.id}
            cx={xFor(index)}
            cy={yFor(check.response_time_ms || 0)}
            r="4"
            fill={check.status === 'ONLINE' ? '#0099FF' : '#F59E0B'}
          >
            <title>
              {`${formatExactTimestamp(check.checked_at)} / ${check.response_time_ms} ms / ${check.status}${
                check.http_status_code ? ` / HTTP ${check.http_status_code}` : ''
              }`}
            </title>
          </circle>
        ))}
        <text x={padding} y={height - 10} fill="rgba(255,255,255,0.38)" fontSize="11">
          {formatRelativeTime(plottedChecks[0]?.checked_at)}
        </text>
        <text x={width - padding} y={height - 10} fill="rgba(255,255,255,0.38)" fontSize="11" textAnchor="end">
          {formatRelativeTime(plottedChecks[plottedChecks.length - 1]?.checked_at)}
        </text>
        <text x={padding} y={18} fill="rgba(255,255,255,0.38)" fontSize="11">
          {maxValue} ms
        </text>
      </svg>
      {failedChecks.length > 0 && (
        <div className="border-t border-white/10 px-4 py-2 text-[11px] text-amber-300 flex items-center gap-2">
          <AlertTriangle className="w-3.5 h-3.5" />
          <span>{failedChecks.length} failed check{failedChecks.length === 1 ? '' : 's'} in this range.</span>
        </div>
      )}
    </div>
  );
};

const HistoryRows: React.FC<{ checks: WebsiteCheckRecord[] }> = ({ checks }) => (
  <>
    <div className="hidden md:block border border-white/10 rounded-xl overflow-hidden">
      <table className="w-full text-left font-mono text-xs">
        <thead className="bg-slate-900/90 border-b border-white/10 text-slate-400 uppercase tracking-wider text-[10px]">
          <tr>
            <th className="p-3">Checked At</th>
            <th className="p-3">Status</th>
            <th className="p-3">HTTP</th>
            <th className="p-3">Response</th>
            <th className="p-3">Error</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/[0.05]">
          {checks.map((check) => (
            <tr key={check.id} className="hover:bg-sky-500/[0.04]">
              <td className="p-3 text-white/70" title={formatExactTimestamp(check.checked_at)}>
                {formatRelativeTime(check.checked_at)}
              </td>
              <td className="p-3"><AdminStatusBadge status={check.status} size="sm" /></td>
              <td className="p-3 text-white/60">{displayDash(check.http_status_code)}</td>
              <td className="p-3 text-white/60">{formatResponseTime(check.response_time_ms)}</td>
              <td className="p-3 text-white/50 max-w-xs truncate">{sanitizeErrorMessage(check.error_message)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    <div className="md:hidden space-y-3">
      {checks.map((check) => (
        <div key={check.id} className="p-4 bg-slate-950/80 border border-white/10 rounded-xl space-y-3">
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="text-white/40 uppercase text-[10px]">Checked At</div>
              <div className="text-white/80" title={formatExactTimestamp(check.checked_at)}>
                {formatRelativeTime(check.checked_at)}
              </div>
            </div>
            <AdminStatusBadge status={check.status} size="sm" />
          </div>
          <div className="grid grid-cols-2 gap-3 text-[11px]">
            <div>
              <div className="text-white/35 uppercase">HTTP</div>
              <div className="text-white/70">{displayDash(check.http_status_code)}</div>
            </div>
            <div>
              <div className="text-white/35 uppercase">Response</div>
              <div className="text-white/70">{formatResponseTime(check.response_time_ms)}</div>
            </div>
          </div>
          {check.error_message && (
            <div className="text-[11px] text-amber-200/80 border-t border-white/10 pt-3">
              {sanitizeErrorMessage(check.error_message)}
            </div>
          )}
        </div>
      ))}
    </div>
  </>
);

export const WebsiteDetailPage: React.FC<WebsiteDetailPageProps> = ({
  websiteId,
  refreshKey = 0,
  onBack,
  onNavigate,
  onEditWebsite,
  onTriggerToast,
}) => {
  const [website, setWebsite] = useState<WebsiteRecord | null>(null);
  const [history, setHistory] = useState<WebsiteCheckRecord[]>([]);
  const [summary, setSummary] = useState<WebsiteCheckSummary | null>(null);
  const [wordpressReport, setWordpressReport] = useState<WordPressSiteReport | null>(null);
  const [generatedTrackerKey, setGeneratedTrackerKey] = useState<string | null>(null);
  const [timeRange, setTimeRange] = useState<WebsiteHistoryRange>('24H');
  const [statusFilter, setStatusFilter] = useState<WebsiteHistoryStatusFilter>('ALL');
  const [historyLimit, setHistoryLimit] = useState(HISTORY_LIMIT);
  const [isLoading, setIsLoading] = useState(true);
  const [isChecking, setIsChecking] = useState(false);
  const [isGeneratingTrackerKey, setIsGeneratingTrackerKey] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  const loadDetail = async (options?: { background?: boolean }) => {
    if (!options?.background) setIsLoading(true);
    setLoadError(null);

    try {
      const [websiteRow, historyRows, summaryRow, wordpressReportRow] = await Promise.all([
        getWebsiteById(websiteId),
        listWebsiteChecks(websiteId, {
          timeRange,
          status: statusFilter,
          limit: historyLimit,
        }),
        getWebsiteCheckSummary(websiteId, timeRange),
        getLatestWordPressSiteReport(websiteId),
      ]);

      setWebsite(websiteRow);
      setHistory(historyRows);
      setSummary(summaryRow);
      setWordpressReport(wordpressReportRow);
    } catch (err: any) {
      console.error('Website monitoring detail load failed:', err);
      setLoadError('Unable to load website monitoring details.');
    } finally {
      if (!options?.background) setIsLoading(false);
    }
  };

  useEffect(() => {
    setHistoryLimit(HISTORY_LIMIT);
  }, [statusFilter, timeRange]);

  useEffect(() => {
    void loadDetail();

    const refreshTimer = window.setInterval(() => {
      void loadDetail({ background: true });
    }, 60_000);

    return () => window.clearInterval(refreshTimer);
  }, [websiteId, timeRange, statusFilter, historyLimit, refreshKey]);

  const currentError = useMemo(
    () => history.find((check) => check.status === 'DOWN' || check.status === 'ERROR')?.error_message || null,
    [history]
  );

  const handleCheckNow = async () => {
    if (!website) return;

    setIsChecking(true);
    try {
      const result = await checkWebsiteNow(website.id);
      await loadDetail();

      const latest = result.results[0];
      if (!latest) {
        onTriggerToast('info', 'Website Not Checked', 'No monitoring result was returned.');
        return;
      }

      onTriggerToast(
        latest.status === 'ONLINE' ? 'success' : 'error',
        'Website Checked',
        `${website.name}: ${latest.status}${latest.http_status_code ? ` / HTTP ${latest.http_status_code}` : ''}`
      );
    } catch (err: any) {
      console.error('Website detail check failed:', err);
      onTriggerToast('error', 'Website Check Failed', err?.message || 'Could not check website.');
    } finally {
      setIsChecking(false);
    }
  };

  const copyTrackerValue = async (value: string, label: string) => {
    try {
      await navigator.clipboard.writeText(value);
      onTriggerToast('success', `${label} Copied`);
    } catch (err) {
      console.error('Copy failed:', err);
      onTriggerToast('error', 'Copy Failed', `Could not copy ${label.toLowerCase()}.`);
    }
  };

  const handleGenerateTrackerKey = async () => {
    if (!website) return;

    setIsGeneratingTrackerKey(true);
    try {
      const result = await regenerateWordPressTrackerKey(website.id);
      setGeneratedTrackerKey(result.tracker_key);
      await loadDetail({ background: true });
      onTriggerToast('success', 'Tracker Key Generated', 'Copy this key into the WordPress plugin when it is ready.');
    } catch (err: any) {
      console.error('WordPress tracker key generation failed:', err);
      onTriggerToast('error', 'Tracker Key Not Generated', err?.message || 'Could not generate tracker key.');
    } finally {
      setIsGeneratingTrackerKey(false);
    }
  };

  if (isLoading && !website) {
    return (
      <div className="space-y-6 animate-pulse font-mono">
        <div className="space-y-4">
          <div className="h-4 bg-white/10 rounded w-64" />
          <div className="h-9 bg-white/15 rounded w-80 max-w-full" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-3">
          {[1, 2, 3, 4, 5].map((item) => <AdminSkeletonCard key={item} />)}
        </div>
        <div className="h-80 bg-slate-950/80 border border-white/10 rounded-xl" />
        <AdminSkeletonTable />
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="space-y-6 font-mono">
        <button onClick={onBack} className="text-white/50 hover:text-white inline-flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Websites</span>
        </button>
        <AdminErrorState
          title="Unable to load website monitoring details"
          message={loadError}
          onRetry={() => void loadDetail()}
        />
      </div>
    );
  }

  if (!website) {
    return (
      <div className="space-y-6 font-mono">
        <button onClick={onBack} className="text-white/50 hover:text-white inline-flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Websites</span>
        </button>
        <AdminEmptyState
          title="Website Not Found"
          description="This website record does not exist or is not available to your admin account."
          actionLabel="Back to Websites"
          onAction={onBack}
        />
      </div>
    );
  }

  const stale = isOverdue(website);

  return (
    <div className="space-y-6 animate-in fade-in duration-300 font-mono text-xs">
      <div className="space-y-4 rounded-2xl border border-sky-400/15 bg-slate-950 p-5 sm:p-6 shadow-xl shadow-black/20">
        <button onClick={onBack} className="text-white/50 hover:text-white inline-flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Websites</span>
        </button>

        <div className="flex flex-col xl:flex-row xl:items-start xl:justify-between gap-4 min-w-0">
          <div className="space-y-2 min-w-0">
            <div className="text-[10px] text-white/40 uppercase tracking-wider">
              <button onClick={() => onNavigate?.('clients')} className="hover:text-[#0099FF]">
                {website.client?.business_name || 'Client'}
              </button>
              <span className="px-2">/</span>
              <button onClick={onBack} className="hover:text-[#0099FF]">Websites</button>
              <span className="px-2">/</span>
              <span className="text-white/60">{website.name}</span>
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-2xl md:text-3xl font-display text-white font-semibold tracking-tight">
                {website.name}
              </h1>
              <AdminStatusBadge status={visibleStatus(website)} />
              {stale && (
                <span className="inline-flex items-center gap-1.5 text-[10px] text-amber-300 bg-amber-500/10 border border-amber-500/20 rounded-full px-2 py-1">
                  <AlertTriangle className="w-3 h-3" />
                  Monitoring overdue
                </span>
              )}
            </div>
            <a
              href={website.normalized_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0099FF] hover:text-white inline-flex items-center gap-1.5 max-w-full"
            >
              <span className="truncate">{website.normalized_url}</span>
              <ExternalLink className="w-3.5 h-3.5 shrink-0" />
            </a>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-white/50">
              <span>Platform: <strong className="text-white/80">{website.platform}</strong></span>
              <span>Client: <strong className="text-white/80">{website.client?.business_name || 'Unknown client'}</strong></span>
              <span>Monitoring: <strong className="text-white/80">{website.monitoring_enabled ? 'On' : 'Off'}</strong></span>
              <span>Frequency: <strong className="text-white/80">{formatInterval(website.check_interval_minutes)}</strong></span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleCheckNow}
              disabled={isChecking || !website.monitoring_enabled}
              className="px-3 py-2 bg-[#0099FF]/10 hover:bg-[#0099FF]/20 disabled:opacity-40 disabled:cursor-not-allowed text-[#0099FF] rounded-lg border border-[#0099FF]/20 inline-flex items-center gap-1.5"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isChecking ? 'animate-spin' : ''}`} />
              <span>{isChecking ? 'Checking' : 'Check Now'}</span>
            </button>
            <button
              onClick={() => onEditWebsite(website)}
              className="px-3 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg border border-white/10 inline-flex items-center gap-1.5"
            >
              <Edit className="w-3.5 h-3.5" />
              <span>Edit Website</span>
            </button>
            <a
              href={website.normalized_url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg border border-white/10 inline-flex items-center gap-1.5"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Open Website</span>
            </a>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-3">
        {metricCard('Current Status', visibleStatus(website), stale ? 'Monitoring overdue' : undefined)}
        {metricCard('HTTP Status', displayDash(website.last_http_status_code), 'Last response')}
        {metricCard('Response Time', formatResponseTime(website.last_response_time_ms), 'Latest check')}
        {metricCard('Last Checked', formatRelativeTime(website.last_checked_at), formatExactTimestamp(website.last_checked_at))}
        {metricCard('Interval', `${website.check_interval_minutes} min`, website.monitoring_enabled ? 'Monitoring on' : 'Monitoring off')}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_340px] gap-4">
        <section className="bg-slate-950/80 border border-white/10 rounded-xl p-4 sm:p-5 space-y-4 min-w-0 shadow-lg shadow-black/10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <div className="text-[10px] text-[#0099FF] uppercase font-bold tracking-wider">Response Time</div>
              <h2 className="text-lg text-white font-display font-semibold mt-1">History Trend</h2>
            </div>
            <div className="inline-flex bg-slate-900/80 border border-white/10 rounded-lg p-1 self-start">
              {TIME_RANGE_OPTIONS.map((range) => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`px-3 py-1.5 text-[11px] rounded-md ${
                    timeRange === range ? 'bg-[#0099FF] text-white' : 'text-white/50 hover:text-white'
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>
          <MonitoringChart checks={history} />
        </section>

        <aside className="bg-slate-950/80 border border-white/10 rounded-xl p-4 sm:p-5 space-y-4 shadow-lg shadow-black/10">
          <div>
            <div className="text-[10px] text-[#0099FF] uppercase font-bold tracking-wider">Current Health</div>
            <div className="mt-3 flex items-center justify-between gap-3">
              <AdminStatusBadge status={visibleStatus(website)} />
              {website.current_status === 'ONLINE' ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              ) : (
                <AlertTriangle className="w-5 h-5 text-amber-300" />
              )}
            </div>
          </div>

          <div className="space-y-2 border-t border-white/10 pt-4">
            <div className="flex items-center justify-between gap-3">
              <span className="text-white/40 uppercase">Last checked</span>
              <span className="text-white/80 text-right">{formatExactTimestamp(website.last_checked_at)}</span>
            </div>
            <div className="flex items-center justify-between gap-3">
              <span className="text-white/40 uppercase">HTTP</span>
              <span className="text-white/80">{displayDash(website.last_http_status_code)}</span>
            </div>
            <div className="flex items-center justify-between gap-3">
              <span className="text-white/40 uppercase">Response</span>
              <span className="text-white/80">{formatResponseTime(website.last_response_time_ms)}</span>
            </div>
            <div className="flex items-center justify-between gap-3">
              <span className="text-white/40 uppercase">Monitoring</span>
              <span className="text-white/80">{website.monitoring_enabled ? formatInterval(website.check_interval_minutes) : 'Off'}</span>
            </div>
          </div>

          {(currentError || summary?.last_failure) && (
            <div className="border-t border-white/10 pt-4">
              <div className="text-white/40 uppercase text-[10px]">Latest Error</div>
              <div className="mt-2 text-amber-200/80 leading-relaxed">
                {sanitizeErrorMessage(currentError || summary?.last_failure?.error_message)}
              </div>
            </div>
          )}
        </aside>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-3">
        {metricCard('Checks', summary?.checks ?? 0, rangeLabel(timeRange))}
        {metricCard('Successful', summary?.successful ?? 0, 'ONLINE checks')}
        {metricCard('Failed', summary?.failed ?? 0, 'DOWN or ERROR')}
        {metricCard('Avg Response', formatResponseTime(summary?.average_response_time_ms), 'Recorded responses')}
        {metricCard('Uptime', summary?.uptime_percentage === null ? 'Not enough data' : `${summary?.uptime_percentage ?? 0}%`, 'Check-based')}
      </div>

      <WordPressTrackerPanel
        website={website}
        report={wordpressReport}
        generatedTrackerKey={generatedTrackerKey}
        isGeneratingTrackerKey={isGeneratingTrackerKey}
        onGenerateTrackerKey={handleGenerateTrackerKey}
        onCopy={copyTrackerValue}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <section className="bg-slate-950/80 border border-white/10 rounded-xl p-4 space-y-3 shadow-lg shadow-black/10">
          <div className="flex items-center gap-2 text-white">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <h3 className="font-bold uppercase tracking-wider text-[11px]">Last Successful Check</h3>
          </div>
          <div className="text-white/80">{summary?.last_successful_check ? formatRelativeTime(summary.last_successful_check.checked_at) : 'Not enough data'}</div>
          {summary?.last_successful_check && (
            <div className="text-white/40">{formatExactTimestamp(summary.last_successful_check.checked_at)}</div>
          )}
        </section>

        <section className="bg-slate-950/80 border border-white/10 rounded-xl p-4 space-y-3 shadow-lg shadow-black/10">
          <div className="flex items-center gap-2 text-white">
            <AlertTriangle className="w-4 h-4 text-amber-300" />
            <h3 className="font-bold uppercase tracking-wider text-[11px]">Last Failure</h3>
          </div>
          {summary?.last_failure ? (
            <>
              <div className="text-white/80">{formatExactTimestamp(summary.last_failure.checked_at)}</div>
              <div className="text-amber-200/80">{sanitizeErrorMessage(summary.last_failure.error_message)}</div>
            </>
          ) : (
            <div className="text-white/50">No recent failures</div>
          )}
        </section>
      </div>

      <section className="bg-slate-950/80 border border-white/10 rounded-xl p-4 sm:p-5 space-y-4 min-w-0 shadow-lg shadow-black/10">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
          <div>
            <div className="text-[10px] text-[#0099FF] uppercase font-bold tracking-wider">Monitoring History</div>
            <h2 className="text-lg text-white font-display font-semibold mt-1">Recent Checks</h2>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <label className="sr-only" htmlFor="detail-status-filter">History status</label>
            <select
              id="detail-status-filter"
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value as WebsiteHistoryStatusFilter)}
              className="bg-slate-900/80 border border-white/10 text-white font-mono text-xs rounded-lg p-2 focus:outline-none focus:border-[#0099FF]"
            >
              {STATUS_FILTER_OPTIONS.map((status) => (
                <option key={status} value={status}>
                  {status === 'ALL' ? 'All Statuses' : status}
                </option>
              ))}
            </select>
          </div>
        </div>

        {history.length === 0 ? (
          <AdminEmptyState
            title="No Monitoring Checks Yet"
            description="Run Check Now or wait for automatic monitoring to begin."
            actionLabel={website.monitoring_enabled ? 'Check Now' : undefined}
            onAction={website.monitoring_enabled ? handleCheckNow : undefined}
          />
        ) : (
          <>
            <HistoryRows checks={history} />
            {history.length >= historyLimit && (
              <div className="flex justify-center pt-2">
                <button
                  onClick={() => setHistoryLimit((current) => current + HISTORY_LIMIT)}
                  className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg border border-white/10 inline-flex items-center gap-2"
                >
                  <Activity className="w-3.5 h-3.5 text-[#0099FF]" />
                  <span>Load More</span>
                </button>
              </div>
            )}
          </>
        )}
      </section>

      <section className="bg-slate-950/80 border border-white/10 rounded-xl p-4 sm:p-5 space-y-4 shadow-lg shadow-black/10">
        <div>
          <div className="text-[10px] text-[#0099FF] uppercase font-bold tracking-wider">Website Information</div>
          <h2 className="text-lg text-white font-display font-semibold mt-1">Configuration</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="flex items-center justify-between gap-3 border border-white/10 bg-slate-900/70 p-3 rounded-lg">
            <span className="text-white/40 uppercase">Client</span>
            <button onClick={() => onNavigate?.('clients')} className="text-[#0099FF] hover:text-white text-right truncate">
              {website.client?.business_name || 'Unknown client'}
            </button>
          </div>
          <div className="flex items-center justify-between gap-3 border border-white/10 bg-slate-900/70 p-3 rounded-lg">
            <span className="text-white/40 uppercase">Platform</span>
            <span className="text-white/80 text-right">{website.platform}</span>
          </div>
          <div className="flex items-center justify-between gap-3 border border-white/10 bg-slate-900/70 p-3 rounded-lg">
            <span className="text-white/40 uppercase">URL</span>
            <a href={website.normalized_url} target="_blank" rel="noopener noreferrer" className="text-[#0099FF] hover:text-white text-right truncate">
              {formatUrlHost(website.normalized_url)}
            </a>
          </div>
          <div className="flex items-center justify-between gap-3 border border-white/10 bg-slate-900/70 p-3 rounded-lg">
            <span className="text-white/40 uppercase">Monitoring</span>
            <span className="text-white/80">{website.monitoring_enabled ? 'On' : 'Off'}</span>
          </div>
          <div className="flex items-center justify-between gap-3 border border-white/10 bg-slate-900/70 p-3 rounded-lg">
            <span className="text-white/40 uppercase">Frequency</span>
            <span className="text-white/80">{formatInterval(website.check_interval_minutes)}</span>
          </div>
          <div className="flex items-center justify-between gap-3 border border-white/10 bg-slate-900/70 p-3 rounded-lg">
            <span className="text-white/40 uppercase">Created At</span>
            <span className="text-white/80 text-right">{formatExactTimestamp(website.created_at)}</span>
          </div>
          <div className="flex items-center justify-between gap-3 border border-white/10 bg-slate-900/70 p-3 rounded-lg">
            <span className="text-white/40 uppercase">Hosting</span>
            <span className="text-white/80 text-right">{displayDash(website.hosting_provider)}</span>
          </div>
        </div>
        {website.internal_notes && (
          <div className="border border-white/10 bg-slate-900/70 p-3 rounded-lg">
            <div className="text-white/40 uppercase text-[10px]">Notes</div>
            <p className="mt-2 text-white/70 whitespace-pre-wrap leading-relaxed">{website.internal_notes}</p>
          </div>
        )}
      </section>
    </div>
  );
};
