import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import MultiValueInput from '../MultiValueInput/MultiValueInput.jsx';

const ParticipantsInput = ({ t, ...rest }) => {
  const { tReady, i18n, ...extra } = rest;
  return (
    <MultiValueInput
      label={t('field_label')}
      placeholder={t('field_placeholder')}
      messageEmpty={t('message_no_participants_added')}
      helperText={t('field_help_separate_participants_commas')}
      tooltipAddValue={t('tooltip_add_value')}
      fullWidth
      data-testid="ParticipantsInput"
      inputProps={{ 'data-testid': 'ParticipantsInput__inputField' }}
      {...extra}
    />
  );
};

ParticipantsInput.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withTranslation('ParticipantsInput')(ParticipantsInput);
