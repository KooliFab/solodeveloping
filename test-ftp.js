import FtpDeploy from 'ftp-deploy';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const ftpDeploy = new FtpDeploy();

const config = {
  user: process.env.FTP_USER,
  password: process.env.FTP_PASSWORD,
  host: process.env.FTP_HOST,
  port: 21,
  localRoot: './dist',
  remoteRoot: '/',
  include: ['index.html'], // Just test with one file
  exclude: [],
  deleteRemote: false,
  forcePasv: true
};

console.log('Testing FTP connection...');
console.log('Host:', config.host);
console.log('User:', config.user);
console.log('Password length:', config.password ? config.password.length : 0);
console.log('Password starts with:', config.password ? config.password.substring(0, 3) + '...' : 'undefined');

ftpDeploy
  .deploy(config)
  .then(res => {
    console.log('✅ Connection successful!');
    console.log('Files would be transferred:', res.length);
  })
  .catch(err => {
    console.error('❌ Connection failed:');
    console.error('Error code:', err.code);
    console.error('Error message:', err.message);
  });
