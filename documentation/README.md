# Cogni's Adventures Website

## Deployment

This project includes an automated FTP deployment system to easily deploy the website to Hostinger.

### Setup

1. Configure your FTP credentials in the `.env` file:
   ```
   FTP_USER=your_hostinger_ftp_username
   FTP_PASSWORD=your_hostinger_ftp_password
   FTP_HOST=your_hostinger_ftp_host.hostinger.com
   FTP_REMOTE_ROOT=/public_html
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Deployment Commands

To build and deploy the website to Hostinger:

```bash
npm run deploy
```

This command will:
1. Build the project using Vite
2. Deploy the contents of the `dist` folder to your Hostinger hosting account via FTP

### Security Notes

- The `.env` file containing your FTP credentials is excluded from Git via `.gitignore`
- Never commit your `.env` file to version control
- For team environments, share the `.env.example` file as a template