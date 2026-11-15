import { bootWordPressAndRequestHandler, resolveWordPressRelease } from '@wp-playground/wordpress';
import { loadNodeRuntime } from '@php-wasm/node';
import { createServer } from 'node:http';
import { readFile, writeFile, mkdir, readdir } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { homedir } from 'node:os';

// Use Playground's in-memory filesystem to avoid Windows native file-lock stalls.
// This adapter is test-only and is never included in the plugin ZIP.
async function cachedDownload(name, url) {
  const path = resolve(import.meta.dirname, '../dist/vendor', name);
  try { return await readFile(path); } catch {}
  const response = await fetch(url, { signal: AbortSignal.timeout(120000) });
  if (!response.ok) throw new Error(`Download failed: ${response.status} ${name}`);
  const bytes = Buffer.from(await response.arrayBuffer());
  await mkdir(dirname(path), { recursive: true });
  await writeFile(path, bytes);
  return bytes;
}

export async function startWordPress(args) {
  const version = await resolveWordPressRelease(args.wp || 'latest');
  let wordpress;
  try { wordpress = await readFile(resolve(homedir(), '.wordpress-playground', `${version.version}.zip`)); }
  catch { wordpress = await cachedDownload(`wordpress-${version.version}.zip`, version.releaseUrl); }
  const sqlite = await cachedDownload('sqlite-integration.zip', 'https://downloads.wordpress.org/plugin/sqlite-database-integration.latest-stable.zip');
  const serverUrl = `http://127.0.0.1:${args.port}`;
  const handler = await bootWordPressAndRequestHandler({
    createPhpRuntime: () => loadNodeRuntime(args.php || '8.3', { extensions: [], emscriptenOptions: { processId: 1 } }),
    phpVersion: args.php || '8.3', maxPhpInstances: 1, cookieStore: false,
    siteUrl: serverUrl, documentRoot: '/wordpress',
    wordPressZip: new File([wordpress], 'wordpress.zip'),
    sqliteIntegrationPluginZip: new File([sqlite], 'sqlite.zip'),
    constants: { ...(args.blueprint?.constants || {}), DISABLE_WP_CRON: true },
    onProgress: caption => console.log(caption),
  });
  const playground = await handler.getPrimaryPhp();
  async function copyDirectory(from, to) {
    playground.mkdirTree(to);
    for (const entry of await readdir(from, { withFileTypes: true })) {
      if (entry.isDirectory()) await copyDirectory(resolve(from, entry.name), `${to}/${entry.name}`);
      else if (entry.isFile()) playground.writeFile(`${to}/${entry.name}`, await readFile(resolve(from, entry.name)));
    }
  }
  for (const mount of args.mount || []) await copyDirectory(mount.hostPath, mount.vfsPath);
  for (const step of args.blueprint?.steps || []) {
    if (step.step !== 'activatePlugin') throw new Error(`Unsupported test setup step: ${step.step}`);
    const result = await playground.run({ code: `<?php require '/wordpress/wp-load.php'; require_once ABSPATH.'wp-admin/includes/admin.php'; $r=activate_plugin('${step.pluginPath}'); if(is_wp_error($r)) throw new Exception($r->get_error_message());` });
    if (result.errors) throw new Error(result.errors);
  }
  let pending = Promise.resolve();
  const server = createServer((request, response) => {
    // Serialize PHP requests because all state is intentionally held in one interpreter.
    pending = pending.then(async () => {
      try {
        const chunks = [];
        for await (const chunk of request) chunks.push(chunk);
        const result = await handler.request({ url: `${serverUrl}${request.url}`, method: request.method, headers: request.headers, body: Buffer.concat(chunks) });
        response.writeHead(result.httpStatusCode, result.headers);
        response.end(result.bytes);
      } catch (error) {
        response.writeHead(500);
        response.end('Isolated test request failed');
        console.error(error.message.slice(0, 1500));
      }
    });
  });
  await new Promise((done, reject) => { server.once('error', reject); server.listen(args.port, '127.0.0.1', done); });
  console.log(`WordPress ${version.version}, PHP ${args.php}: ${serverUrl}`);
  return {
    playground, serverUrl, server,
    async [Symbol.asyncDispose]() {
      server.closeAllConnections();
      await new Promise(done => server.close(done));
      await handler[Symbol.asyncDispose]();
    },
  };
}
