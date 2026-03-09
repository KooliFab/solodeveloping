import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import SEO from '@/components/SEO';
import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/portfolio/Hero';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';

const SkillShowcase = lazy(() => import('@/components/portfolio/SkillShowcase'));
const FounderProducts = lazy(() => import('@/components/portfolio/FounderProducts'));
const ContactSection = lazy(() => import('@/components/portfolio/ContactSection'));
const Footer = lazy(() => import('@/components/layout/Footer'));

const SectionSkeleton = ({ minHeight }) => (
  <div className="w-full" style={{ minHeight }} aria-hidden="true" />
);

const DeferredSection = ({ children, minHeight = 240, rootMargin = '320px', id }) => {
  const containerRef = useRef(null);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    const node = containerRef.current;
    if (!node || shouldRender) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShouldRender(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [rootMargin, shouldRender]);

  return (
    <div ref={containerRef} id={id}>
      {shouldRender ? (
        <Suspense fallback={<SectionSkeleton minHeight={minHeight} />}>
          {children}
        </Suspense>
      ) : (
        <SectionSkeleton minHeight={minHeight} />
      )}
    </div>
  );
};

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
          <DeferredSection minHeight={960}>
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
