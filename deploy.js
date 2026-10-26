import FtpDeploy from 'ftp-deploy';
import PromiseFtp from 'promise-ftp';
import dotenv from 'dotenv';
import path from 'path';
import tls from 'tls';
import { fileURLToPath } from 'url';
import { pruneRemoteAssets } from './scripts/prune-remote-assets.mjs';

// Load production environment variables
dotenv.config({ path: '.env.production', override: true });

// Get directory name in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const missing = ['FTP_HOST', 'FTP_USER', 'FTP_PASSWORD'].filter((name) => !process.env[name]);
if (missing.length > 0) {
  console.error(`❌ Missing deployment variables in .env.production: ${missing.join(', ')}`);
  process.exit(1);
}

// Create FTP deployment instance
const ftpDeploy = new FtpDeploy();

// Configuration for FTP deployment
const config = {
  user: process.env.FTP_USER,
  password: process.env.FTP_PASSWORD,
  host: process.env.FTP_HOST,
  port: 21,
  // Explicit FTPS: credentials and files never travel in clear text.
  secure: true,
  secureOptions: {
    rejectUnauthorized: true,
    // Hostinger serves its shared *.hstgr.io certificate on ftp.<domain>, so
    // the certificate is checked against FTP_TLS_CERT_HOST instead of FTP_HOST.
    checkServerIdentity: (host, cert) =>
      tls.checkServerIdentity(process.env.FTP_TLS_CERT_HOST || host, cert),
  },
  localRoot: path.join(__dirname, 'dist'),
  remoteRoot: process.env.FTP_REMOTE_ROOT || '/',
  include: ['*', '**/*', '.*', '**/.*'],  // Include all files, directories, and hidden files (like .htaccess)
  exclude: ['.git', '.git/**', 'node_modules', 'node_modules/**'],
  deleteRemote: false,      // Never wipe the remote root; stale assets are pruned after the upload
  forcePasv: true           // Use passive mode
};

// `--prune-only` skips the upload; `--dry-run` lists stale assets without deleting them.
const args = new Set(process.argv.slice(2));
const pruneOnly = args.has('--prune-only');
const dryRun = args.has('--dry-run');

const reportFailure = (label, err) => {
  console.error(`❌ ${label}:`);
  console.error(err);
  if (String(err?.message).includes('altnames')) {
    console.error('   The FTP certificate does not match FTP_TLS_CERT_HOST (ftp.hstgr.io on Hostinger).');
  }
  process.exit(1);
};

// Old hashed bundles stay on the server otherwise, and can still be fetched.
const pruneStaleAssets = async () => {
  const ftp = new PromiseFtp();
  await ftp.connect(config);
  try {
    console.log(dryRun ? '🧹 Stale assets (dry run, nothing deleted):' : '🧹 Removing stale assets...');
    const stale = await pruneRemoteAssets({
      ftp,
      remoteDir: path.posix.join(config.remoteRoot, 'assets'),
      localDir: path.join(config.localRoot, 'assets'),
      dryRun,
    });
    console.log(`✅ ${stale.length} stale asset(s) ${dryRun ? 'found' : 'removed'}`);
  } finally {
    await ftp.end();
  }
};

console.log('📍 Host:', config.host);
console.log('📁 Remote path:', config.remoteRoot);

if (pruneOnly) {
  await pruneStaleAssets().catch((err) => reportFailure('Asset cleanup failed', err));
} else {
  console.log('🚀 Starting deployment to Hostinger over FTPS...');
  const res = await ftpDeploy.deploy(config).catch((err) => reportFailure('Deployment failed', err));
  console.log('✅ Deployment completed successfully!');
  // ftp-deploy resolves one array of upload results per directory
  console.log(`📦 ${res.flat().length} files transferred in ${res.length} directories`);
  await pruneStaleAssets().catch((err) =>
    reportFailure('The site is deployed, but the asset cleanup failed (retry with `npm run deploy:prune`)', err),
  );
}
