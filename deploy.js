import FtpDeploy from 'ftp-deploy';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Load production environment variables
dotenv.config({ path: '.env.production', override: true });

// Get directory name in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create FTP deployment instance
const ftpDeploy = new FtpDeploy();

// Configuration for FTP deployment
const config = {
  user: process.env.FTP_USER,
  password: process.env.FTP_PASSWORD,
  host: process.env.FTP_HOST,
  port: 21,
  localRoot: path.join(__dirname, 'dist'),
  remoteRoot: process.env.FTP_REMOTE_ROOT || '/',
  include: ['*', '**/*', '.*', '**/.*'],  // Include all files, directories, and hidden files (like .htaccess)
  exclude: ['.git', '.git/**', 'node_modules', 'node_modules/**'],
  deleteRemote: false,      // Don't delete existing files on the server
  forcePasv: true           // Use passive mode
};

// Start deployment
console.log('🚀 Starting deployment to Hostinger...');
console.log('📍 Host:', config.host);
console.log('👤 User:', config.user);
console.log('📁 Remote path:', config.remoteRoot);

ftpDeploy
  .deploy(config)
  .then(res => {
    console.log('✅ Deployment completed successfully!');
    console.log(`📦 ${res.length} files transferred`);
  })
  .catch(err => {
    console.error('❌ Deployment failed:');
    console.error(err);
    process.exit(1);
  });