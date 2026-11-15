import { startWordPress as runCLI } from './environment.mjs';
import { chromium } from '@playwright/test';
import assert from 'node:assert/strict';
import { readFile, mkdir, writeFile } from 'node:fs/promises';

const cli = await runCLI({
  command: 'server', php: '8.3', wp: 'latest', port: 9498, workers: 2,
  blueprint: { constants: { WP_DEBUG: true, WP_DEBUG_LOG: true, WP_DEBUG_DISPLAY: false, DISABLE_WP_CRON: true, FS_METHOD: 'direct' } },
});
let browser;
const checks = [];
const php = async (code) => {
  const result = await cli.playground.run({ code: `<?php require '/wordpress/wp-load.php'; require_once ABSPATH.'wp-admin/includes/admin.php'; ${code}` });
  if (result.errors) throw new Error(result.errors);
  return result.text;
};
try {
  const zip = await readFile('../dist/magniar-wordpress-tracker-1.0.0.zip');
  await cli.playground.writeFile('/tmp/magniar-tracker.zip', zip);
  const installed = await php(`
    require_once ABSPATH . 'wp-admin/includes/class-wp-upgrader.php';
    require_once ABSPATH . 'wp-admin/includes/plugin.php';
    $skin = new Automatic_Upgrader_Skin();
    $upgrader = new Plugin_Upgrader($skin);
    $result = $upgrader->install('/tmp/magniar-tracker.zip');
    if (is_wp_error($result)) { echo $result->get_error_message(); }
    elseif ($result) { $active = activate_plugin('magniar-wordpress-tracker/magniar-wordpress-tracker.php'); echo is_wp_error($active) ? $active->get_error_message() : 'installed'; }
  `);
  assert.ok(installed.includes('installed'), installed);
  checks.push('Release ZIP installed and activated by the WordPress upgrader');

  // This isolated test transport never leaves the local WordPress environment.
  await cli.playground.mkdirTree('/wordpress/wp-content/mu-plugins');
  await cli.playground.writeFile('/wordpress/wp-content/mu-plugins/magniar-test-transport.php', `<?php
    add_filter('pre_http_request', function($pre, $args, $url) {
      if (strpos($url, '/functions/v1/receive-wordpress-report') === false) return $pre;
      $mode = get_option('magniar_test_response', 'success');
      $status = $mode === 'forbidden' ? 403 : 200;
      $body = $mode === 'invalid' ? '<html>not a report</html>' : json_encode(['success' => true, 'report' => ['id' => '11111111-1111-4111-8111-111111111111', 'reported_at' => gmdate('Y-m-d\\TH:i:s\\Z'), 'health_status' => 'GOOD']]);
      return ['headers' => [], 'body' => $body, 'response' => ['code' => $status, 'message' => 'Local test'], 'cookies' => []];
    }, 10, 3);
  `);
  browser = await chromium.launch({ headless: true, ...(process.env.MAGNIAR_CHROMIUM_PATH ? { executablePath: process.env.MAGNIAR_CHROMIUM_PATH } : {}) });
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
  const page = await context.newPage();
  const settingsUrl = `${cli.serverUrl}/wp-admin/options-general.php?page=magniar-wordpress-tracker`;
  const login = await php(`wp_set_current_user(1); $token=WP_Session_Tokens::get_instance(1)->create(time()+3600); echo json_encode([['name' => AUTH_COOKIE, 'value' => wp_generate_auth_cookie(1, time()+3600, 'auth', $token)], ['name' => LOGGED_IN_COOKIE, 'value' => wp_generate_auth_cookie(1, time()+3600, 'logged_in', $token)]]);`);
  await context.addCookies(JSON.parse(login).map(cookie => ({ ...cookie, url: cli.serverUrl })));
  await page.goto(settingsUrl);
  await page.getByRole('heading', { name: 'Magniar Tracker', exact: true }).waitFor();
  const key = 'mgwp_' + 'T'.repeat(43);
  await page.getByLabel('Website ID', { exact: true }).fill('11111111-1111-4111-8111-111111111111');
  await page.getByLabel('Tracker key', { exact: true }).fill(key);
  await page.getByLabel('Allow daily health reports to Magniar').check();
  await Promise.all([page.waitForURL(/settings-updated=true/), page.getByRole('button', { name: 'Save settings', exact: true }).click()]);
  assert.equal(await page.getByLabel('Tracker key', { exact: true }).inputValue(), '');
  assert.ok(!(await page.content()).includes(key));
  checks.push('Actual settings form saves connection and hides the stored key');

  await Promise.all([page.waitForNavigation(), page.getByRole('button', { name: 'Send test report', exact: true }).click()]);
  await page.getByText('Report accepted by Magniar.', { exact: true }).first().waitFor();
  checks.push('Manual report button shows confirmed success');
  await page.reload();
  assert.ok(await page.getByText('Connected', { exact: true }).isVisible());
  assert.equal(await page.getByLabel('Website ID', { exact: true }).inputValue(), '11111111-1111-4111-8111-111111111111');
  checks.push('Connection and report state persist on reload');

  const before = JSON.parse(await php(`echo json_encode(get_option('magniar_wp_tracker_settings'));`));
  for (const action of ['test_report', 'clear_logs', 'disconnect']) {
    const denied = await context.request.post(`${cli.serverUrl}/wp-admin/admin-post.php`, { form: { action: `magniar_wp_tracker_${action}`, _wpnonce: 'invalid' } });
    assert.equal(denied.status(), 403);
  }
  assert.deepEqual(JSON.parse(await php(`echo json_encode(get_option('magniar_wp_tracker_settings'));`)), before);
  checks.push('Invalid nonces deny all three admin actions without changing settings');

  for (const mode of ['forbidden', 'invalid']) {
    await php(`update_option('magniar_test_response', '${mode}'); $s=get_option('magniar_wp_tracker_state'); $s['last_attempt']=time()-61; update_option('magniar_wp_tracker_state', $s, false);`);
    await Promise.all([page.waitForNavigation(), page.getByRole('button', { name: 'Send test report', exact: true }).click()]);
    assert.ok(await page.getByText('Needs attention', { exact: true }).isVisible());
    assert.equal(await page.locator('.notice-success').filter({ hasText: 'Report accepted' }).count(), 0);
  }
  checks.push('Rejected keys and invalid acknowledgements show failures, never success');

  await mkdir('../dist/test-results', { recursive: true });
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.screenshot({ path: `../dist/test-results/settings-${width}.png`, fullPage: true });
    assert.ok(await page.locator('.magniar-wp-tracker-admin').evaluate(el => el.getBoundingClientRect().right <= window.innerWidth + 1));
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1));
  }
  checks.push('Settings screen fits desktop and mobile widths');

  await page.goto(cli.serverUrl);
  assert.equal(await page.locator('link[href*="magniar-wordpress-tracker"], script[src*="magniar-wordpress-tracker"]').count(), 0);
  assert.ok(!(await page.content()).includes(key));
  checks.push('Public frontend has no tracker assets or credentials');
  const rest = await context.request.get(`${cli.serverUrl}/?rest_route=/`);
  assert.equal(rest.status(), 200);
  assert.ok(!(await rest.text()).includes(key));
  checks.push('WordPress REST remains available without exposing the key');
  await page.goto(`${cli.serverUrl}/wp-admin/index.php`);
  assert.equal(await page.locator('link[href*="magniar-wordpress-tracker"]').count(), 0);
  checks.push('Unrelated admin screen has no tracker stylesheet');

  const sub = JSON.parse(await php(`$id=wp_create_user('browser-subscriber', wp_generate_password(32)); $token=WP_Session_Tokens::get_instance($id)->create(time()+3600); wp_set_current_user($id); $_COOKIE[LOGGED_IN_COOKIE]=wp_generate_auth_cookie($id, time()+3600, 'logged_in', $token); $nonces=[]; foreach(['test_report','clear_logs','disconnect'] as $action) { $nonces[$action]=wp_create_nonce('magniar_wp_tracker_'.$action); } echo json_encode(['id'=>$id, 'cookies'=>[['name'=>AUTH_COOKIE,'value'=>wp_generate_auth_cookie($id,time()+3600,'auth',$token)],['name'=>LOGGED_IN_COOKIE,'value'=>$_COOKIE[LOGGED_IN_COOKIE]]], 'nonces'=>$nonces]);`));
  const subContext = await browser.newContext();
  await subContext.addCookies(sub.cookies.map(cookie => ({ ...cookie, url: cli.serverUrl })));
  for (const action of ['test_report', 'clear_logs', 'disconnect']) {
    const nonce = sub.nonces[action];
    const denied = await subContext.request.post(`${cli.serverUrl}/wp-admin/admin-post.php`, { form: { action: `magniar_wp_tracker_${action}`, _wpnonce: nonce } });
    assert.equal(denied.status(), 403);
  }
  const subSettings = await subContext.request.get(settingsUrl);
  assert.equal(subSettings.status(), 403);
  checks.push('Subscriber with valid nonces cannot read settings or execute admin actions');
  await subContext.close();

  await page.goto(settingsUrl);
  await page.getByLabel('Allow daily health reports to Magniar').uncheck();
  await Promise.all([page.waitForURL(/settings-updated=true/), page.getByRole('button', { name: 'Save settings', exact: true }).click()]);
  assert.equal(await php(`echo wp_next_scheduled('magniar_wp_tracker_daily_report') ? 'scheduled' : 'paused';`), 'paused');
  checks.push('Pause removes the daily job');
  await page.getByText('Disconnect this website', { exact: true }).click();
  await Promise.all([page.waitForNavigation(), page.getByRole('button', { name: 'Disconnect and remove key', exact: true }).click()]);
  assert.equal(await php(`$s=get_option('magniar_wp_tracker_settings'); echo $s['tracker_key'];`), '');
  assert.equal(await page.getByLabel('Website ID', { exact: true }).inputValue(), '');
  checks.push('Disconnect removes credential and website association');
  await writeFile('../dist/test-results/browser.json', JSON.stringify({ checks, passed: checks.length }, null, 2));
  console.log(JSON.stringify({ checks, passed: checks.length }, null, 2));
} catch (error) {
  console.error(error.message.slice(0, 4000));
  if (await cli.playground.fileExists('/wordpress/wp-content/debug.log')) console.error((await cli.playground.readFileAsText('/wordpress/wp-content/debug.log')).slice(-4000));
  process.exitCode = 1;
} finally {
  await browser?.close();
  await cli[Symbol.asyncDispose]();
}
