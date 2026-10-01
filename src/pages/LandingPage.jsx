import { lazy } from 'react';
import SEO from '@/components/SEO';
import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/portfolio/Hero';
import DeferredSection from '@/components/ui/DeferredSection';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';
import { SITE_URL } from '@/constants/site';

const SkillShowcase = lazy(() => import('@/components/portfolio/SkillShowcase'));
const FounderProducts = lazy(() => import('@/components/portfolio/FounderProducts'));
const AIWorkflow = lazy(() => import('@/components/portfolio/AIWorkflow'));
const ContactSection = lazy(() => import('@/components/portfolio/ContactSection'));
const Footer = lazy(() => import('@/components/layout/Footer'));

const homepageSchema = [
  {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Fabien Chung',
    alternateName: ['Fab Chung', 'KooliFab'],
    url: SITE_URL,
    jobTitle: 'Next-Gen Full-Stack Developer',
    description:
      'Fabien Chung is a Montréal-based full-stack developer with 20+ years of experience. Specialist in Flutter mobile, React/Node.js web, and advanced AI automation (maîtrise avancée des IA). Co-founder of 3 startups.',
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
    knowsAbout: [
      'Flutter',
      'React',
      'Next.js',
      'TypeScript',
      'Node.js',
      'PostgreSQL',
      'Supabase',
      'iOS',
      'Android',
      'AI Automation',
      'Generative AI',
      'LLM integration',
      'AI agents',
      'Prompt engineering',
      'Claude API',
      'OpenAI API',
      'Firebase',
      'Blockchain',
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Solo Developing — Fabien Chung',
    url: SITE_URL,
    description:
      'Freelance full-stack development services by Fabien Chung, Montréal. Web, mobile, and advanced AI automation.',
    areaServed: [
      { '@type': 'City', name: 'Montreal' },
      { '@type': 'AdministrativeArea', name: 'Quebec' },
      { '@type': 'Country', name: 'Canada' },
      { '@type': 'Country', name: 'United Arab Emirates' },
    ],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Montreal',
      addressRegion: 'Quebec',
      addressCountry: 'CA',
    },
    provider: {
      '@type': 'Person',
      name: 'Fabien Chung',
      url: SITE_URL,
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Solo Developing',
    url: SITE_URL,
    description: 'Fabien Chung — Next-Gen Full-Stack Developer portfolio. Mobile, web, and AI development from Montréal.',
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
          <DeferredSection minHeight={640}>
            <AIWorkflow />
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
