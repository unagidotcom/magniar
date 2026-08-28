import assert from 'node:assert/strict';

const isDueForMonitoring = (website, now) => {
  if (!website.monitoring_enabled) return false;
  if (!website.last_checked_at) return true;

  const intervalMinutes = website.check_interval_minutes || 10;
  const lastChecked = new Date(website.last_checked_at);
  if (Number.isNaN(lastChecked.getTime())) return true;

  return lastChecked.getTime() + intervalMinutes * 60_000 <= now.getTime();
};

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

console.log('Monitoring interval rules passed.');
