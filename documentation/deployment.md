# Portfolio Deployment Guide

## Overview
This document outlines the deployment process for the Solo Developing portfolio website.

## Build Process
The portfolio uses Vite for building and bundling:

```bash
npm run build
```

This creates an optimized production build in the `dist/` directory.

## Deployment Configuration
The site uses a standard SPA (Single Page Application) configuration with proper routing support.

### .htaccess Configuration
For Apache servers, the `.htaccess` file ensures proper routing:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  
  # Handle SPA routing - redirect all non-file requests to index.html
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule ^ index.html [QSA,L]
</IfModule>
```

### Netlify Configuration
For Netlify deployment, use `_redirects` file:

```
/*    /index.html   200
```

## Environment Variables
Set up the following environment variables for production:

```bash
VITE_CONTACT_FORM_ENDPOINT=https://your-api-domain.com/contact
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

## Deployment Steps

### Manual Deployment
1. Build the project:
   ```bash
   npm run build
   ```

2. Upload the `dist/` folder contents to your web server

### Automated Deployment
The project includes deployment scripts for common platforms:

```bash
npm run deploy
```

## Verification
After deployment, verify the following:
- `https://solodeveloping.com/` - Main portfolio page loads
- `https://solodeveloping.com/projects` - Portfolio section works
- `https://solodeveloping.com/articles` - Blog section accessible
- Contact form functionality
- All project links and demos work correctly

## Performance Optimization
The build process includes:
- JavaScript and CSS minification
- Image optimization
- Code splitting for better loading
- Gzip compression support

## SEO Considerations
Ensure the following are properly configured:
- Meta tags for all pages
- Sitemap.xml accessibility
- Robots.txt configuration
- Open Graph tags for social sharing

## Monitoring
After deployment, monitor:
- Page load speeds
- Contact form submissions
- Error rates
- User engagement metrics
