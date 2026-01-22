/**
 * Amazon Store Redirect Utility
 * Redirects users to the appropriate Amazon store based on their country/language
 */

const BOOK_ASIN = 'B0G16XM1V5';

/**
 * Amazon store configurations by country
 * Maps country codes to their respective Amazon domains
 */
const AMAZON_STORES = {
  // French-speaking countries
  'FR': 'amazon.fr',
  'CA': 'amazon.ca', // Canada (will check language for .ca vs .com)
  'BE': 'amazon.fr', // Belgium (French-speaking)

  // Spanish-speaking countries
  'ES': 'amazon.es',
  'MX': 'amazon.com.mx',
  'AR': 'amazon.com', // Argentina -> US store
  'CL': 'amazon.com', // Chile -> US store
  'CO': 'amazon.com', // Colombia -> US store

  // English-speaking countries
  'US': 'amazon.com',
  'GB': 'amazon.co.uk',
  'AU': 'amazon.com.au',
  'IN': 'amazon.in',
  'SG': 'amazon.sg',

  // Other European countries
  'DE': 'amazon.de',
  'IT': 'amazon.it',
  'NL': 'amazon.nl',
  'PL': 'amazon.pl',
  'SE': 'amazon.se',
  'TR': 'amazon.com.tr',

  // Asian countries
  'JP': 'amazon.co.jp',
  'CN': 'amazon.cn',

  // Middle East
  'AE': 'amazon.ae',
  'SA': 'amazon.sa',
  'EG': 'amazon.eg',

  // Default
  'DEFAULT': 'amazon.com'
};

/**
 * Get user's country code from browser language or timezone
 * @returns {string} Two-letter country code
 */
function getUserCountry() {
  try {
    // Get both language and timezone upfront
    const language = navigator.language || navigator.userLanguage;
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    console.log('[Amazon Redirect] Browser language detected:', language);
    console.log('[Amazon Redirect] Timezone detected:', timezone);
    console.log('[Amazon Redirect] User Agent:', navigator.userAgent);

    // Check if timezone indicates Canada
    const isCanadianTimezone = timezone && (
      timezone === 'America/Toronto' || timezone === 'America/Montreal' ||
      timezone === 'America/Vancouver' || timezone === 'America/Edmonton' ||
      timezone === 'America/Winnipeg' || timezone === 'America/Halifax' ||
      timezone === 'America/St_Johns' || timezone === 'America/Regina' ||
      timezone === 'America/Whitehorse' || timezone === 'America/Yellowknife' ||
      timezone === 'America/Iqaluit' || timezone === 'America/Moncton'
    );

    // If timezone indicates Canada, use that regardless of browser language
    // (handles case where browser is en-US but user is actually in Canada)
    if (isCanadianTimezone) {
      console.log('[Amazon Redirect] Canadian timezone detected, overriding language setting');
      return 'CA';
    }

    // Otherwise, try to get country from navigator.language (e.g., 'fr-FR', 'en-US', 'en-CA')
    if (language) {
      const parts = language.split('-');
      if (parts.length === 2) {
        const countryCode = parts[1].toUpperCase();
        console.log('[Amazon Redirect] Country code from language:', countryCode);
        return countryCode;
      }

      // If only language code (e.g., 'fr', 'en', 'es'), try timezone fallback
      console.log('[Amazon Redirect] No country in language code, checking timezone...');
    }

    // Fallback: Try to infer from timezone for other countries

    if (timezone) {
      // Canada - Check BEFORE US since Canadian timezones also start with America/
      if (timezone === 'America/Toronto' || timezone === 'America/Montreal' ||
          timezone === 'America/Vancouver' || timezone === 'America/Edmonton' ||
          timezone === 'America/Winnipeg' || timezone === 'America/Halifax' ||
          timezone === 'America/St_Johns' || timezone === 'America/Regina' ||
          timezone === 'America/Whitehorse' || timezone === 'America/Yellowknife' ||
          timezone === 'America/Iqaluit' || timezone === 'America/Moncton') {
        console.log('[Amazon Redirect] Canadian timezone detected:', timezone);
        return 'CA';
      }
      // France
      if (timezone.includes('Paris') || timezone.includes('Europe/Paris')) {
        return 'FR';
      }
      // UK
      if (timezone.includes('London') || timezone.includes('Europe/London')) {
        return 'GB';
      }
      // Spain
      if (timezone.includes('Madrid')) {
        return 'ES';
      }
      // US timezones - Check AFTER Canada
      if (timezone.includes('New_York') || timezone.includes('Los_Angeles') ||
          timezone.includes('Chicago') || timezone.includes('Denver') ||
          timezone.includes('Phoenix') || timezone.includes('America/')) {
        return 'US';
      }
    }

    // Last resort: check language only
    if (language) {
      const langCode = language.split('-')[0].toLowerCase();
      console.log('[Amazon Redirect] Falling back to language code:', langCode);
      if (langCode === 'fr') return 'FR';
      if (langCode === 'es') return 'ES';
      if (langCode === 'en') return 'US';
    }
  } catch (error) {
    console.warn('[Amazon Redirect] Error detecting user country:', error);
  }

  console.log('[Amazon Redirect] Using default store');
  return 'DEFAULT';
}

/**
 * Get the appropriate Amazon store domain for the user
 * @returns {string} Amazon domain (e.g., 'amazon.fr', 'amazon.com')
 */
function getAmazonStore() {
  const countryCode = getUserCountry();
  const store = AMAZON_STORES[countryCode] || AMAZON_STORES.DEFAULT;
  console.log('[Amazon Redirect] Country code:', countryCode, '-> Store:', store);
  return store;
}

/**
 * Get the full Amazon URL for the book
 * @param {string} asin - Amazon Standard Identification Number (default: BOOK_ASIN)
 * @returns {string} Full Amazon URL
 */
export function getAmazonBookUrl(asin = BOOK_ASIN) {
  const store = getAmazonStore();
  return `https://www.${store}/dp/${asin}`;
}

/**
 * Redirect user to the appropriate Amazon store
 * @param {string} asin - Amazon Standard Identification Number (default: BOOK_ASIN)
 */
export function redirectToAmazon(asin = BOOK_ASIN) {
  const url = getAmazonBookUrl(asin);
  console.log('[Amazon Redirect] Opening in new tab:', url);
  window.open(url, '_blank', 'noopener,noreferrer');
}

/**
 * Get user's detected country (for debugging/display purposes)
 * @returns {string} Country code
 */
export function getDetectedCountry() {
  return getUserCountry();
}

/**
 * Get the Amazon store domain that will be used (for debugging/display purposes)
 * @returns {string} Amazon domain
 */
export function getDetectedAmazonStore() {
  return getAmazonStore();
}
