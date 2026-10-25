#!/usr/bin/env node
// Serves the built site with Apache httpd and the project's .htaccess files,
// the closest local stand-in for the Hostinger (LiteSpeed) production server.
// Use it to run verify-agent-ready.mjs before deploying:
//
//   node scripts/agent/apache-preview.mjs [port] [distDir]
//   node scripts/agent/verify-agent-ready.mjs http://127.0.0.1:8088
//
// Defaults target macOS's bundled Apache; set HTTPD_BIN, HTTPD_MODULES and
// HTTPD_MIME_TYPES for other installs.
import { spawn } from 'node:child_process';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const port = Number(process.argv[2] || 8088);
const distDir = path.resolve(process.argv[3] || path.join(rootDir, 'dist'));
const httpd = process.env.HTTPD_BIN || '/usr/sbin/httpd';
const modules = process.env.HTTPD_MODULES || '/usr/libexec/apache2';
const mimeTypes = process.env.HTTPD_MIME_TYPES || '/private/etc/apache2/mime.types';

const MODULES = ['mpm_prefork', 'unixd', 'authz_core', 'log_config', 'mime', 'dir', 'rewrite', 'headers', 'expires', 'filter', 'deflate'];

const runDir = await fs.mkdtemp(path.join(os.tmpdir(), 'solodev-apache-'));
const config = `
ServerRoot "${runDir}"
Listen 127.0.0.1:${port}
ServerName localhost
# -X serves one connection at a time; idle keep-alive connections would stall the rest
KeepAlive Off
${MODULES.map((name) => `LoadModule ${name}_module "${modules}/mod_${name}.so"`).join('\n')}
PidFile "${runDir}/httpd.pid"
ErrorLog /dev/stderr
LogFormat "%>s %m %U [%{Accept}i] -> %f" short
CustomLog /dev/stdout short
TypesConfig "${mimeTypes}"
DocumentRoot "${distDir}"
DirectoryIndex index.html
<Directory "${distDir}">
  Options FollowSymLinks
  AllowOverride All
  Require all granted
</Directory>
`;
await fs.writeFile(path.join(runDir, 'httpd.conf'), config);

console.log(`Serving ${distDir} with Apache on http://127.0.0.1:${port}`);
const server = spawn(httpd, ['-X', '-f', path.join(runDir, 'httpd.conf')], { stdio: 'inherit' });

const stop = () => server.kill('SIGTERM');
process.on('SIGINT', stop);
process.on('SIGTERM', stop);
server.on('exit', async (code) => {
  await fs.rm(runDir, { recursive: true, force: true });
  process.exit(code ?? 0);
});
