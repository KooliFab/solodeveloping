import { lazy, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import SEO from '@/components/SEO';
import Navbar from '@/components/layout/Navbar';
import FacetHero from '@/components/portfolio/FacetHero';
import DeferredSection from '@/components/ui/DeferredSection';
import { getFacetBySlug } from '@/data/facets';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';
import { SITE_URL } from '@/constants/site';
import { notifyPageVisit } from '@/utils/pageVisitNotifier';

const SkillShowcase = lazy(() => import('@/components/portfolio/SkillShowcase'));
const FounderProducts = lazy(() => import('@/components/portfolio/FounderProducts'));
const ContactSection = lazy(() => import('@/components/portfolio/ContactSection'));
const Footer = lazy(() => import('@/components/layout/Footer'));

/**
 * Service facet page — a dedicated landing page for each expertise area.
 * Routes: /fullstack, /mobile-developer, /ai-developer (and their /fr/ equivalents).
 * The `slug` prop is passed explicitly from App.jsx routes (e.g. slug="fullstack").
 */
const FacetPage = ({ slug }) => {
  const { t, i18n } = useTranslation();
  const facet = getFacetBySlug(slug);
  useSmoothScroll();

  useEffect(() => {
    if (facet) {
      notifyPageVisit(`Facet: ${facet.id}`);
      try {
        sessionStorage.setItem('sd:origin-facet', facet.slug);
      } catch {
        // ignore storage errors
      }
    }
  }, [facet]);

  if (!facet) {
    return <Navigate to="/404" replace />;
  }

  const prefix = facet.i18nPrefix;
  const currentLang = i18n.language;
  const langSuffix = currentLang === 'fr' ? '/fr' : '';

  // JSON-LD Service schema — structured data for search engines and LLMs
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: t(`${prefix}.seo.title`),
    description: t(`${prefix}.seo.description`),
    url: `${SITE_URL}${langSuffix}${facet.seo.path}`,
    provider: {
      '@type': 'Person',
      name: 'Fabien Chung',
      url: SITE_URL,
      jobTitle: t(`${prefix}.seo.jobTitle`),
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Montreal',
        addressRegion: 'Quebec',
        addressCountry: 'CA',
      },
      sameAs: [
        'https://www.linkedin.com/in/%F0%9F%92%BB-fabien-chung-a1793830/',
        'https://github.com/KooliFab',
      ],
    },
    areaServed: [
      { '@type': 'City', name: 'Montreal' },
      { '@type': 'AdministrativeArea', name: 'Quebec' },
      { '@type': 'Country', name: 'Canada' },
      { '@type': 'Country', name: 'United Arab Emirates' },
    ],
    serviceType: t(`${prefix}.seo.serviceType`),
  };

  return (
    <>
      <SEO
        title={t(`${prefix}.seo.title`)}
        description={t(`${prefix}.seo.description`)}
        path={facet.seo.path}
        keywords={t(`${prefix}.seo.keywords`, { returnObjects: true })}
        schema={serviceSchema}
      />

      <div className="min-h-screen bg-background text-foreground relative selection:bg-electric-500/30 selection:text-white">
        <Navbar />

        <main className="relative">
          <FacetHero facet={facet} />

          <DeferredSection minHeight={820}>
            <SkillShowcase categoryFilter={facet.skillCategoryIds} />
          </DeferredSection>

          <DeferredSection minHeight={1200} id="products">
            <FounderProducts productFilter={facet.productIds} />
          </DeferredSection>

          <DeferredSection minHeight={960} id="contact">
            <ContactSection />
          </DeferredSection>

          <DeferredSection minHeight={420}>
            <Footer />
          </DeferredSection>
        </main>
      </div>
    </>
  );
};

FacetPage.propTypes = {
  slug: PropTypes.string.isRequired,
};

export default FacetPage;
