/**
 * Google Analytics 4 utility functions for maximum data tracking
 */

// Check if gtag is available
const isGtagAvailable = () => typeof window !== 'undefined' && typeof window.gtag === 'function';

/**
 * Track page views (called on route changes)
 */
export const trackPageView = (path, title) => {
  if (!isGtagAvailable()) return;
  
  window.gtag('event', 'page_view', {
    page_path: path,
    page_title: title,
    page_location: window.location.href,
  });
};

/**
 * Track custom events
 */
export const trackEvent = (eventName, parameters = {}) => {
  if (!isGtagAvailable()) return;
  
  window.gtag('event', eventName, {
    ...parameters,
    timestamp: new Date().toISOString(),
  });
};

/**
 * Track button clicks
 */
export const trackClick = (buttonName, category = 'engagement', additionalParams = {}) => {
  trackEvent('click', {
    event_category: category,
    event_label: buttonName,
    ...additionalParams,
  });
};

/**
 * Track purchases/conversions
 */
export const trackPurchaseIntent = (itemName, value, currency = 'USD') => {
  trackEvent('begin_checkout', {
    currency,
    value,
    items: [{
      item_name: itemName,
      quantity: 1,
    }],
  });
};

/**
 * Track outbound links
 */
export const trackOutboundLink = (url, linkText) => {
  trackEvent('click', {
    event_category: 'outbound',
    event_label: linkText,
    link_url: url,
    transport_type: 'beacon',
  });
};

/**
 * Track scroll depth
 */
export const trackScrollDepth = (percentage) => {
  trackEvent('scroll', {
    event_category: 'engagement',
    event_label: `${percentage}%`,
    percent_scrolled: percentage,
  });
};

/**
 * Track form submissions
 */
export const trackFormSubmission = (formName, success = true) => {
  trackEvent('form_submit', {
    event_category: 'engagement',
    event_label: formName,
    success,
  });
};

/**
 * Track video engagement
 */
export const trackVideoEngagement = (videoTitle, action, percentWatched = 0) => {
  trackEvent('video_' + action, {
    event_category: 'video',
    event_label: videoTitle,
    video_percent: percentWatched,
  });
};

/**
 * Track file downloads
 */
export const trackDownload = (fileName, fileType) => {
  trackEvent('file_download', {
    event_category: 'download',
    event_label: fileName,
    file_extension: fileType,
  });
};

/**
 * Track search queries
 */
export const trackSearch = (searchTerm, resultsCount = 0) => {
  trackEvent('search', {
    search_term: searchTerm,
    results_count: resultsCount,
  });
};

/**
 * Track user timing (performance)
 */
export const trackTiming = (category, variable, value, label) => {
  trackEvent('timing_complete', {
    event_category: category,
    name: variable,
    value,
    event_label: label,
  });
};

/**
 * Track exceptions/errors
 */
export const trackException = (description, fatal = false) => {
  trackEvent('exception', {
    description,
    fatal,
  });
};

/**
 * Set user properties for better segmentation
 */
export const setUserProperties = (properties) => {
  if (!isGtagAvailable()) return;
  
  window.gtag('set', 'user_properties', properties);
};

/**
 * Track e-commerce view item
 */
export const trackViewItem = (itemName, itemId, price, currency = 'USD') => {
  trackEvent('view_item', {
    currency,
    value: price,
    items: [{
      item_id: itemId,
      item_name: itemName,
      price,
    }],
  });
};

/**
 * Track add to cart
 */
export const trackAddToCart = (itemName, itemId, price, currency = 'USD') => {
  trackEvent('add_to_cart', {
    currency,
    value: price,
    items: [{
      item_id: itemId,
      item_name: itemName,
      price,
      quantity: 1,
    }],
  });
};

export default {
  trackPageView,
  trackEvent,
  trackClick,
  trackPurchaseIntent,
  trackOutboundLink,
  trackScrollDepth,
  trackFormSubmission,
  trackVideoEngagement,
  trackDownload,
  trackSearch,
  trackTiming,
  trackException,
  setUserProperties,
  trackViewItem,
  trackAddToCart,
};
