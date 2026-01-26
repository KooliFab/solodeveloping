import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AgencyHero from '@/components/portfolio/AgencyHero';
import ExpertiseSection from '@/components/portfolio/ExpertiseSection';
import HorizontalShowcase from '@/components/portfolio/HorizontalShowcase';
import ProjectsShowcase from '@/components/portfolio/ProjectsShowcase';
import ContactSection from '@/components/portfolio/ContactSection';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';

const Portfolio = () => {
  // Initialize Lenis smooth scrolling
  useSmoothScroll();

  return (
    <>
      <Helmet>
        <title>solodeveloping.com - Full-Stack Developer | AI • Mobile • Web</title>
        <meta name="description" content="I build full stack platforms from mobile to web to blockchain. 20+ years experience. No overpromise, no underdeliver. I ship!" />
        <meta name="keywords" content="full-stack developer, mobile app development, AI automation, React Native, web development, solo developer" />
        <meta property="og:title" content="solodeveloping.com - Full-Stack Developer" />
        <meta property="og:description" content="AI automation • Mobile apps • Full-stack development. Work directly with an experienced developer who delivers results." />
        <meta property="og:type" content="website" />
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

export default Portfolio;
