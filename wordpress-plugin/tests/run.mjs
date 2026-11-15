import { startWordPress as runCLI } from './environment.mjs';
import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const php = process.env.MAGNIAR_TEST_PHP || '8.3';
const wp = process.env.MAGNIAR_TEST_WP || 'latest';
const cli = await runCLI({
  command: 'server', php, wp, port: Number(process.env.MAGNIAR_TEST_PORT || 9497), workers: 1,
  mount: [{ hostPath: resolve('../magniar-wordpress-tracker'), vfsPath: '/wordpress/wp-content/plugins/magniar-wordpress-tracker' }],
  blueprint: { constants: { WP_DEBUG: true, WP_DEBUG_DISPLAY: false, WP_DEBUG_LOG: true, DISABLE_WP_CRON: true }, steps: [
    { step: 'activatePlugin', pluginPath: 'magniar-wordpress-tracker/magniar-wordpress-tracker.php' },
  ] },
});
try {
  const syntax = await cli.playground.run({ code: "<?php $root='/wordpress/wp-content/plugins/magniar-wordpress-tracker'; $count=0; foreach(new RecursiveIteratorIterator(new RecursiveDirectoryIterator($root, FilesystemIterator::SKIP_DOTS)) as $file) { if($file->getExtension()==='php') { token_get_all(file_get_contents($file->getPathname()), TOKEN_PARSE); $count++; } } echo $count;" });
  if (syntax.errors || syntax.exitCode !== 0) throw new Error(syntax.errors || syntax.text);
  const result = await cli.playground.run({ code: await readFile(new URL('./integration.php', import.meta.url), 'utf8') });
  if (result.errors || result.exitCode !== 0) throw new Error(result.errors || result.text);
  const report = JSON.parse(result.text);
  report.php_files_syntax_checked = Number(syntax.text);
  if (report.failed) throw new Error(JSON.stringify(report));
  await mkdir('../dist/test-results', { recursive: true });
  await writeFile(`../dist/test-results/integration-php-${php}-wp-${wp}.json`, JSON.stringify(report, null, 2));
  console.log(JSON.stringify(report, null, 2));
} catch (error) {
  console.error(error.message.slice(0, 4000));
  if (await cli.playground.fileExists('/wordpress/wp-content/debug.log')) {
    console.error((await cli.playground.readFileAsText('/wordpress/wp-content/debug.log')).slice(-6000));
  }
  process.exitCode = 1;
} finally {
  await cli[Symbol.asyncDispose]();
}
