const translations = {
  // the `locale` parameter is mandatory, it enables react-translate to use
  // the right rules for singular and plural
  locale: 'es-ES',
  HomePage: {
    random_number_title: 'Generar números aleatorios',
    random_letter_title: 'Generar letras aleatorias',
  },
  NumberDraw: {
    random_number_default_title: 'Generar números aleatorios',
    random_number_description: 'Genera números aleatorios al azar',
    generate_numbers: 'Generar números',
  },
  NumberDrawForm: {
    from: 'Desde',
    to: 'Hasta',
    number_of_results: 'Número de resultados',
    allow_repeated: 'Permitir números repetidos',
  },
  PublicDetails: {
    title_label: 'Título',
    title_placeholder: 'Sorteo de Navidad',
    description_label: 'Descripción',
    description_placeholder: 'Descripción del sorteo, bases del concurso, etc.',
  },
  MakeDrawPublicButton: {
    make_public: 'Haz esta tirada publica',
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
