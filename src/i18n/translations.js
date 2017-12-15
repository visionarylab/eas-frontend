import en_gb from './en-GB'
import es_es from './es-ES'


const translations = (locale) => {
  switch (locale) {
    case 'en-GB':
      return en_gb;
    case 'es-ES':
      return es_es;
    default:
      return en_gb;
  }
};

export default translations;

