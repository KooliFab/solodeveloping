# Solo Developing Portfolio

A modern, responsive portfolio website showcasing full-stack development skills and projects. Built with React, featuring smooth animations, multilingual support, and a terminal-inspired design.

## Features

- **Multilingual Support** - English and French with automatic language detection
- **Smooth Animations** - Powered by Framer Motion and GSAP with scroll-triggered effects
- **Responsive Design** - Mobile-first approach with adaptive layouts
- **Dark Theme** - Electric green accent on dark background
- **Project Showcase** - Filterable portfolio with category tags
- **Contact Form** - Integrated with backend endpoint for lead notifications
- **Blog Ready** - MDX support for technical articles
- **SEO Optimized** - React Helmet for meta management

## Tech Stack

| Category | Technologies |
|----------|-------------|
| **Framework** | React 18, Vite |
| **Styling** | Tailwind CSS, PostCSS |
| **Animation** | Framer Motion, GSAP, Lenis |
| **i18n** | i18next, react-i18next |
| **UI Components** | Radix UI, Lucide Icons |
| **Backend** | Optional serverless endpoint for contact form |
| **Code Highlighting** | Shiki, react-syntax-highlighter |
| **Deployment** | FTP to Hostinger |

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/portfolio.git
   cd portfolio
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
   # Required for contact form
   VITE_CONTACT_FORM_ENDPOINT=https://your-api-domain.com/contact

   # Optional analytics
   VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

## Deployment

This project includes an automated FTP deployment system to deploy to Hostinger.

### Setup

Configure your FTP credentials in `.env.production`:
```
FTP_USER=your_hostinger_ftp_username
FTP_PASSWORD=your_hostinger_ftp_password
FTP_HOST=your_hostinger_ftp_host.hostinger.com
FTP_REMOTE_ROOT=/public_html
```

### Deploy

```bash
npm run deploy
```

This will build the project and deploy the `dist` folder via FTP.

## Security Notes

- The `.env` files containing credentials are excluded from Git via `.gitignore`
- Never commit `.env` files to version control
- Use `.env.example` as a template for team environments

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
