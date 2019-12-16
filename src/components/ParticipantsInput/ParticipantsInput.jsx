import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import MultiValueInput from '../MultiValueInput/MultiValueInput.jsx';
import MultiValueInputOld from '../MultiValueInputOld/MultiValueInput.jsx';
import { shouldUseNewForm } from '../../services/abtest';

const ParticipantsInput = ({ t, ...extra }) => {
  const useNewForm = shouldUseNewForm();
  const { tReady, i18n, ...rest } = extra;
  const props = {
    label: t('field_label'),
    placeholder: t('field_placeholder'),
    messageEmpty: t('message_no_participants_added'),
    helperText: t('field_help_separate_participants_commas'),
    fullWidth: true,
    'data-testid': 'ParticipantsInput',
    inputProps: { 'data-testid': 'ParticipantsInput__inputField' },
    ...rest,
  };

  if (!useNewForm) {
    props.labelDisplayList = t('box_label_list_of_items');
  }

  const Component = useNewForm ? MultiValueInput : MultiValueInputOld;

  return <Component {...props} />;
};

ParticipantsInput.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withTranslation('ParticipantsInput')(ParticipantsInput);
