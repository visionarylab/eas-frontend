const translations = {
  // the `locale` parameter is mandatory, it enables react-translate to use
  // the right rules for singular and plural
  locale: 'en-GB',
  Number: {
    from: 'From',
    to: 'To',
    number_of_results: 'Number of results',
    random_number_default_title: 'Generate random numbers',
    generate_numbers: 'Generate numbers',
    allow_repeated: 'Allow repeated numbers',
    KEY_WITH_PARAMS: 'Hello {{name}}',
    KEY_WITH_PLURAL: [
      'You have {{n}} message',
      'You have {{n}} messages',
    ],
  },
  TranslationsSwitch: {
    change_language: 'Change language',
  },
};

export default translations;
