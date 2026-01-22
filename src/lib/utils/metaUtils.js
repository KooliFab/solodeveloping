/**
 * Utility functions for handling meta tags and SEO
 */

/**
 * Get meta tag content from translation files
 * @param {object} t - Translation function from useTranslation hook
 * @param {string} key - Translation key
 * @returns {string} - Translated content
 */
export const getMetaContent = (t, key) => {
  return t(key);
};

/**
 * Generate meta tags for a section
 * @param {object} t - Translation function from useTranslation hook
 * @param {string} section - Section name (e.g., 'app', 'book', 'website')
 * @param {object} options - Additional options
 * @returns {object} - Meta tag content
 */
export const getSectionMeta = (t, section, options = {}) => {
  return {
    title: t(`meta.${section}.title`),
    description: t(`meta.${section}.description`),
    ogDescription: t(`meta.${section}.ogDescription`) || t(`meta.${section}.description`),
    ogImage: options.ogImage || null,
    ogType: options.ogType || 'website'
  };
};