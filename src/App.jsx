import { Suspense, lazy, useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { useTranslation } from 'react-i18next';
import IntroAnimation from '@/components/ui/IntroAnimation';
import GreenCursor from '@/components/ui/GreenCursor';

// Lazy load pages
const LandingPage = lazy(() => import('@/pages/LandingPage'));
const About = lazy(() => import('@/pages/About'));
const BlogList = lazy(() => import('@/pages/BlogList'));
const BlogPost = lazy(() => import('@/pages/BlogPost'));
const NotFound = lazy(() => import('@/pages/NotFound'));

// Loading component
const PageLoader = () => (
  <div className="min-h-screen bg-background flex items-center justify-center">
    <div className="text-center">
      <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent align-[-0.125em]"></div>
    </div>
  </div>
);

const App = () => {
  const { i18n } = useTranslation();
  const [showIntro, setShowIntro] = useState(true);

  // Detect and set language based on URL path
  useEffect(() => {
    const path = window.location.pathname;
    const langMatch = path.match(/^\/([a-z]{2})(\/|$)/);
    
    if (langMatch && ['en', 'fr'].includes(langMatch[1])) {
      const detectedLang = langMatch[1];
      if (i18n.language !== detectedLang) {
        i18n.changeLanguage(detectedLang);
      }
    } else {
      // Default to English if no language prefix
      if (i18n.language !== 'en') {
        i18n.changeLanguage('en');
      }
    }
  }, [i18n]);

  // Update HTML lang attribute when language changes
  useEffect(() => {
    const handleLanguageChange = (lng) => {
      document.documentElement.setAttribute('lang', lng);
    };

    // Set initial language
    handleLanguageChange(i18n.language);

    // Listen for language changes
    i18n.on('languageChanged', handleLanguageChange);

    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, [i18n]);

  return (
    <>
      {showIntro && (
        <IntroAnimation onComplete={() => setShowIntro(false)} />
      )}
      <GreenCursor />
      <div className="min-h-screen bg-background text-foreground antialiased selection:bg-primary/30 selection:text-primary-foreground relative">
        {/* Grid Background - Fixed across entire site */}
        <div className="fixed inset-0 grid-background pointer-events-none z-0"></div>

        <div className="relative z-10">
          <Suspense fallback={<PageLoader />}>
            <Routes>
              {/* English routes (default - no language prefix) */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/about" element={<About />} />
              <Route path="/articles" element={<BlogList />} />
              <Route path="/articles/:slug" element={<BlogPost />} />
              <Route path="/projects" element={<LandingPage />} />
              
              {/* French routes (with /fr prefix) */}
              <Route path="/fr" element={<LandingPage />} />
              <Route path="/fr/about" element={<About />} />
              <Route path="/fr/articles" element={<BlogList />} />
              <Route path="/fr/articles/:slug" element={<BlogPost />} />
              <Route path="/fr/projects" element={<LandingPage />} />
              
              {/* 404 for all other routes */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
          <Toaster />
        </div>
      </div>
    </>
  );
};

export default App;
