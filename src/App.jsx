import { Suspense, lazy, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from '@/components/ui/toaster';

// Lazy load pages
const LandingPage = lazy(() => import('@/pages/LandingPage'));
const BlogList = lazy(() => import('@/pages/BlogList'));
const BlogPost = lazy(() => import('@/pages/BlogPost'));
const Portfolio = lazy(() => import('@/pages/Portfolio'));
const NotFound = lazy(() => import('@/pages/NotFound'));

// Custom Cursor Component
const CustomCursor = () => {
  useEffect(() => {
    const cursor = document.getElementById('cursor');
    if (!cursor) return;

    const handleMouseMove = (e) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
    };

    const handleMouseEnter = () => cursor.classList.add('hovered');
    const handleMouseLeave = () => cursor.classList.remove('hovered');

    document.addEventListener('mousemove', handleMouseMove);

    // Add hover effect to all interactive elements
    const triggers = document.querySelectorAll('a, button, input, textarea, select, [role="button"]');
    triggers.forEach(trigger => {
      trigger.addEventListener('mouseenter', handleMouseEnter);
      trigger.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      triggers.forEach(trigger => {
        trigger.removeEventListener('mouseenter', handleMouseEnter);
        trigger.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return <div id="cursor"></div>;
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
  return (
    <HelmetProvider>
      <CustomCursor />
      <div className="min-h-screen bg-background text-foreground antialiased selection:bg-primary/30 selection:text-primary-foreground relative">
        {/* Grid Background - Fixed across entire site */}
        <div className="fixed inset-0 grid-background pointer-events-none z-0"></div>

        <div className="relative z-10">
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/blog" element={<BlogList />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/portfolio" element={<Portfolio />} />
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
