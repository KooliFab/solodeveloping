// Removes the hashed bundles a previous deploy left in the server's assets
// folder. deploy.js runs it after a successful upload, so the new index.html
// already points at the new bundles when the old ones disappear.
//
// Only plain files directly in the folder are considered; a subdirectory or a
// link is never touched. Nothing is deleted when the local folder is empty or
// missing (an empty build must not wipe the live site), or when one of its
// files is absent from the server: the local build is then not the one being
// served, and its list of files says nothing about what the site still uses.
import fs from 'node:fs/promises';
import path from 'node:path';

// Names of the remote files that the current build no longer contains.
export const findStaleAssets = (remoteEntries, localNames) => {
  const keep = new Set(localNames);
  return remoteEntries
    .filter((entry) => entry.type === '-' && !keep.has(entry.name))
    .map((entry) => entry.name);
};

const listLocalFiles = async (localDir) => {
  try {
    const entries = await fs.readdir(localDir, { withFileTypes: true });
    return entries.filter((entry) => entry.isFile()).map((entry) => entry.name);
  } catch (error) {
    if (error.code === 'ENOENT') return [];
    throw error;
  }
};

// `ftp` is a connected promise-ftp client (list, delete). Returns the
// deleted names, or the names that would be deleted when `dryRun` is set.
export const pruneRemoteAssets = async ({ ftp, remoteDir, localDir, dryRun = false, log = console.log }) => {
  const localNames = await listLocalFiles(localDir);
  if (localNames.length === 0) {
    throw new Error(`${localDir} has no files: refusing to prune ${remoteDir}`);
  }

  const remoteEntries = await ftp.list(remoteDir);
  const remoteFiles = new Set(remoteEntries.filter((entry) => entry.type === '-').map((entry) => entry.name));
  const notUploaded = localNames.filter((name) => !remoteFiles.has(name));
  if (notUploaded.length > 0) {
    throw new Error(
      `${notUploaded.length} file(s) of ${localDir} are not on the server (${notUploaded[0]}...): ` +
        'this build is not the deployed one, nothing was deleted',
    );
  }

  const stale = findStaleAssets(remoteEntries, localNames);
  for (const name of stale) {
    const remotePath = path.posix.join(remoteDir, name);
    if (dryRun) {
      log(`   would delete ${remotePath}`);
      continue;
    }
    await ftp.delete(remotePath);
    log(`   deleted ${remotePath}`);
  }
  return stale;
};
