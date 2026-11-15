import { startWordPress as runCLI } from './environment.mjs';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import assert from 'node:assert/strict';

const plugins = ['elementor', 'woocommerce', 'wp-super-cache', 'wordfence', 'wordpress-seo', 'docket-cache', 'limit-login-attempts-reloaded', 'sqlite-object-cache'];
const out = resolve('../dist/test-results');
await mkdir(out, { recursive: true });
await mkdir('../dist/vendor', { recursive: true });
const archives = {};
for (const slug of plugins) {
  const path = `../dist/vendor/${slug}.zip`;
  try { archives[slug] = await readFile(path); }
  catch {
    const response = await fetch(`https://downloads.wordpress.org/plugin/${slug}.latest-stable.zip`, { signal: AbortSignal.timeout(120000) });
    assert.ok(response.ok, `${slug}: download HTTP ${response.status}`);
    archives[slug] = Buffer.from(await response.arrayBuffer());
    await writeFile(path, archives[slug]);
  }
  console.log(`Downloaded official ${slug} (${archives[slug].length} bytes)`);
}
const cli = await runCLI({
  command: 'server', php: '8.3', wp: 'latest', workers: 2, port: 9499,
  mount: [{ hostPath: resolve('../magniar-wordpress-tracker'), vfsPath: '/wordpress/wp-content/plugins/magniar-wordpress-tracker' }],
  blueprint: { constants: { WP_DEBUG: true, WP_DEBUG_DISPLAY: false, WP_DEBUG_LOG: true, DISABLE_WP_CRON: true, FS_METHOD: 'direct' }, steps: [
    { step: 'activatePlugin', pluginPath: 'magniar-wordpress-tracker/magniar-wordpress-tracker.php' },
  ] },
});
const results = [];
const run = async (code) => (await cli.playground.run({ code: `<?php require '/wordpress/wp-load.php'; require_once ABSPATH.'wp-admin/includes/admin.php'; ${code}` })).text;
try {
  const paths = {};
  for (const slug of plugins) {
    await cli.playground.writeFile(`/tmp/${slug}.zip`, archives[slug]);
    paths[slug] = await run(`require_once ABSPATH.'wp-admin/includes/class-wp-upgrader.php'; $u=new Plugin_Upgrader(new Automatic_Upgrader_Skin()); $r=$u->install('/tmp/${slug}.zip'); if(is_wp_error($r)) { echo 'ERROR:'.$r->get_error_message(); } else { echo $u->plugin_info(); }`);
    assert.ok(paths[slug] && !paths[slug].includes('ERROR:'), paths[slug]);
  }
  const selected = process.env.MAGNIAR_COMPAT_TARGETS?.split(',');
  const matrix = selected ? selected.map(slug => [slug]) : [[], ['wp-super-cache'], ['elementor'], ['woocommerce'], ['elementor', 'woocommerce'], ['wordfence'], ['wordpress-seo'], ['docket-cache'], ['limit-login-attempts-reloaded'], ['sqlite-object-cache']];
  for (const slugs of matrix) {
    const name = slugs.join(' + ') || 'Clean WordPress';
    try {
      const activation = await run(`wp_set_current_user(1); deactivate_plugins(json_decode('${JSON.stringify(Object.values(paths))}', true), true); $errors=[]; foreach(json_decode('${JSON.stringify(slugs.map(slug => paths[slug]))}', true) as $p) { $r=activate_plugin($p); if(is_wp_error($r)) $errors[]=$r->get_error_message(); } echo json_encode($errors);`);
      assert.deepEqual(JSON.parse(activation), []);
      const diagnostics = JSON.parse(await run(`$start=microtime(true); $d=(new Magniar\\WordPressTracker\\Diagnostics())->collect('11111111-1111-4111-8111-111111111111'); $versions=[]; foreach(get_plugins() as $path=>$p) { if(is_plugin_active($path)) $versions[$path]=$p['Version']; } echo json_encode(['report'=>$d,'active'=>$versions,'seconds'=>round(microtime(true)-$start,3),'peak_memory_mb'=>round(memory_get_peak_usage(true)/1048576,1),'external_object_cache'=>wp_using_ext_object_cache(),'extensions'=>get_loaded_extensions()]);`));
      assert.ok(diagnostics.report.plugin_count >= slugs.length + 1);
      const response = await fetch(cli.serverUrl, { signal: AbortSignal.timeout(60000) });
      const html = await response.text();
      assert.equal(response.status, 200);
      assert.ok(!html.includes('There has been a critical error'));
      assert.ok(!/href=["'][^"']*magniar-wordpress-tracker/.test(html));
      results.push({ name, passed: true, ...diagnostics });
      console.log(`PASS: ${name}`);
    } catch (error) {
      const detail = { name, passed: false, error: error.message.slice(0, 1200) };
      if (await cli.playground.fileExists('/wordpress/wp-content/debug.log')) detail.debug = (await cli.playground.readFileAsText('/wordpress/wp-content/debug.log')).slice(-5000);
      if (slugs.includes('wordfence')) {
        try {
          await run(`deactivate_plugins('magniar-wordpress-tracker/magniar-wordpress-tracker.php',true); activate_plugin('${paths.wordfence}');`);
          detail.failsWithoutTracker = false;
        } catch { detail.failsWithoutTracker = true; }
        await run(`activate_plugin('magniar-wordpress-tracker/magniar-wordpress-tracker.php');`);
      }
      results.push(detail);
      console.error(`FAIL: ${name}: ${error.message.slice(0, 500)}`);
    }
  }
  await run(`deactivate_plugins(json_decode('${JSON.stringify(Object.values(paths))}',true),true);`);
  for (let i = 0; i < 120; i++) {
    await cli.playground.writeFile(`/wordpress/wp-content/plugins/magniar-test-${i}.php`, `<?php\n/**\n * Plugin Name: Compatibility Fixture ${i}\n * Version: 1.0\n */\n`);
  }
  const stress = JSON.parse(await run(`ini_set('memory_limit','64M'); wp_cache_delete('plugins','plugins'); $start=microtime(true); $d=(new Magniar\\WordPressTracker\\Diagnostics())->collect('11111111-1111-4111-8111-111111111111'); echo json_encode(['plugins'=>$d['plugin_count'],'seconds'=>round(microtime(true)-$start,3),'peak_memory_mb'=>round(memory_get_peak_usage(true)/1048576,1),'memory_limit'=>ini_get('memory_limit')]);`));
  assert.ok(stress.plugins >= 120 && stress.peak_memory_mb < 64);
  results.push({ name: '120 additional plugin headers under 64 MiB', passed: true, ...stress });
  await writeFile(resolve(out, selected ? 'compatibility-targeted.json' : 'compatibility.json'), JSON.stringify(results, null, 2));
  console.log(JSON.stringify(results.map(({name,passed,error,active,external_object_cache,peak_memory_mb}) => ({name,passed,error,active,external_object_cache,peak_memory_mb})), null, 2));
  if (results.some(r => !r.passed)) process.exitCode = 1;
} catch (error) {
  console.error(error.message.slice(0, 2000));
  process.exitCode = 1;
} finally {
  await writeFile(resolve(out, process.env.MAGNIAR_COMPAT_TARGETS ? 'compatibility-targeted.json' : 'compatibility.json'), JSON.stringify(results, null, 2));
  await cli[Symbol.asyncDispose]();
}
