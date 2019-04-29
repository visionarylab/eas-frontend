import i18n from 'i18next';
import esES from './translations/es_ES/translations.json';
import enGB from './translations/en_GB/translations.json';

const getLanguageBasedOnHostname = () => {
  const hostname = 'echaloasuerte.com';
  const hostnameRegex = /(woreep|echaloasuerte)\.com/;
  const match = hostname.match(hostnameRegex);
  const hostnameMatch = match ? match[1] : null;
  const defaultLanguage = 'en-GB';

  switch (hostnameMatch) {
    case 'woreep':
      return 'en-GB';
    case 'echaloasuerte':
      return 'es-ES';
    default:
      return defaultLanguage;
  }
};

i18n.init({
  // we init with resources
  resources: {
    'es-ES': esES,
    'en-GB': enGB,
  },
  fallbackLng: 'es-ES',
  lng: getLanguageBasedOnHostname(),
  debug: false,

  // have a common namespace used around the full app
  ns: ['translations'],
  defaultNS: 'translations',

  keySeparator: false, // we use content as keys

  interpolation: {
    formatSeparator: ',',
  },
});

export default i18n;
