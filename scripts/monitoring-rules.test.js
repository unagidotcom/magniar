import assert from 'node:assert/strict';

const isDueForMonitoring = (website, now) => {
  if (!website.monitoring_enabled) return false;
  if (!website.last_checked_at) return true;

  const intervalMinutes = website.check_interval_minutes || 10;
  const lastChecked = new Date(website.last_checked_at);
  if (Number.isNaN(lastChecked.getTime())) return true;

  return lastChecked.getTime() + intervalMinutes * 60_000 <= now.getTime();
};

const isWebsiteStale = (website, now) => {
  if (!website.monitoring_enabled || !website.last_checked_at) return false;

  const lastChecked = new Date(website.last_checked_at);
  if (Number.isNaN(lastChecked.getTime())) return true;

  return lastChecked.getTime() + website.check_interval_minutes * 60_000 < now.getTime();
};

const clientNameForWebsite = (website, clients) =>
  website.client?.business_name ||
  clients.find((client) => client.id === website.client_id)?.business_name ||
  'Unknown client';

const summarizeWebsites = (websites) => ({
  total: websites.length,
  online: websites.filter((website) => website.current_status === 'ONLINE').length,
  down: websites.filter((website) => website.current_status === 'DOWN').length,
  error: websites.filter((website) => website.current_status === 'ERROR').length,
  disabled: websites.filter((website) => !website.monitoring_enabled).length,
});

const filterWebsites = (websites, clients, options) => {
  const query = options.searchTerm.trim().toLowerCase();

  return websites.filter((website) => {
    const clientName = clientNameForWebsite(website, clients);

    if (options.clientFilter !== 'ALL' && website.client_id !== options.clientFilter) return false;
    if (options.statusFilter !== 'ALL' && website.current_status !== options.statusFilter) return false;
    if (options.monitoringFilter === 'ENABLED' && !website.monitoring_enabled) return false;
    if (options.monitoringFilter === 'DISABLED' && website.monitoring_enabled) return false;

    if (!query) return true;

    return (
      website.name.toLowerCase().includes(query) ||
      website.url.toLowerCase().includes(query) ||
      website.normalized_url.toLowerCase().includes(query) ||
      clientName.toLowerCase().includes(query)
    );
  });
};

const summarizeChecks = (checks) => {
  const successful = checks.filter((check) => check.status === 'ONLINE').length;
  const failed = checks.filter((check) => check.status === 'DOWN' || check.status === 'ERROR').length;
  const responseTimes = checks
    .map((check) => check.response_time_ms)
    .filter((value) => typeof value === 'number' && Number.isFinite(value));

  return {
    checks: checks.length,
    successful,
    failed,
    average_response_time_ms: responseTimes.length
      ? Math.round(responseTimes.reduce((total, value) => total + value, 0) / responseTimes.length)
      : null,
    uptime_percentage: checks.length ? Number(((successful / checks.length) * 100).toFixed(1)) : null,
  };
};

const filterChecks = (checks, options, nowDate) => {
  const cutoff = new Date(nowDate);
  if (options.timeRange === '7D') cutoff.setDate(cutoff.getDate() - 7);
  else if (options.timeRange === '30D') cutoff.setDate(cutoff.getDate() - 30);
  else cutoff.setHours(cutoff.getHours() - 24);

  return checks.filter((check) => {
    if (new Date(check.checked_at).getTime() < cutoff.getTime()) return false;
    if (options.status !== 'ALL' && check.status !== options.status) return false;
    return true;
  });
};

const chartPoints = (checks) =>
  checks.filter((check) => typeof check.response_time_ms === 'number').map((check) => check.response_time_ms);

const now = new Date('2026-08-28T12:00:00.000Z');

assert.equal(
  isDueForMonitoring({
    monitoring_enabled: true,
    check_interval_minutes: 5,
    last_checked_at: '2026-08-28T11:52:00.000Z',
  }, now),
  true,
  '5-minute website checked 8 minutes ago should be due'
);

assert.equal(
  isDueForMonitoring({
    monitoring_enabled: true,
    check_interval_minutes: 30,
    last_checked_at: '2026-08-28T11:55:00.000Z',
  }, now),
  false,
  '30-minute website checked 5 minutes ago should be skipped'
);

assert.equal(
  isDueForMonitoring({
    monitoring_enabled: false,
    check_interval_minutes: 5,
    last_checked_at: '2026-08-28T11:00:00.000Z',
  }, now),
  false,
  'disabled website should be skipped'
);

assert.equal(
  isDueForMonitoring({
    monitoring_enabled: true,
    check_interval_minutes: 15,
    last_checked_at: null,
  }, now),
  true,
  'never checked website should be due'
);

const clients = [
  { id: 'client-a', business_name: 'Kozzah' },
  { id: 'client-b', business_name: 'Sundazed' },
];

const websites = [
  {
    id: 'site-a',
    client_id: 'client-a',
    client: clients[0],
    name: 'Main Store',
    url: 'https://kozzah.com',
    normalized_url: 'https://kozzah.com',
    monitoring_enabled: true,
    check_interval_minutes: 5,
    current_status: 'ONLINE',
    last_checked_at: '2026-08-28T11:52:00.000Z',
  },
  {
    id: 'site-b',
    client_id: 'client-b',
    client: clients[1],
    name: 'Campaign Landing',
    url: 'https://sundazed.example',
    normalized_url: 'https://sundazed.example',
    monitoring_enabled: true,
    check_interval_minutes: 15,
    current_status: 'DOWN',
    last_checked_at: '2026-08-28T11:59:00.000Z',
  },
  {
    id: 'site-c',
    client_id: 'client-b',
    client: clients[1],
    name: 'Archived Site',
    url: 'https://archive.example',
    normalized_url: 'https://archive.example',
    monitoring_enabled: false,
    check_interval_minutes: 60,
    current_status: 'UNKNOWN',
    last_checked_at: null,
  },
];

assert.deepEqual(
  summarizeWebsites(websites),
  {
    total: 3,
    online: 1,
    down: 1,
    error: 0,
    disabled: 1,
  },
  'summary counts should represent live website states'
);

assert.equal(
  filterWebsites(websites, clients, {
    searchTerm: 'kozzah',
    clientFilter: 'ALL',
    statusFilter: 'ALL',
    monitoringFilter: 'ALL',
  }).length,
  1,
  'search should match client names'
);

assert.deepEqual(
  filterWebsites(websites, clients, {
    searchTerm: '',
    clientFilter: 'ALL',
    statusFilter: 'DOWN',
    monitoringFilter: 'ALL',
  }).map((website) => website.id),
  ['site-b'],
  'status filter should only show matching status rows'
);

assert.deepEqual(
  filterWebsites(websites, clients, {
    searchTerm: '',
    clientFilter: 'ALL',
    statusFilter: 'ALL',
    monitoringFilter: 'DISABLED',
  }).map((website) => website.id),
  ['site-c'],
  'monitoring filter should show disabled rows'
);

assert.equal(
  isWebsiteStale(websites[0], now),
  true,
  'overdue monitored websites should be marked stale without changing status'
);

const historyChecks = [
  {
    id: 'check-1',
    checked_at: '2026-08-28T11:50:00.000Z',
    status: 'ONLINE',
    http_status_code: 200,
    response_time_ms: 200,
  },
  {
    id: 'check-2',
    checked_at: '2026-08-28T11:40:00.000Z',
    status: 'DOWN',
    http_status_code: null,
    response_time_ms: null,
  },
  {
    id: 'check-3',
    checked_at: '2026-08-27T10:00:00.000Z',
    status: 'ERROR',
    http_status_code: 503,
    response_time_ms: 600,
  },
];

assert.deepEqual(
  summarizeChecks(historyChecks),
  {
    checks: 3,
    successful: 1,
    failed: 2,
    average_response_time_ms: 400,
    uptime_percentage: 33.3,
  },
  'detail statistics should use real history rows'
);

assert.deepEqual(
  chartPoints(historyChecks),
  [200, 600],
  'failed checks without response time should not become fake zero chart points'
);

assert.deepEqual(
  filterChecks(historyChecks, { timeRange: '24H', status: 'ALL' }, now).map((check) => check.id),
  ['check-1', 'check-2'],
  '24-hour history filter should exclude older checks'
);

assert.deepEqual(
  filterChecks(historyChecks, { timeRange: '30D', status: 'ERROR' }, now).map((check) => check.id),
  ['check-3'],
  'history status filter should isolate matching check statuses'
);

console.log('Monitoring dashboard rules passed.');
