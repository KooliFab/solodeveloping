# Cogni's Adventures - Complete Project Documentation

## Project Overview

**Cogni's Adventures** is a modern React-based web application for promoting an interactive children's book and companion mobile app. The project features a multilingual landing page with educational content, email subscription functionality, and automated deployment to Hostinger hosting.

### Key Features
- 🌍 **Multilingual Support**: English, Spanish, and French
- 📱 **Responsive Design**: Mobile-first approach with Tailwind CSS
- 🎨 **Modern UI**: Radix UI components with custom styling
- 🔥 **Firebase Integration**: Email subscription management
- 📧 **Email Collection**: Newsletter subscription with validation
- 🚀 **Automated Deployment**: FTP deployment to Hostinger
- ♿ **Accessibility**: ARIA labels, semantic HTML, keyboard navigation
- 🎭 **Animations**: Framer Motion for smooth interactions
- 📊 **SEO Optimized**: Meta tags, structured data, sitemaps

## Technology Stack

### Core Technologies
- **React 18.2.0**: Modern functional components with hooks
- **Vite 4.4.5**: Fast build tool and dev server
- **Tailwind CSS 3.3.3**: Utility-first CSS framework
- **i18next**: Internationalization framework
- **Firebase 11.6.1**: Backend services for email collection
- **Framer Motion 10.16.4**: Animation library

### UI Components & Libraries
- **Radix UI**: Accessible component primitives
- **Lucide React**: Icon library
- **React Helmet Async**: Dynamic meta tag management
- **Class Variance Authority**: Component variant management
- **React Minimal Pie Chart**: Data visualization

### Development Tools
- **ESLint**: Code linting
- **PostCSS**: CSS processing
- **Autoprefixer**: CSS vendor prefixes
- **FTP Deploy**: Automated deployment
- **Terser**: JavaScript minification

## Project Structure

```
cogni-adventures/
├── public/                          # Static assets
│   ├── images/app/en/              # App screenshots by language
│   ├── locales/                    # Translation files
│   │   ├── en/translation.json     # English translations
│   │   ├── es/translation.json     # Spanish translations
│   │   └── fr/translation.json     # French translations
│   ├── robots.txt                  # SEO robots file
│   └── sitemap.xml                 # SEO sitemap
├── src/
│   ├── components/
│   │   ├── layout/                 # Layout components
│   │   │   ├── Header.jsx          # Navigation header
│   │   │   ├── Footer.jsx          # Site footer
│   │   │   ├── MainContent.jsx     # Main content wrapper
│   │   │   └── LanguageSwitcher.jsx # Language selection
│   │   ├── sections/               # Page sections
│   │   │   ├── Hero.jsx            # Hero/banner section
│   │   │   ├── BookSection.jsx     # Book promotion
│   │   │   ├── AppSection.jsx      # App promotion
│   │   │   ├── BenefitsSection.jsx # Educational benefits
│   │   │   ├── AboutUsSection.jsx  # About the team
│   │   │   └── CtaSection.jsx      # Call-to-action
│   │   └── ui/                     # Reusable UI components
│   │       ├── button.jsx          # Button component
│   │       ├── input.jsx           # Input component
│   │       ├── toast.jsx           # Toast notifications
│   │       ├── EmailSubscription.jsx # Email form
│   │       └── [other-ui-components]
│   ├── lib/                        # Utilities and services
│   │   ├── firebase.js             # Firebase configuration
│   │   ├── emailService.js         # Email subscription logic
│   │   ├── utils.js                # General utilities
│   │   ├── benefit-utils.js        # Benefit chart calculations
│   │   └── utils/                  # Utility modules
│   │       ├── animationUtils.js   # Animation helpers
│   │       ├── metaUtils.js        # SEO meta utilities
│   │       └── schemaUtils.js      # Structured data
│   ├── App.jsx                     # Main application component
│   ├── main.jsx                    # Application entry point
│   ├── i18n.js                     # Internationalization config
│   └── index.css                   # Global styles
├── deploy.js                       # FTP deployment script
├── package.json                    # Dependencies and scripts
├── vite.config.js                  # Vite configuration
├── tailwind.config.js              # Tailwind CSS config
└── PROJECT_RULES.md                # Development guidelines
```

## Core Components Architecture

### Application Entry Point (`App.jsx`)
- **Purpose**: Main application wrapper with global state and routing logic
- **Key Features**:
  - Language detection and management
  - Toast notification handlers
  - SEO meta tag management with react-helmet-async
  - Structured data for search engines
  - Global event handlers (buy, download, scroll)

### Layout Components

#### Header (`src/components/layout/Header.jsx`)
- Navigation with smooth scrolling to sections
- Language switcher integration
- Responsive mobile menu
- Buy Now button with toast feedback

#### MainContent (`src/components/layout/MainContent.jsx`)
- Orchestrates all page sections
- Passes event handlers to child components
- Lazy-loaded for performance optimization

#### Footer (`src/components/layout/Footer.jsx`)
- Company information and links
- Social media integration
- Copyright with dynamic year
- Contact information

### Section Components

#### Hero (`src/components/sections/Hero.jsx`)
- **Purpose**: Main landing section with call-to-action
- **Features**:
  - Animated entrance with Framer Motion
  - Primary and secondary action buttons
  - Responsive image with optimized loading
  - Scroll-to-explore functionality

#### BookSection (`src/components/sections/BookSection.jsx`)
- **Purpose**: Promotes the physical book
- **Features**:
  - Feature highlights with icons
  - Image carousel for book previews
  - Amazon purchase integration (placeholder)

#### AppSection (`src/components/sections/AppSection.jsx`)
- **Purpose**: Showcases the companion mobile app
- **Features**:
  - App feature demonstrations
  - Screenshot galleries
  - Download button with coming-soon toast

#### BenefitsSection (`src/components/sections/BenefitsSection.jsx`)
- **Purpose**: Educational benefits visualization
- **Features**:
  - Interactive pie chart with benefit categories
  - Animated benefit cards
  - Icon positioning calculations

#### AboutUsSection (`src/components/sections/AboutUsSection.jsx`)
- **Purpose**: Team and mission information
- **Features**:
  - Team introduction
  - Mission statement
  - Company values

#### CtaSection (`src/components/sections/CtaSection.jsx`)
- **Purpose**: Email subscription and free content offer
- **Features**:
  - Email validation and submission
  - Firebase integration for data storage
  - Success/error feedback via toasts

## Internationalization (i18n)

### Configuration (`src/i18n.js`)
- **Supported Languages**: English (en), Spanish (es), French (fr)
- **Detection Order**: URL path → query string → cookie → localStorage → browser
- **Fallback**: English (en)
- **Loading**: HTTP backend from `/public/locales/`

### Translation Structure
Each language file contains:
- `header`: Navigation elements
- `hero`: Main banner content
- `bookSection`: Book promotion content
- `appSection`: App promotion content
- `benefitsSection`: Educational benefits
- `aboutUsSection`: Team information
- `ctaSection`: Call-to-action content
- `footer`: Footer content
- `toastMessages`: User feedback messages
- `faq`: Frequently asked questions
- `meta`: SEO metadata and structured data

### Language Path Detection (`src/components/LanguagePathDetector.jsx`)
- Automatically detects language from URL path
- Updates i18next language setting
- Handles language switching without page reload

## Firebase Integration

### Configuration (`src/lib/firebase.js`)
- Environment-based configuration
- Firestore database initialization
- Secure API key management

### Email Service (`src/lib/emailService.js`)
- **Collection**: `newsletter_subscribers`
- **Data Stored**:
  - Email address
  - Creation timestamp
  - Source hostname
- **Features**:
  - Duplicate email handling (commented out)
  - Error handling with user feedback
  - Success confirmation

### Email Subscription Component (`src/components/ui/EmailSubscription.jsx`)
- Email validation with regex
- Loading states during submission
- Toast notifications for feedback
- Form reset on successful submission

## Styling System

### Tailwind CSS Configuration (`tailwind.config.js`)
- **Design System**: HSL color variables
- **Components**: Radix UI integration
- **Animations**: Custom keyframes and transitions
- **Responsive**: Mobile-first breakpoints
- **Dark Mode**: Class-based dark mode support

### CSS Variables (`src/index.css`)
- **Color Palette**: Primary, secondary, accent colors
- **Component Styles**: Custom animations and effects
- **Utility Classes**: Floating animations, shadows, patterns

### Component Styling Patterns
- **Utility-First**: Tailwind classes for rapid development
- **Component Variants**: Class Variance Authority for consistent variants
- **Responsive Design**: Mobile-first with progressive enhancement
- **Accessibility**: Focus states, color contrast, ARIA support

## SEO and Performance

### Meta Tag Management (`src/lib/utils/metaUtils.js`)
- Dynamic meta tags with react-helmet-async
- Language-specific meta content
- Open Graph and Twitter Card support
- Canonical URL management

### Structured Data (`src/lib/utils/schemaUtils.js`)
- JSON-LD structured data for search engines
- Product schema for the book
- Organization schema for the company
- FAQ schema for common questions

### Performance Optimizations
- **Lazy Loading**: MainContent component lazy-loaded
- **Image Optimization**: WebP format, proper sizing
- **Code Splitting**: Dynamic imports for large components
- **Preloading**: Critical resources preloaded in HTML
- **Font Optimization**: Display swap for web fonts

## Deployment

### FTP Deployment (`deploy.js`)
- **Target**: Hostinger shared hosting
- **Process**: Build → FTP upload
- **Configuration**: Environment variables for credentials
- **Features**:
  - Passive FTP mode
  - File inclusion/exclusion patterns
  - Error handling and logging

### Environment Variables (`.env.example`)
```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

# FTP Deployment (for deploy.js)
FTP_USER=your_hostinger_username
FTP_PASSWORD=your_hostinger_password
FTP_HOST=your_hostinger_host.com
FTP_REMOTE_ROOT=/public_html
```

### Build Process
1. **Development**: `npm run dev` - Vite dev server
2. **Build**: `npm run build` - Production build
3. **Preview**: `npm run preview` - Preview production build
4. **Deploy**: `npm run deploy` - Build and FTP upload

## Development Guidelines

### Code Style (from `PROJECT_RULES.md`)
- **Components**: Functional components with hooks
- **Naming**: PascalCase for components, camelCase for functions
- **Imports**: Use `@/` alias for project imports
- **State**: Local state with useState, global state via context
- **Props**: Destructured props with default values

### Component Structure Pattern
```jsx
import statements

const ComponentName = ({ props }) => {
  // State hooks
  // Effect hooks
  // Handler functions
  
  return (
    // JSX with proper accessibility
  );
};

export default ComponentName;
```

### Accessibility Requirements
- Semantic HTML elements
- ARIA labels and roles
- Keyboard navigation support
- Color contrast compliance
- Screen reader compatibility

### Animation Guidelines
- Framer Motion for complex animations
- CSS transitions for simple effects
- Respect user motion preferences
- Performance-conscious animations

## API Integration Points

### Current Integrations
- **Firebase Firestore**: Email subscription storage
- **i18next HTTP Backend**: Translation file loading

### Future Integration Opportunities
- **Payment Processing**: Stripe/PayPal for book purchases
- **App Store APIs**: Deep linking to mobile apps
- **Analytics**: Google Analytics, Mixpanel
- **Email Marketing**: Mailchimp, ConvertKit integration
- **CMS**: Headless CMS for content management

## Testing Strategy

### Recommended Testing Approach
- **Unit Tests**: Component rendering and logic
- **Integration Tests**: User interactions and flows
- **E2E Tests**: Complete user journeys
- **Accessibility Tests**: Screen reader and keyboard navigation
- **Performance Tests**: Core Web Vitals monitoring

### Key Testing Areas
- Email subscription flow
- Language switching functionality
- Responsive design across devices
- Form validation and error handling
- Toast notification system

## Monitoring and Analytics

### Performance Monitoring
- Core Web Vitals tracking
- Bundle size monitoring
- Loading time optimization
- Error boundary implementation

### User Analytics
- Page view tracking
- Email subscription conversion
- Language preference analysis
- User journey mapping

## Security Considerations

### Current Security Measures
- Environment variable protection
- Firebase security rules
- Input validation and sanitization
- HTTPS enforcement

### Security Best Practices
- Regular dependency updates
- Content Security Policy headers
- XSS protection
- CSRF protection for forms

## Maintenance and Updates

### Regular Maintenance Tasks
- Dependency updates
- Translation updates
- Content freshness
- Performance monitoring
- Security patches

### Content Management
- Translation file updates
- Image optimization
- SEO content updates
- Feature flag management

## Troubleshooting Guide

### Common Issues
1. **Build Failures**: Check environment variables
2. **Translation Missing**: Verify translation keys exist
3. **Firebase Errors**: Check configuration and rules
4. **Deployment Issues**: Verify FTP credentials
5. **Styling Issues**: Check Tailwind class conflicts

### Debug Tools
- React Developer Tools
- Vite dev server logs
- Browser network tab
- Firebase console
- Lighthouse audits

## Future Enhancements

### Planned Features
- User authentication system
- Content management system
- Advanced analytics dashboard
- A/B testing framework
- Progressive Web App features

### Technical Improvements
- Server-side rendering (SSR)
- Static site generation (SSG)
- Advanced caching strategies
- Micro-frontend architecture
- GraphQL API integration

---

## Quick Start for Developers

### Prerequisites
- Node.js 16+ and npm/pnpm
- Firebase project setup
- Hostinger hosting account (for deployment)

### Setup Steps
1. **Clone and Install**:
   ```bash
   git clone <repository>
   cd cogni-adventures
   npm install
   ```

2. **Environment Setup**:
   ```bash
   cp .env.example .env
   # Fill in your Firebase and FTP credentials
   ```

3. **Development**:
   ```bash
   npm run dev
   ```

4. **Build and Deploy**:
   ```bash
   npm run deploy
   ```

### Key Commands
- `npm run dev`: Start development server
- `npm run build`: Create production build
- `npm run preview`: Preview production build
- `npm run deploy`: Build and deploy to Hostinger

This documentation provides a comprehensive guide for understanding, maintaining, and extending the Cogni's Adventures web application. It serves as both a reference for current developers and onboarding material for new team members or AI coding assistants.