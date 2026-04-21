import { lazy } from 'react';
import SEO from '@/components/SEO';
import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/portfolio/Hero';
import DeferredSection from '@/components/ui/DeferredSection';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';
import { SITE_URL } from '@/constants/site';

const SkillShowcase = lazy(() => import('@/components/portfolio/SkillShowcase'));
const FounderProducts = lazy(() => import('@/components/portfolio/FounderProducts'));
const ContactSection = lazy(() => import('@/components/portfolio/ContactSection'));
const Footer = lazy(() => import('@/components/layout/Footer'));

const homepageSchema = [
  {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Fabien Chung',
    url: SITE_URL,
    jobTitle: 'Full Stack Developer',
    description: 'Full stack developer with 20+ years of experience specializing in mobile (Flutter, iOS, Android), web (React, Node.js), and AI automation.',
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
    knowsAbout: ['Flutter', 'React', 'Node.js', 'iOS', 'Android', 'AI Automation', 'Firebase', 'Blockchain'],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Solo Developing',
    url: SITE_URL,
    description: 'Full stack developer portfolio — mobile, web, and AI development.',
    author: {
      '@type': 'Person',
      name: 'Fabien Chung',
    },
  },
];

const LandingPage = () => {
  // Initialize Lenis smooth scrolling for desktop only.
  useSmoothScroll();

  return (
    <>
      <SEO
        titleKey="meta.title"
        descriptionKey="meta.description"
        path="/"
        image="/images/og-default.webp"
        schema={homepageSchema}
      />

      <div className="min-h-screen bg-background text-foreground relative selection:bg-electric-500/30 selection:text-white">
        <Navbar />

        <main className="relative">
          <Hero />
          <DeferredSection minHeight={820}>
            <SkillShowcase />
          </DeferredSection>
          <DeferredSection minHeight={1200} id="products">
            <FounderProducts />
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

export default LandingPage;
