
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

const translationVersion = import.meta.env.DEV
  ? Date.now().toString()
  : import.meta.env.VITE_TRANSLATION_VERSION;

// Custom path detector for language prefix in URL
const pathLanguageDetector = {
  name: 'path',
  lookup() {
    const path = window.location.pathname;
    const langMatch = path.match(/^\/([a-z]{2})(\/|$)/);
    if (langMatch && ['en', 'fr'].includes(langMatch[1])) {
      return langMatch[1];
    }
    return null;
  },
  cacheUserLanguage(lng) {
    // Language is cached in URL path, so no additional caching needed here
  }
};

// Custom detector plugin
const customDetector = new LanguageDetector();
customDetector.addDetector(pathLanguageDetector);

i18n
  .use(HttpApi)
  .use(customDetector)
  .use(initReactI18next)
  .init({
    supportedLngs: ['en', 'fr'],
    fallbackLng: 'en',
    debug: false, 
    detection: {
      order: ['path', 'querystring', 'cookie', 'localStorage', 'navigator', 'htmlTag'],
      lookupQuerystring: 'lang',
      lookupCookie: 'i18next',
      lookupLocalStorage: 'i18nextLng',
      caches: ['localStorage', 'cookie'],
      cookieMinutes: 10080, // 7 days
      cookieDomain: window.location.hostname,
    },
    backend: {
      loadPath: translationVersion
        ? `/locales/{{lng}}/translation.json?v=${translationVersion}`
        : '/locales/{{lng}}/translation.json',
    },
    react: {
      useSuspense: true, 
    },
  });

