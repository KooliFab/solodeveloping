// @vitest-environment node
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { findSecrets } from '../check-dist-secrets.mjs';

describe('findSecrets', () => {
  let distDir;

  beforeEach(async () => {
    distDir = await fs.mkdtemp(path.join(os.tmpdir(), 'secrets-dist-'));
    await fs.mkdir(path.join(distDir, 'assets'));
    await fs.writeFile(path.join(distDir, 'index.html'), '<html><body>hello@solodeveloping.com</body></html>');
  });

  afterEach(async () => {
    await fs.rm(distDir, { recursive: true, force: true });
  });

  it('passes a clean build', async () => {
    await fs.writeFile(path.join(distDir, 'assets', 'app.js'), 'const url = "https://slack.com/";');

    expect(await findSecrets(distDir)).toEqual([]);
  });

  it('reports an inlined Slack webhook by file and pattern name', async () => {
    await fs.writeFile(
      path.join(distDir, 'assets', 'Contact.js'),
      'fetch("https://hooks.slack.com/services/TEST/TEST/TEST")',
    );

    expect(await findSecrets(distDir)).toEqual([
      { file: path.join('assets', 'Contact.js'), name: 'Slack webhook URL' },
    ]);
  });

  it('reports a private key', async () => {
    await fs.writeFile(path.join(distDir, 'key.txt'), '-----BEGIN RSA PRIVATE KEY-----');

    expect(await findSecrets(distDir)).toEqual([{ file: 'key.txt', name: 'Private key' }]);
  });

  it('skips binary assets', async () => {
    await fs.writeFile(path.join(distDir, 'image.png'), 'hooks.slack.com/services/TEST/TEST/TEST');

    expect(await findSecrets(distDir)).toEqual([]);
  });
});
