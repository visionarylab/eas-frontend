import engbStrings from './en-GB';
import esesStrings from './es-ES';


const translations = (locale) => {
  switch (locale) {
    case 'en-GB':
      return engbStrings;
    case 'es-ES':
      return esesStrings;
    default:
      return engbStrings;
  }
};

export default translations;

