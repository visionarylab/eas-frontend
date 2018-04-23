import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
// import Backend from 'i18next-locize-backend';
import Backend from 'i18next-node-locize-backend';

import esES from './translations/es-ES.json';
import enGB from './translations/en-GB.json';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .init({
    // we init with resources
    resources: {
      'es-ES': esES,
      'en-GB': enGB,
    },
    fallbackLng: 'en-GB',
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
    backend: {
      projectId: '511fa9cb-9426-47d3-b5d5-67093adf8e96',
      apiKey: '87f24a2b-5043-42c2-8f29-3d7525447bca',
      referenceLng: 'es-ES',
    },
  });

export default i18n;
