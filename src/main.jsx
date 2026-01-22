
import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from '@/App';
import '@/index.css';
import '@/i18n'; // Import the i18n configuration

// Initialize Google Analytics 4 - Deferred for better performance
const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

// Defer GA initialization until after page is interactive
const initializeGA = () => {
  if (GA_MEASUREMENT_ID && GA_MEASUREMENT_ID !== 'G-XXXXXXXXXX') {
    // Load gtag.js script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script);

    // Initialize dataLayer and gtag
    window.dataLayer = window.dataLayer || [];
    window.gtag = function() { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());

    // Configure GA4 with enhanced measurement and maximum data collection
    window.gtag('config', GA_MEASUREMENT_ID, {
      // Enhanced measurement (auto-tracks scrolls, outbound clicks, site search, video, file downloads)
      send_page_view: true,

      // User engagement settings
      engagement_time_msec: 100,

      // Enable all automatic events and signals
      allow_google_signals: true,
      allow_ad_personalization_signals: true,

      // Cookie settings for maximum tracking
      cookie_domain: 'auto',
      cookie_expires: 63072000, // 2 years in seconds
      cookie_update: true,

      // Link attribution for better click tracking
      link_attribution: true,
    });

    console.log('Google Analytics initialized:', GA_MEASUREMENT_ID);
  }
};

// Load GA after the page is interactive (requestIdleCallback or setTimeout fallback)
if ('requestIdleCallback' in window) {
  requestIdleCallback(initializeGA);
} else {
  setTimeout(initializeGA, 1000);
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <Suspense fallback="loading...">
          <App />
        </Suspense>
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);
