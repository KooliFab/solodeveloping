
import React, { Suspense } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from '@/App';
import '@/index.css';
// Import the i18n configuration
import '@/i18n';

const container = document.getElementById('root');
const app = (
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

// Use hydrateRoot when react-snap has pre-rendered the page (root already has children)
if (container.hasChildNodes()) {
  hydrateRoot(container, app);
} else {
  createRoot(container).render(app);
}
