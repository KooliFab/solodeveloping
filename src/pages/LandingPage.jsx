import SEO from '@/components/SEO';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/portfolio/Hero';
import FounderProducts from '@/components/portfolio/FounderProducts';
import SkillShowcase from '@/components/portfolio/SkillShowcase';
import ContactSection from '@/components/portfolio/ContactSection';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';

const LandingPage = () => {
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
          <FounderProducts />
          <SkillShowcase />
          <ContactSection />
          <Footer />
        </main>
      </div>
    </>
  );
};

export default LandingPage;
