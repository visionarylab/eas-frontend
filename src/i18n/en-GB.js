const translations = {
  // the `locale` parameter is mandatory, it enables react-translate to use
  // the right rules for singular and plural
  locale: 'en-GB',
  Home: {
    random_number_title: 'Generate random numbers',
    random_letter_title: 'Generate random letters',
  },
  Number: {
    from: 'From',
    to: 'To',
    number_of_results: 'Number of results',
    random_number_default_title: 'Generate random numbers',
    generate_numbers: 'Generate numbers',
    allow_repeated: 'Allow repeated numbers',
    make_public: 'Make this draw public',
    random_number_description: 'Generate random numbers for anything you need',
    KEY_WITH_PARAMS: 'Hello {{name}}',
    KEY_WITH_PLURAL: [
      'You have {{n}} message',
      'You have {{n}} messages',
    ],
  },
  Letter: {
    random_letter_default_title: 'Generate random letters',
    number_of_letters: 'Number of letters',
    generate_letters: 'Generate letters',
  },
  TranslationsSwitch: {
    change_language: 'Change language',
  },
};

export default translations;
