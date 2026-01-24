import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';

/**
 * Custom hook to initialize Lenis smooth scrolling
 * Based on the strategy guide's recommendation for buttery smooth scrolling
 * Integrates with GSAP ScrollTrigger for synchronized animations
 */
export const useSmoothScroll = () => {
  useEffect(() => {
    let lenisInstance;

    const initSmoothScroll = async () => {
      // Initialize Lenis
      lenisInstance = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false,
      });

      // Make Lenis globally accessible for debugging and synchronization
      window.lenis = lenisInstance;

      // Import and setup ScrollTrigger
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      // Configure ScrollTrigger to work with Lenis
      ScrollTrigger.defaults({
        scroller: document.body
      });

      // Connect Lenis scroll to ScrollTrigger updates
      lenisInstance.on('scroll', ScrollTrigger.update);

      // Use GSAP ticker to update Lenis (recommended approach)
      gsap.ticker.add((time) => {
        lenisInstance.raf(time * 1000);
      });

      // Disable lag smoothing for smoother integration
      gsap.ticker.lagSmoothing(0);

      // Emit custom event when Lenis is ready (immediate)
      requestAnimationFrame(() => {
        window.dispatchEvent(new CustomEvent('lenis:ready'));
      });
    };

    initSmoothScroll();

    // Cleanup
    return () => {
      if (lenisInstance) {
        lenisInstance.destroy();
        delete window.lenis;
      }
      gsap.ticker.lagSmoothing(500, 33);
    };
  }, []);
};
