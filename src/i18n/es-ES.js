const translations = {
  // the `locale` parameter is mandatory, it enables react-translate to use
  // the right rules for singular and plural
  locale: "es-ES",
  Number: {
    from: 'Desde',
    to: 'Hasta',
    numberResults: 'Número de resultados',
    random_number_default_title: 'Generar números aleatorios',
    KEY_WITH_PARAMS: "Hello {{name}}",
    KEY_WITH_PLURAL: [
      "You have {{n}} message",
      "You have {{n}} messages",
    ],
  },
  TranslationsSwitch: {
    change_language: 'Cambiar idioma'
  }
};

export default translations;
