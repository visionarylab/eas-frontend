import React from 'react';
import { translate } from 'react-i18next';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import SectionPanel from '../../SectionPanel/SectionPanel';
import withFieldValidation from '../../withValidation/withFieldValidation';
import ValidationFeedback from '../../withValidation/ValidationFeedback';
import MultiValueInput from '../../MultiValueInput/MultiValueInput';

const ValidatedTextField = withFieldValidation(TextField);
const ValidatedMultiValueInput = withFieldValidation(MultiValueInput);

const GroupsGeneratorConfigurationSection = ({ values, onFieldChange, t }) => (
  <SectionPanel title={t('step_title_draw_configuration')}>
    <ValidatedMultiValueInput
      name="participants"
      label={t('input_label_participants')}
      labelDisplayList={t('list_of_participants')}
      placeholder="David, Ana..."
      messageEmpty={t('no_participants_added')}
      value={values.participants}
      fullWidth
      onChange={participants_ => onFieldChange('participants', participants_)}
      validators={[{ rule: 'required' }]}
    />
    <ValidatedTextField
      name="numberOfGroups"
      label={t('input_label_number_of_groups')}
      placeholder="2"
      onChange={e => onFieldChange('numberOfGroups', e.target.value)}
      value={values.numberOfGroups}
      type="number"
      margin="normal"
      validators={[{ rule: 'required' }]}
      data-component="GroupsGenerator__number-of-groups-field"
      inputProps={{ 'data-component': 'GroupsGenerator__number-of-groups-field-input' }}
    />
    <ValidationFeedback />
  </SectionPanel>
);

GroupsGeneratorConfigurationSection.propTypes = {
  values: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    participants: PropTypes.arrayOf(PropTypes.string).isRequired,
    numberOfgroups: PropTypes.number.isRequired,
  }).isRequired,
  onFieldChange: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

export default translate('RandomNumber')(GroupsGeneratorConfigurationSection);
