
import React, { Suspense } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from '@/App';
import '@/index.css';
// Import the i18n configuration
import '@/i18n';

// The deploy removes the previous bundles. A visitor whose cached HTML predates
// it then asks for a chunk that no longer exists: reload once to get the
// current HTML. The timestamp stops a reload loop if the chunk is really gone.
const PRELOAD_RELOAD_KEY = 'preload-error-reload-at';
window.addEventListener('vite:preloadError', (event) => {
  try {
    const lastReload = Number(sessionStorage.getItem(PRELOAD_RELOAD_KEY));
    if (Date.now() - lastReload < 10_000) return;
    sessionStorage.setItem(PRELOAD_RELOAD_KEY, String(Date.now()));
  } catch {
    // Storage blocked: without the loop guard, let the error surface.
    return;
  }
  event.preventDefault();
  window.location.reload();
});

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
