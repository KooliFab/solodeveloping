import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/layout/Navbar';
import AgencyHero from '@/components/portfolio/AgencyHero';
import ExpertiseSection from '@/components/portfolio/ExpertiseSection';
import HorizontalShowcase from '@/components/portfolio/HorizontalShowcase';
import ProjectsShowcase from '@/components/portfolio/ProjectsShowcase';
import ContactSection from '@/components/portfolio/ContactSection';
import MagneticCursor from '@/components/ui/MagneticCursor';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';

const Portfolio = () => {
  // Initialize Lenis smooth scrolling
  useSmoothScroll();

  return (
    <>
      <Helmet>
        <title>solodeveloping.com - Full-Stack Developer | AI • Mobile • Web</title>
        <meta name="description" content="I build intelligent mobile experiences and AI automation for founders who need to ship fast. 10+ years experience, 15+ apps shipped, zero missed deadlines." />
        <meta name="keywords" content="full-stack developer, mobile app development, AI automation, React Native, web development, solo developer" />
        <meta property="og:title" content="solodeveloping.com - Full-Stack Developer" />
        <meta property="og:description" content="AI automation • Mobile apps • Full-stack development. Work directly with an experienced developer who delivers results." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://solodeveloping.com" />
      </Helmet>

      <div className="min-h-screen bg-background text-foreground relative selection:bg-electric-500/30 selection:text-white">
        <MagneticCursor enabled={true} />
        <Navbar />

        <main className="relative">
          <AgencyHero />
          <ExpertiseSection />
          <HorizontalShowcase />
          <ProjectsShowcase />
          <ContactSection />

          {/* Footer */}
          <footer className="py-12 px-6 border-t border-border/50 bg-card/30">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="text-sm text-muted-foreground font-mono">
                  © {new Date().getFullYear()} solodeveloping.com · Level up with purpose
                </div>
                <div className="flex gap-6 text-sm">
                  <a href="#" className="text-muted-foreground hover:text-electric-500 transition-colors">
                    GitHub
                  </a>
                  <a href="#" className="text-muted-foreground hover:text-electric-500 transition-colors">
                    LinkedIn
                  </a>
                  <a href="#" className="text-muted-foreground hover:text-electric-500 transition-colors">
                    Twitter
                  </a>
                </div>
              </div>
            </div>
          </footer>
        </main>
      </div>
    </>
  );
};

export default Portfolio;
