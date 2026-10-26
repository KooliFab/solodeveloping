import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Footer from '../Footer';

let language = 'en';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key,
    i18n: { resolvedLanguage: language },
  }),
}));

const renderFooter = () => render(
  <MemoryRouter>
    <Footer />
  </MemoryRouter>
);

describe('Footer', () => {
  beforeEach(() => {
    language = 'en';
  });

  it('describes Solo Developing in plain text', () => {
    renderFooter();
    expect(screen.getByText('footer.about').tagName).toBe('P');
  });

  it('describes the work on offer in a second paragraph', () => {
    renderFooter();
    expect(screen.getByText('footer.work').tagName).toBe('P');
  });

  it('links to the service pages, articles, about and the trust pages', () => {
    renderFooter();
    const nav = screen.getByRole('navigation', { name: 'footer.pagesLabel' });
    const hrefs = [...nav.querySelectorAll('a')].map((link) => link.getAttribute('href'));
    expect(hrefs).toEqual([
      '/fullstack', '/mobile-developer', '/ai-developer', '/articles', '/about', '/contact', '/developers', '/privacy',
    ]);
  });

  it('keeps French visitors on French pages', () => {
    language = 'fr';
    renderFooter();
    const nav = screen.getByRole('navigation', { name: 'footer.pagesLabel' });
    const hrefs = [...nav.querySelectorAll('a')].map((link) => link.getAttribute('href'));
    expect(hrefs.every((href) => href.startsWith('/fr/'))).toBe(true);
  });

  it('keeps the social links and copyright', () => {
    renderFooter();
    expect(screen.getByText('footer.linkGitHub')).toHaveAttribute('href', 'https://github.com/KooliFab');
    expect(screen.getByText('footer.copyright')).toBeInTheDocument();
  });
});
