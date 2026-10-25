# Solo Developing Portfolio

A modern, responsive portfolio website showcasing full-stack development skills and projects. Built with React, featuring smooth animations, multilingual support, and a terminal-inspired design.

## Features

- **Multilingual Support** - English and French with automatic language detection
- **Smooth Animations** - Powered by Framer Motion and GSAP with scroll-triggered effects
- **Responsive Design** - Mobile-first approach with adaptive layouts
- **Dark Theme** - Electric green accent on dark background
- **Project Showcase** - Filterable portfolio with category tags
- **Contact** - Direct mailto call to action (no data is sent from the browser)
- **Blog** - Full MDX blog with bilingual articles, reading progress, TOC, and share buttons
- **SEO Optimized** - React Helmet for meta management

## Tech Stack

| Category | Technologies |
|----------|-------------|
| **Framework** | React 19, Vite |
| **Styling** | Tailwind CSS, PostCSS |
| **Animation** | Framer Motion, GSAP, Lenis |
| **i18n** | i18next, react-i18next |
| **UI Components** | Radix UI, Lucide Icons |
| **Code Highlighting** | Shiki, react-syntax-highlighter |
| **Deployment** | FTPS to Hostinger |

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/KooliFab/solodeveloping.git
   cd solodeveloping
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file from the example:
   ```bash
   cp .env.example .env
   ```

4. Configure your environment variables in `.env`
   ```bash
   # Optional analytics
   VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
   ```

   Every `VITE_*` variable is inlined into the JavaScript bundle and is public.
   Never put a secret, token or webhook URL in one.

5. Start the development server:
   ```bash
   npm run dev
   ```

## Deployment

This project includes an automated FTPS deployment system to deploy to Hostinger.

### Setup

Fill in `.env.production` (git-ignored, never committed):
```
FTP_HOST=ftp.solodeveloping.com
FTP_USER=your_hostinger_ftp_username
FTP_PASSWORD=your_hostinger_ftp_password
FTP_REMOTE_ROOT=/
FTP_TLS_CERT_HOST=ftp.hstgr.io
```

The upload uses explicit FTPS (TLS on port 21) with certificate verification.
Hostinger serves its shared `*.hstgr.io` certificate on `ftp.<domain>`, so
`FTP_TLS_CERT_HOST` names the identity the certificate is checked against.
`FTP_REMOTE_ROOT` is `/` when the FTP account's directory is already
`public_html` (hPanel > Files > FTP Accounts), otherwise `/public_html`.

After a deploy, purge the Hostinger CDN cache in hPanel. `deleteRemote` is
off, so files removed from `dist/` (old hashed bundles) stay on the server
until you delete them from `public_html/assets`.

### Deploy

```bash
npm run deploy
```

This builds the project, fails if `scripts/check-dist-secrets.mjs` finds a secret in `dist/`, then uploads `dist/` over FTPS.

## AI Agent Access

After react-snap, `scripts/agent/build-agent-files.mjs` writes the machine-readable side of the site into `dist/`:

- **Markdown mirrors** of every page (`/about.md`, `/index.html.md`, …), also served on the page URL itself to clients sending `Accept: text/markdown` (with `Vary: Accept`; see `public/.htaccess`)
- **Real 404s**: there is no SPA fallback. Unknown URLs return 404 with the prerendered not-found page, or `404.md` for Markdown clients. Every route must therefore be prerendered (`reactSnap.include`) or redirected in `.htaccess`; `scripts/agent/__tests__/routing.test.mjs` enforces this. Hostinger runs LiteSpeed, which does not set `REDIRECT_STATUS`: the rules never use it, and the error documents (`/404.html`, `/404.md`, `/200.html`, `/api/errors/*.json`) stay reachable directly with `X-Robots-Tag: noindex`.
- **Read-only JSON API** under `/api/` (profile, projects, articles), described by `/openapi.json`, with RFC 9457 `application/problem+json` errors and an RFC 9727 catalog at `/.well-known/api-catalog`

To check the server behavior before deploying (macOS Apache; Apache can't read `~/Desktop`, so serve a copy):

```bash
cp -R dist /tmp/solodev-dist
job_id="$(portly temp 'node scripts/agent/apache-preview.mjs 8088 /tmp/solodev-dist' --path . --timeout 30m)"
npm run verify:agent -- http://127.0.0.1:8088
portly stop "$job_id"
```

After deploying, run `npm run verify:agent` (defaults to https://solodeveloping.com).

## Security Notes

- The `.env` files containing credentials are excluded from Git via `.gitignore`
- Never commit `.env` files to version control
- Use `.env.example` as a template for team environments

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
