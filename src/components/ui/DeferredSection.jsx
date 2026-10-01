import { Suspense, useEffect, useRef, useState } from 'react';

const SectionSkeleton = ({ minHeight }) => (
  <div className="w-full" style={{ minHeight }} aria-hidden="true" />
);

/**
 * Renders children only when the container scrolls into the viewport.
 * Used to defer heavy sections (SkillShowcase, FounderProducts, etc.)
 * until the user is close to seeing them, keeping initial load light.
 */
const isPrerender = () =>
  typeof navigator !== 'undefined' && navigator.userAgent === 'ReactSnap';

const DeferredSection = ({ children, minHeight = 240, rootMargin = '1200px', id }) => {
  const containerRef = useRef(null);
  // Render immediately for the react-snap prerender so the static HTML
  // contains every section (SEO), otherwise defer until near the viewport.
  const [shouldRender, setShouldRender] = useState(isPrerender);

  // Once the page is idle, render the remaining sections too, so fast
  // scrolling never lands on empty placeholders.
  useEffect(() => {
    if (shouldRender || typeof window === 'undefined') return undefined;
    if (typeof window.requestIdleCallback === 'function') {
      const idleId = window.requestIdleCallback(() => setShouldRender(true), { timeout: 2500 });
      return () => window.cancelIdleCallback(idleId);
    }
    const timeoutId = window.setTimeout(() => setShouldRender(true), 1500);
    return () => window.clearTimeout(timeoutId);
  }, [shouldRender]);

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

export default DeferredSection;
