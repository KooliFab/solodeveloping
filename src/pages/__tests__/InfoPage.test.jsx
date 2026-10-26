import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import en from '../../../public/locales/en/translation.json';
import fr from '../../../public/locales/fr/translation.json';
import InfoPage from '../InfoPage';

const translations = { en, fr };
let language = 'en';

const lookup = (key) => key.split('.').reduce((value, part) => (value == null ? undefined : value[part]), translations[language]);

// Resolves keys against the real locale files, so the test covers the content.
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => lookup(key) ?? key,
    i18n: { language, resolvedLanguage: language, exists: (key) => lookup(key) !== undefined },
  }),
}));

vi.mock('@/components/layout/Navbar', () => ({ default: () => <nav aria-label="Main" /> }));
vi.mock('@/components/layout/Footer', () => ({ default: () => <footer /> }));

const PAGES = ['contact', 'privacy', 'developers'];

const renderPage = (page) => render(
  <HelmetProvider>
    <MemoryRouter>
      <InfoPage page={page} />
    </MemoryRouter>
  </HelmetProvider>
);

const mainText = (container) => container.querySelector('main').textContent.replace(/\s+/g, ' ').trim();

describe('InfoPage', () => {
  beforeEach(() => {
    language = 'en';
  });

  it.each(PAGES)('%s has one H1, H2 sections and at least 500 characters of text', (page) => {
    const { container } = renderPage(page);
    expect(container.querySelectorAll('h1')).toHaveLength(1);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(en[`${page}Page`].title);
    expect(container.querySelectorAll('h2').length).toBe(en[`${page}Page`].sections.length);
    expect(container.querySelectorAll('h3, h4, h5, h6')).toHaveLength(0);
    expect(mainText(container).length).toBeGreaterThan(500);
  });

  it.each(PAGES)('%s sets its own title, canonical URL and structured data', async (page) => {
    renderPage(page);
    await waitFor(() => {
      expect(document.title).toBe(en[`${page}Page`].seoTitle);
      expect(document.querySelector('link[rel="canonical"]')?.getAttribute('href')).toBe(`https://solodeveloping.com/${page}`);
    });
    const schema = JSON.parse(document.querySelector('script[type="application/ld+json"]').textContent);
    expect(schema['@type']).toBe({ contact: 'ContactPage', privacy: 'WebPage', developers: 'WebAPI' }[page]);
  });

  it('names the brand in the developer page title and heading', () => {
    renderPage('developers');
    expect(en.developersPage.seoTitle).toContain('Solo Developing');
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Solo Developing');
  });

  it('links the contact email and opens external sites in a new tab', () => {
    renderPage('contact');
    expect(screen.getAllByRole('link', { name: 'hello@solodeveloping.com' })[0]).toHaveAttribute('href', 'mailto:hello@solodeveloping.com');
    const github = screen.getByRole('link', { name: 'GitHub' });
    expect(github).toHaveAttribute('target', '_blank');
    expect(github).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('keeps links to the site itself in the same tab', () => {
    renderPage('developers');
    expect(screen.getByRole('link', { name: '/openapi.yaml' })).not.toHaveAttribute('target');
  });

  it('shows the privacy policy date', () => {
    renderPage('privacy');
    expect(screen.getByText(en.privacyPage.updated)).toBeInTheDocument();
  });

  it('renders the French pages from the French locale', async () => {
    language = 'fr';
    const { container } = renderPage('privacy');
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(fr.privacyPage.title);
    expect(mainText(container).length).toBeGreaterThan(500);
    await waitFor(() => {
      expect(document.querySelector('link[rel="canonical"]')?.getAttribute('href')).toBe('https://solodeveloping.com/fr/privacy');
    });
  });
});

describe('info page translations', () => {
  it.each(PAGES)('%s has the same sections in English and French', (page) => {
    const ids = (lang) => translations[lang][`${page}Page`].sections.map((section) => section.id);
    expect(ids('fr')).toEqual(ids('en'));
  });
});
