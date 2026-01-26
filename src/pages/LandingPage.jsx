import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AgencyHero from '@/components/portfolio/AgencyHero';
import ExpertiseSection from '@/components/portfolio/ExpertiseSection';
import HorizontalShowcase from '@/components/portfolio/HorizontalShowcase';
import ProjectsShowcase from '@/components/portfolio/ProjectsShowcase';
import ContactSection from '@/components/portfolio/ContactSection';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';

const LandingPage = () => {
  const { t } = useTranslation();
  // Initialize Lenis smooth scrolling
  useSmoothScroll();

  return (
    <>
      <Helmet>
        <title>{t('meta.title')}</title>
        <meta name="description" content={t('meta.description')} />
        <meta name="keywords" content={t('meta.keywords')} />
        <meta property="og:title" content={t('meta.ogTitle')} />
        <meta property="og:description" content={t('meta.ogDescription')} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://solodeveloping.com" />
        <link rel="canonical" href="https://solodeveloping.com" />
      </Helmet>

      <div className="min-h-screen bg-background text-foreground relative selection:bg-electric-500/30 selection:text-white">
        <Navbar />

        <main className="relative">
          <AgencyHero />
          <ExpertiseSection />
          <HorizontalShowcase />
          <ProjectsShowcase />
          <ContactSection />
          <Footer />
        </main>
      </div>
    </>
  );
};

export default LandingPage;
