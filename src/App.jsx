import { Suspense, lazy, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from '@/components/ui/toaster';
import { useTranslation } from 'react-i18next';

// Lazy load pages
const LandingPage = lazy(() => import('@/pages/LandingPage'));
const BlogList = lazy(() => import('@/pages/BlogList'));
const BlogPost = lazy(() => import('@/pages/BlogPost'));
const Portfolio = lazy(() => import('@/pages/Portfolio'));
const NotFound = lazy(() => import('@/pages/NotFound'));

// Simple Green Cursor Component
const GreenCursor = () => {
  useEffect(() => {
    const cursor = document.getElementById('green-cursor');
    const cursorDot = document.getElementById('green-cursor-dot');
    if (!cursor || !cursorDot) return;

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      // Instant dot follow
      cursorDot.style.left = mouseX + 'px';
      cursorDot.style.top = mouseY + 'px';
    };

    const handleMouseEnter = () => {
      document.body.classList.add('cursor-hover');
    };

    const handleMouseLeave = () => {
      document.body.classList.remove('cursor-hover');
    };

    // Smooth cursor ring follow
    const animateCursor = () => {
      const dx = mouseX - cursorX;
      const dy = mouseY - cursorY;
      
      cursorX += dx * 0.15;
      cursorY += dy * 0.15;
      
      cursor.style.left = cursorX + 'px';
      cursor.style.top = cursorY + 'px';
      
      requestAnimationFrame(animateCursor);
    };

    document.addEventListener('mousemove', handleMouseMove);

    // Add hover effect to interactive elements
    const triggers = document.querySelectorAll('a, button, input, textarea, select, [role="button"]');
    triggers.forEach(trigger => {
      trigger.addEventListener('mouseenter', handleMouseEnter);
      trigger.addEventListener('mouseleave', handleMouseLeave);
    });

    animateCursor();

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      triggers.forEach(trigger => {
        trigger.removeEventListener('mouseenter', handleMouseEnter);
        trigger.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return (
    <>
      <div id="green-cursor"></div>
      <div id="green-cursor-dot"></div>
    </>
  );
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
    <HelmetProvider>
      <GreenCursor />
      <div className="min-h-screen bg-background text-foreground antialiased selection:bg-primary/30 selection:text-primary-foreground relative">
        {/* Grid Background - Fixed across entire site */}
        <div className="fixed inset-0 grid-background pointer-events-none z-0"></div>

        <div className="relative z-10">
          <Suspense fallback={<PageLoader />}>
            <Routes>
              {/* English routes (default - no language prefix) */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/blog" element={<BlogList />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/portfolio" element={<Portfolio />} />
              
              {/* French routes (with /fr prefix) */}
              <Route path="/fr" element={<LandingPage />} />
              <Route path="/fr/blog" element={<BlogList />} />
              <Route path="/fr/blog/:slug" element={<BlogPost />} />
              <Route path="/fr/portfolio" element={<Portfolio />} />
              
              {/* 404 for all other routes */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
          <Toaster />
        </div>
      </div>
    </HelmetProvider>
  );
};

export default App;
