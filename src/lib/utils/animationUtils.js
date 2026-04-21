/**
 * Animation utility configurations for consistent animations across components
 */

/**
 * Common animation variants for section headers
 */
export const sectionHeaderAnimation = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7 }
};

/**
 * Common animation variants for left-side content
 */
export const leftContentAnimation = {
  initial: { opacity: 0, x: -30 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true },
  transition: { duration: 0.7 }
};

/**
 * Common animation variants for right-side content
 */
export const rightContentAnimation = {
  initial: { opacity: 0, x: 30 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true },
  transition: { duration: 0.7 }
};

/**
 * Common animation variants for decorative elements
 */
export const decorativeElementAnimation = {
  initial: { scale: 0 },
  whileInView: { scale: 1 },
  viewport: { once: true },
  transition: { duration: 0.5, delay: 0.8 }
};