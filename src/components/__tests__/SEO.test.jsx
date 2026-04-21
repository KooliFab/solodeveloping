import { describe, it, expect, beforeEach } from 'vitest';
import { render, waitFor } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import SEO from '../SEO';

// Mock i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key,
    i18n: {
      language: 'en',
    },
  }),
}));

const renderWithHelmet = (component) => {
  return render(
    <HelmetProvider>
      {component}
    </HelmetProvider>
  );
};

describe('SEO Component', () => {
  beforeEach(() => {
    // Clear any existing helmet tags
    document.head.innerHTML = '';
  });

  it('renders title correctly', async () => {
    renderWithHelmet(<SEO title="Test Title" description="Test Description" />);
    
    await waitFor(() => {
      expect(document.title).toBe('Test Title');
    });
  });

  it('uses translation keys when provided', async () => {
    renderWithHelmet(
      <SEO 
        titleKey="meta.title" 
        descriptionKey="meta.description" 
      />
    );
    
    await waitFor(() => {
      const metaDescription = document.querySelector('meta[name="description"]');
      expect(metaDescription?.getAttribute('content')).toBe('meta.description');
    });
  });

  it('generates correct canonical URL for English', async () => {
    renderWithHelmet(
      <SEO 
        title="Test" 
        description="Test" 
        path="/about" 
      />
    );
    
    await waitFor(() => {
      const canonical = document.querySelector('link[rel="canonical"]');
      expect(canonical?.getAttribute('href')).toBe('https://solodeveloping.com/about');
    });
  });

  it('includes Open Graph meta tags', async () => {
    renderWithHelmet(
      <SEO 
        title="Test Title" 
        description="Test Description"
        image="/test-image.jpg"
      />
    );
    
    await waitFor(() => {
      const ogTitle = document.querySelector('meta[property="og:title"]');
      const ogDescription = document.querySelector('meta[property="og:description"]');
      const ogImage = document.querySelector('meta[property="og:image"]');
      
      expect(ogTitle?.getAttribute('content')).toBe('Test Title');
      expect(ogDescription?.getAttribute('content')).toBe('Test Description');
      expect(ogImage?.getAttribute('content')).toContain('test-image.jpg');
    });
  });

  it('includes Twitter Card meta tags', async () => {
    renderWithHelmet(
      <SEO 
        title="Test Title" 
        description="Test Description"
      />
    );
    
    await waitFor(() => {
      const twitterCard = document.querySelector('meta[property="twitter:card"]');
      const twitterTitle = document.querySelector('meta[property="twitter:title"]');
      
      expect(twitterCard?.getAttribute('content')).toBe('summary_large_image');
      expect(twitterTitle?.getAttribute('content')).toBe('Test Title');
    });
  });

  it('includes hreflang tags', async () => {
    renderWithHelmet(
      <SEO 
        title="Test" 
        description="Test" 
        path="/about"
      />
    );
    
    await waitFor(() => {
      const hreflangEn = document.querySelector('link[hreflang="en"]');
      const hreflangFr = document.querySelector('link[hreflang="fr"]');
      const hreflangDefault = document.querySelector('link[hreflang="x-default"]');
      
      expect(hreflangEn).toBeTruthy();
      expect(hreflangFr).toBeTruthy();
      expect(hreflangDefault).toBeTruthy();
    });
  });

  it('handles article-specific meta tags', async () => {
    renderWithHelmet(
      <SEO 
        title="Article Title" 
        description="Article Description"
        type="article"
        author="John Doe"
        publishedTime="2024-01-01"
        tags={['react', 'testing']}
      />
    );
    
    await waitFor(() => {
      const ogType = document.querySelector('meta[property="og:type"]');
      const articleAuthor = document.querySelector('meta[property="article:author"]');
      const articlePublished = document.querySelector('meta[property="article:published_time"]');
      
      expect(ogType?.getAttribute('content')).toBe('article');
      expect(articleAuthor?.getAttribute('content')).toBe('John Doe');
      expect(articlePublished?.getAttribute('content')).toBe('2024-01-01');
    });
  });

  it('includes schema markup when provided', async () => {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: 'Test Article',
    };

    renderWithHelmet(
      <SEO 
        title="Test" 
        description="Test"
        schema={schema}
      />
    );
    
    await waitFor(() => {
      const schemaScript = document.querySelector('script[type="application/ld+json"]');
      expect(schemaScript).toBeTruthy();
      if (schemaScript) {
        const schemaData = JSON.parse(schemaScript.textContent);
        expect(schemaData.headline).toBe('Test Article');
      }
    });
  });
});
