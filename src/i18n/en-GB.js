const translations = {
  // the `locale` parameter is mandatory, it enables react-translate to use
  // the right rules for singular and plural
  locale: "en-GB",
  Number: {
    from: 'From',
    to: 'To',
    numberResults: 'Number of results',
    random_number_default_title: 'Generate random numbers',
    KEY_WITH_PARAMS: "Hello {{name}}",
    KEY_WITH_PLURAL: [
      "You have {{n}} message",
      "You have {{n}} messages",
    ],
  },
  TranslationsSwitch: {
    change_language: 'Change language'
  }
};

export default translations;
