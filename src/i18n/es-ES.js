const translations = {
  // the `locale` parameter is mandatory, it enables react-translate to use
  // the right rules for singular and plural
  locale: 'es-ES',
  Home: {
    random_number_title: 'Generar números aleatorios',
    random_letter_title: 'Generar letras aleatorias',
  },
  NumberPrivateDraw: {
    from: 'Desde',
    to: 'Hasta',
    number_of_results: 'Número de resultados',
    random_number_default_title: 'Generar números aleatorios',
    generate_numbers: 'Generar números',
    allow_repeated: 'Permitir números repetidos',
    make_public: 'Haz esta tirada publica',
    random_number_description: 'Genera números aleatorios al azar',
    KEY_WITH_PARAMS: 'Hello {{name}}',
    KEY_WITH_PLURAL: [
      'You have {{n}} message',
      'You have {{n}} messages',
    ],
  },
  Letter: {
    random_letter_default_title: 'Generar letras aleatorias',
    number_of_letters: 'Número de letras',
    generate_letters: 'Generar letras',
  },
  TranslationsSwitch: {
    change_language: 'Cambiar idioma',
  },
};

// Number: {
//   from: 'Desde',
//   KEY_WITH_PARAMS: 'Hello {{name}}',
//   KEY_WITH_PLURAL: [
//     'You have {{n}} message',
//     'You have {{n}} messages',
//   ],
// },

export default translations;
