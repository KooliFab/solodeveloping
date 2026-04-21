import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

/**
 * Component that detects language from URL query string
 * This handles language switching via ?lang=fr or ?lang=es
 */
const LanguagePathDetector = () => {
  const { i18n } = useTranslation();

  useEffect(() => {
    // Get the current URL search params
    const urlParams = new URLSearchParams(window.location.search);
    const langFromQuery = urlParams.get('lang');
    
    // Check if the extracted code is a supported language
    const supportedLanguages = ['en', 'fr', 'es'];
    
    if (langFromQuery && supportedLanguages.includes(langFromQuery)) {
      // Only change the language if it's different from the current one
      if (i18n.language !== langFromQuery) {
        i18n.changeLanguage(langFromQuery);
      }
    }

    // Listen for language changes and update URL
    const handleLanguageChange = (lng) => {
      const url = new URL(window.location);
      if (lng === 'en') {
        url.searchParams.delete('lang');
      } else {
        url.searchParams.set('lang', lng);
      }
      window.history.replaceState({}, '', url);
    };

    i18n.on('languageChanged', handleLanguageChange);

    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, [i18n]);

  // This component doesn't render anything
  return null;
};

export default LanguagePathDetector;