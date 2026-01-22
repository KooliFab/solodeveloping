
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(HttpApi)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    supportedLngs: ['en', 'fr', 'es'],
    fallbackLng: 'en',
    debug: false, 
    detection: {
      order: ['querystring', 'cookie', 'localStorage', 'sessionStorage', 'navigator', 'htmlTag'],
      lookupQuerystring: 'lang',
      caches: ['cookie'],
    },
    backend: {
      loadPath: '/locales/{{lng}}/translation.json?v=' + new Date().getTime(),
    },
    react: {
      useSuspense: true, 
    },
  });

export default i18n;
