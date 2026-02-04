import SEO from '@/components/SEO';
import { useTranslation } from 'react-i18next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/portfolio/Hero';
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
      <SEO 
        titleKey="meta.title" 
        descriptionKey="meta.description" 
        path="/"
      />

      <div className="min-h-screen bg-background text-foreground relative selection:bg-electric-500/30 selection:text-white">
        <Navbar />

        <main className="relative">
          <Hero />
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
