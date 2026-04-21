import { Suspense, useEffect, useRef, useState } from 'react';

const SectionSkeleton = ({ minHeight }) => (
  <div className="w-full" style={{ minHeight }} aria-hidden="true" />
);

/**
 * Renders children only when the container scrolls into the viewport.
 * Used to defer heavy sections (SkillShowcase, FounderProducts, etc.)
 * until the user is close to seeing them, keeping initial load light.
 */
const DeferredSection = ({ children, minHeight = 240, rootMargin = '320px', id }) => {
  const containerRef = useRef(null);
  const [shouldRender, setShouldRender] = useState(false);

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
