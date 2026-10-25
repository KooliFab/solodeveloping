#!/usr/bin/env node
// Fails when a build output contains something that looks like a secret.
// Every VITE_* variable is inlined into the public bundle, so a webhook URL
// or an API key set there ships to every visitor. Run before each deploy:
//
//   node scripts/check-dist-secrets.mjs [distDir]
//
// Matches are reported by file and pattern name only, never by value.
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

export const SECRET_PATTERNS = [
  { name: 'Slack webhook URL', pattern: /hooks\.slack\.com\/services\/[A-Za-z0-9_/-]+/ },
  { name: 'Discord webhook URL', pattern: /discord(?:app)?\.com\/api\/webhooks\/\d+\/[A-Za-z0-9_-]+/ },
  { name: 'Stripe live secret key', pattern: /\b[sr]k_live_[A-Za-z0-9]{10,}/ },
  { name: 'GitHub token', pattern: /\b(?:ghp|gho|ghs|ghu|github_pat)_[A-Za-z0-9_]{20,}/ },
  { name: 'Google API key', pattern: /\bAIza[0-9A-Za-z_-]{35}\b/ },
  { name: 'OpenAI or Anthropic API key', pattern: /\bsk-(?:ant-|proj-)?[A-Za-z0-9_-]{32,}/ },
  { name: 'Private key', pattern: /-----BEGIN [A-Z ]*PRIVATE KEY-----/ },
];

// Text files only: images, fonts and videos cannot hold an inlined variable.
const TEXT_EXTENSIONS = new Set(['.html', '.js', '.mjs', '.css', '.json', '.md', '.txt', '.xml', '.map', '.webmanifest', '.svg']);

const listFiles = async (dir) => {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const nested = await Promise.all(entries.map((entry) => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? listFiles(full) : [full];
  }));
  return nested.flat();
};

export const findSecrets = async (distDir) => {
  const findings = [];
  for (const file of await listFiles(distDir)) {
    if (!TEXT_EXTENSIONS.has(path.extname(file).toLowerCase())) continue;
    const content = await fs.readFile(file, 'utf8');
    for (const { name, pattern } of SECRET_PATTERNS) {
      if (pattern.test(content)) findings.push({ file: path.relative(distDir, file), name });
    }
  }
  return findings;
};

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const distDir = path.resolve(process.argv[2] || path.join(rootDir, 'dist'));
  const findings = await findSecrets(distDir);
  if (findings.length > 0) {
    console.error('❌ Possible secrets found in the build output:');
    findings.forEach(({ file, name }) => console.error(`   ${file}: ${name}`));
    console.error('   Remove them from VITE_* variables and the source, then rotate them.');
    process.exit(1);
  }
  console.log(`✅ No secret pattern found in ${path.relative(rootDir, distDir) || distDir}`);
}
