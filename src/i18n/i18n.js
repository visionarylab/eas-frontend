import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import esLang from './translations/es';
import enLang from './translations/en';

i18n.use(LanguageDetector).init({
  // we init with resources
  resources: {
    es: esLang,
    en: enLang,
  },
  fallbackLng: 'en',
  debug: true,

  // have a common namespace used around the full app
  ns: ['translations'],
  defaultNS: 'translations',

  keySeparator: false, // we use content as keys

  interpolation: {
    formatSeparator: ',',
  },

  react: {
    wait: true,
  },
});

export default i18n;
