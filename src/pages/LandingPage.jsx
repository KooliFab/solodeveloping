import { lazy } from 'react';
import SEO from '@/components/SEO';
import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/portfolio/Hero';
import DeferredSection from '@/components/ui/DeferredSection';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';

const SkillShowcase = lazy(() => import('@/components/portfolio/SkillShowcase'));
const FounderProducts = lazy(() => import('@/components/portfolio/FounderProducts'));
const ContactSection = lazy(() => import('@/components/portfolio/ContactSection'));
const Footer = lazy(() => import('@/components/layout/Footer'));

const LandingPage = () => {
  // Initialize Lenis smooth scrolling for desktop only.
  useSmoothScroll();

  return (
    <>
      <SEO
        titleKey="meta.title"
        descriptionKey="meta.description"
        path="/"
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
