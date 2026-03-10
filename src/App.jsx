import { Suspense, lazy, useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ErrorBoundary from '@/components/ErrorBoundary';

// Lazy load pages
const LandingPage = lazy(() => import('@/pages/LandingPage'));
const About = lazy(() => import('@/pages/About'));
const BlogList = lazy(() => import('@/pages/BlogList'));
const BlogPost = lazy(() => import('@/pages/BlogPost'));
const ShortArticlePage = lazy(() => import('@/pages/ShortArticlePage'));
const NotFound = lazy(() => import('@/pages/NotFound'));
const IntroAnimation = lazy(() => import('@/components/ui/IntroAnimation'));
const GreenCursor = lazy(() => import('@/components/ui/GreenCursor'));

const canEnableEnhancedEffects = () => {
  if (typeof window === 'undefined') return false;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;

  const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
  return hasFinePointer && window.innerWidth >= 1024;
};

const shouldShowIntroOnLoad = () => {
  if (!canEnableEnhancedEffects()) return false;

  try {
    return sessionStorage.getItem('sd:intro-seen') !== '1';
  } catch {
    return false;
  }
};

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
  const [showIntro, setShowIntro] = useState(shouldShowIntroOnLoad);
  const [showCursor, setShowCursor] = useState(false);

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

  useEffect(() => {
    if (!canEnableEnhancedEffects()) return;

    if (typeof window.requestIdleCallback === 'function') {
      const idleId = window.requestIdleCallback(() => {
        setShowCursor(true);
      }, { timeout: 1500 });

      return () => {
        window.cancelIdleCallback(idleId);
      };
    }

    const timeoutId = window.setTimeout(() => {
      setShowCursor(true);
    }, 1000);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, []);

  const handleIntroComplete = () => {
    try {
      sessionStorage.setItem('sd:intro-seen', '1');
    } catch {
      // Ignore storage errors (private mode / blocked storage).
    }
    setShowIntro(false);
  };

  return (
    <>
      <a href="#main-content" className="skip-to-main">
        Skip to main content
      </a>
      {showIntro && (
        <Suspense fallback={null}>
          <IntroAnimation onComplete={handleIntroComplete} />
        </Suspense>
      )}
      {showCursor && (
        <Suspense fallback={null}>
          <GreenCursor />
        </Suspense>
      )}
      <div className="min-h-screen bg-background text-foreground antialiased selection:bg-primary/30 selection:text-primary-foreground relative">
        {/* Grid Background - Fixed across entire site */}
        <div className="fixed inset-0 grid-background pointer-events-none z-0"></div>

        <div id="main-content" className="relative z-10">
          <ErrorBoundary>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              {/* English routes (default - no language prefix) */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/about" element={<About />} />
              <Route path="/articles" element={<BlogList />} />
              <Route path="/articles/:slug" element={<BlogPost />} />
              <Route path="/shorts" element={<Navigate to="/articles" replace />} />
              <Route path="/shorts/:slug" element={<ShortArticlePage />} />
              <Route path="/projects" element={<LandingPage />} />
              
              {/* French routes (with /fr prefix) */}
              <Route path="/fr" element={<LandingPage />} />
              <Route path="/fr/about" element={<About />} />
              <Route path="/fr/articles" element={<BlogList />} />
              <Route path="/fr/articles/:slug" element={<BlogPost />} />
              <Route path="/fr/shorts" element={<Navigate to="/fr/articles" replace />} />
              <Route path="/fr/shorts/:slug" element={<ShortArticlePage />} />
              <Route path="/fr/projects" element={<LandingPage />} />
              
              {/* 404 for all other routes */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
          </ErrorBoundary>
        </div>
      </div>
    </>
  );
};

export default App;
