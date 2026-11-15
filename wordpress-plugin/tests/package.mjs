import { readFile, writeFile, mkdir, lstat } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { resolve } from 'node:path';
import { zipSync, unzipSync } from 'fflate';
import assert from 'node:assert/strict';

const root = resolve(import.meta.dirname, '../magniar-wordpress-tracker');
const output = resolve(import.meta.dirname, '../dist');
const files = [
  'magniar-wordpress-tracker.php', 'uninstall.php', 'README.md', 'readme.txt',
  'includes/class-plugin.php', 'includes/class-reporter.php',
  'includes/class-report-lock.php', 'includes/class-diagnostics.php',
  'includes/class-logger.php', 'includes/class-settings-page.php',
  'includes/admin-view.php', 'assets/admin/settings.css',
];
const entries = {};
for (const file of files) {
  const path = resolve(root, file);
  assert.ok((await lstat(path)).isFile(), `Not a regular file: ${file}`);
  const data = await readFile(path);
  assert.doesNotMatch(data.toString(), /eyJ[A-Za-z0-9_-]{15,}\.[A-Za-z0-9_-]+\.|sb_secret_|-----BEGIN .*PRIVATE KEY-----|mgwp_[A-Za-z0-9_-]{43}/, `Credential-like content in ${file}`);
  entries[`magniar-wordpress-tracker/${file}`] = [data, { mtime: new Date('2026-09-13T00:00:00Z') }];
}
const main = await readFile(resolve(root, 'magniar-wordpress-tracker.php'), 'utf8');
const version = main.match(/\* Version: (\d+\.\d+\.\d+)/)?.[1];
assert.ok(version, 'Plugin version is required');
const zip = zipSync(entries, { level: 9 });
assert.deepEqual(Object.keys(unzipSync(zip)).sort(), Object.keys(entries).sort());
await mkdir(output, { recursive: true });
const filename = `magniar-wordpress-tracker-${version}.zip`;
const sha = createHash('sha256').update(zip).digest('hex');
await writeFile(resolve(output, filename), zip);
await writeFile(resolve(output, `${filename}.sha256`), `${sha}  ${filename}\n`);
console.log(`${resolve(output, filename)} (${zip.length} bytes, ${files.length} files)`);
console.log(`SHA-256: ${sha}`);
