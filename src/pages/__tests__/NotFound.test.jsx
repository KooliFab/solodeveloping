import { describe, it, expect, vi } from 'vitest';
import { render, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import NotFound from '../NotFound';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

describe('NotFound', () => {
  it('sets a non-empty, non-indexable page title', async () => {
    render(
      <HelmetProvider>
        <MemoryRouter>
          <NotFound />
        </MemoryRouter>
      </HelmetProvider>
    );

    await waitFor(() => {
      expect(document.title).toBe('notFound.title | Solo Developing');
      expect(document.querySelector('meta[name="robots"]')?.getAttribute('content')).toBe('noindex, nofollow');
    });
  });
});
