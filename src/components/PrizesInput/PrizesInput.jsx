import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import MultiValueInput from '../MultiValueInput/MultiValueInput.jsx';

const PrizesInput = ({ t, ...rest }) => (
  <MultiValueInput
    label={t('field_label')}
    placeholder={t('field_placeholder')}
    messageEmpty={t('message_no_values_added')}
    helperText={t('field_help_separate_values_commas')}
    tooltipAddValue={t('tooltip_add_value')}
    fullWidth
    data-testid="PrizesInput"
    inputProps={{ 'data-testid': 'PrizesInput__inputField' }}
    {...rest}
  />
);

PrizesInput.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withTranslation('PrizesInput')(PrizesInput);
