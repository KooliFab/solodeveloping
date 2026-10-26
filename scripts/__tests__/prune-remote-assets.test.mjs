// @vitest-environment node
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { findStaleAssets, pruneRemoteAssets } from '../prune-remote-assets.mjs';

const file = (name) => ({ type: '-', name });

// In-memory stand-in for a connected promise-ftp client.
const fakeFtp = (entries) => {
  const deleted = [];
  return {
    deleted,
    list: async () => entries,
    delete: async (remotePath) => {
      deleted.push(remotePath);
    },
  };
};

describe('findStaleAssets', () => {
  it('keeps the files of the current build', () => {
    expect(findStaleAssets([file('app-new.js'), file('app-old.js')], ['app-new.js'])).toEqual(['app-old.js']);
  });

  it('never selects a directory or a link', () => {
    const entries = [{ type: 'd', name: 'fonts' }, { type: 'l', name: 'latest.js' }, file('app-old.js')];

    expect(findStaleAssets(entries, ['app-new.js'])).toEqual(['app-old.js']);
  });
});

describe('pruneRemoteAssets', () => {
  let localDir;

  beforeEach(async () => {
    localDir = await fs.mkdtemp(path.join(os.tmpdir(), 'prune-assets-'));
    await fs.writeFile(path.join(localDir, 'app-new.js'), '');
  });

  afterEach(async () => {
    await fs.rm(localDir, { recursive: true, force: true });
  });

  it('deletes the remote files the build no longer contains', async () => {
    const ftp = fakeFtp([file('app-new.js'), file('ContactSection-old.js')]);

    const stale = await pruneRemoteAssets({ ftp, remoteDir: '/assets', localDir, log: () => {} });

    expect(stale).toEqual(['ContactSection-old.js']);
    expect(ftp.deleted).toEqual(['/assets/ContactSection-old.js']);
  });

  it('only lists stale files in a dry run', async () => {
    const ftp = fakeFtp([file('app-new.js'), file('app-old.js')]);

    const stale = await pruneRemoteAssets({ ftp, remoteDir: '/assets', localDir, dryRun: true, log: () => {} });

    expect(stale).toEqual(['app-old.js']);
    expect(ftp.deleted).toEqual([]);
  });

  it('refuses to prune when the local folder has no files', async () => {
    const ftp = fakeFtp([file('app-old.js')]);
    const missingDir = path.join(localDir, 'missing');

    await expect(pruneRemoteAssets({ ftp, remoteDir: '/assets', localDir: missingDir })).rejects.toThrow(/refusing/);
    expect(ftp.deleted).toEqual([]);
  });

  it('refuses to prune when the local build is not the deployed one', async () => {
    const ftp = fakeFtp([file('app-live.js'), file('app-old.js')]);

    await expect(pruneRemoteAssets({ ftp, remoteDir: '/assets', localDir })).rejects.toThrow(/not the deployed one/);
    expect(ftp.deleted).toEqual([]);
  });
});
