import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const shouldEnableSmoothScroll = () => {
  if (typeof window === "undefined") return false;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;

  const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
  return hasFinePointer && window.innerWidth >= 1024;
};

/**
 * Custom hook to initialize Lenis smooth scrolling
 * Based on the strategy guide's recommendation for buttery smooth scrolling
 * Integrates with GSAP ScrollTrigger for synchronized animations
 */
export const useSmoothScroll = () => {
  const location = useLocation();

  useEffect(() => {
    if (!shouldEnableSmoothScroll()) return;

    let isCancelled = false;
    let lenisInstance;
    let gsapInstance;
    let tickerCallback;

    const initSmoothScroll = async () => {
      const [{ default: Lenis }, { default: gsap }, { ScrollTrigger }] =
        await Promise.all([
          import("lenis"),
          import("gsap"),
          import("gsap/ScrollTrigger"),
        ]);

      if (isCancelled) return;

      gsapInstance = gsap;

      // Initialize Lenis
      lenisInstance = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
        wheelMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false,
      });

      // Make Lenis globally accessible for debugging and synchronization
      window.lenis = lenisInstance;

      gsap.registerPlugin(ScrollTrigger);

      // Configure ScrollTrigger to work with Lenis
      ScrollTrigger.defaults({
        scroller: document.body,
      });

      // Connect Lenis scroll to ScrollTrigger updates
      lenisInstance.on("scroll", ScrollTrigger.update);

      // Use GSAP ticker to update Lenis (recommended approach)
      tickerCallback = (time) => {
        lenisInstance.raf(time * 1000);
      };
      gsap.ticker.add(tickerCallback);

      // Disable lag smoothing for smoother integration
      gsap.ticker.lagSmoothing(0);

      // Emit custom event when Lenis is ready (immediate)
      requestAnimationFrame(() => {
        window.dispatchEvent(new CustomEvent("lenis:ready"));

        // Check for hash on initial load/mount
        const initialHash = window.location.hash;
        if (initialHash) {
          // Force a refresh to ensure all pins (like HorizontalShowcase) are calculated
          ScrollTrigger.refresh();

          const target = document.querySelector(initialHash);
          if (target) {
            // Small delay to ensure layout is ready
            setTimeout(() => {
              lenisInstance.scrollTo(target, { offset: 0, duration: 1.5 });
            }, 100);
          }
        }
      });
    };

    initSmoothScroll();

    // Cleanup
    return () => {
      isCancelled = true;
      if (lenisInstance) {
        lenisInstance.destroy();
        delete window.lenis;
      }
      if (gsapInstance) {
        if (tickerCallback) {
          gsapInstance.ticker.remove(tickerCallback);
        }
        gsapInstance.ticker.lagSmoothing(500, 33);
      }
    };
  }, []);

  // Handle hash changes while component is mounted
  useEffect(() => {
    if (location.hash && window.lenis) {
      const target = document.querySelector(location.hash);
      if (target) {
        window.lenis.scrollTo(target, { offset: 0, duration: 1.5 });
      }
    }
  }, [location.hash]);
};
