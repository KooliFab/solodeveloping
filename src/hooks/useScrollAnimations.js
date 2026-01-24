import { useEffect } from 'react';
import gsap from 'gsap';

// Dynamically import ScrollTrigger
let ScrollTrigger;
if (typeof window !== 'undefined') {
  import('gsap/ScrollTrigger').then((module) => {
    ScrollTrigger = module.ScrollTrigger;
    gsap.registerPlugin(ScrollTrigger);
  });
}

/**
 * Hook for scroll-triggered animations using GSAP ScrollTrigger
 * Inspired by The Brink Agency's scroll animations
 */
export const useScrollAnimations = () => {
  useEffect(() => {
    // Wait for ScrollTrigger to be loaded
    const initScrollTrigger = async () => {
      if (!ScrollTrigger) {
        const module = await import('gsap/ScrollTrigger');
        ScrollTrigger = module.ScrollTrigger;
        gsap.registerPlugin(ScrollTrigger);
      }

      // Refresh ScrollTrigger on mount
      ScrollTrigger.refresh();
    };

    initScrollTrigger();

    // Cleanup
    return () => {
      if (ScrollTrigger) {
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      }
    };
  }, []);

  return ScrollTrigger;
};

/**
 * Create a fade-in animation on scroll
 */
export const fadeInOnScroll = (element, options = {}) => {
  if (!element || !ScrollTrigger) return;

  const defaults = {
    start: 'top 80%',
    end: 'bottom 20%',
    toggleActions: 'play none none reverse',
    ...options
  };

  return gsap.fromTo(
    element,
    {
      opacity: 0,
      y: 50
    },
    {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: element,
        ...defaults
      }
    }
  );
};

/**
 * Create a parallax effect on scroll
 */
export const parallaxOnScroll = (element, speed = 0.5, options = {}) => {
  if (!element || !ScrollTrigger) return;

  return gsap.to(element, {
    y: () => element.offsetHeight * speed,
    ease: 'none',
    scrollTrigger: {
      trigger: element,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
      ...options
    }
  });
};

/**
 * Create a text reveal animation on scroll
 */
export const revealTextOnScroll = (element, options = {}) => {
  if (!element || !ScrollTrigger) return;

  const defaults = {
    start: 'top 80%',
    toggleActions: 'play none none reverse',
    ...options
  };

  return gsap.fromTo(
    element,
    {
      opacity: 0,
      y: 100,
      rotationX: -90
    },
    {
      opacity: 1,
      y: 0,
      rotationX: 0,
      duration: 1.2,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: element,
        ...defaults
      }
    }
  );
};

/**
 * Create a scale-in animation on scroll
 */
export const scaleInOnScroll = (element, options = {}) => {
  if (!element || !ScrollTrigger) return;

  const defaults = {
    start: 'top 80%',
    toggleActions: 'play none none reverse',
    ...options
  };

  return gsap.fromTo(
    element,
    {
      scale: 0.8,
      opacity: 0
    },
    {
      scale: 1,
      opacity: 1,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: element,
        ...defaults
      }
    }
  );
};
