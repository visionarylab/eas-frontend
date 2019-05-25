import React from 'react';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import SectionPanel from '../../SectionPanel/SectionPanel.jsx';
import withFieldValidation from '../../withValidation/withFieldValidation.jsx';
import MultiValueInput from '../../MultiValueInput/MultiValueInput.jsx';
import withFeedbackValidation from '../../withValidation/withFeedbackValidation.jsx';
import ErrorFeedback from '../../ErrorFeedback/ErrorFeedback.jsx';
import TextField from '../../TextField/TextField.jsx';

const ValidatedTextField = withFieldValidation(TextField);
const ValidatedMultiValueInput = withFieldValidation(MultiValueInput);
const ValidationFeedback = withFeedbackValidation(ErrorFeedback);

const GroupsGeneratorConfigurationSection = ({ values, onFieldChange, t }) => (
  <SectionPanel>
    <ValidatedMultiValueInput
      name="participants"
      label={t('section_title_participants')}
      labelDisplayList={t('field_label_list_of_participants')}
      placeholder={t('field_placeholder_participants')}
      messageEmpty={t('message_no_participants_added')}
      value={values.participants}
      fullWidth
      onChange={e => onFieldChange('participants', e.target.value)}
      validators={[{ rule: 'required' }]}
      data-component="GroupsGenerator__participants-field"
      inputProps={{ 'data-component': 'GroupsGenerator__participants-field-input' }}
    />
    <ValidatedTextField
      name="numberOfGroups"
      label={t('section_title_number_of_groups')}
      placeholder="2"
      onChange={e => onFieldChange('numberOfGroups', e.target.value)}
      value={values.numberOfGroups}
      type="number"
      margin="normal"
      validators={[{ rule: 'required' }, { rule: 'min', value: 2 }]}
      data-component="GroupsGenerator__number-of-groups-field"
      inputProps={{ 'data-component': 'GroupsGenerator__number-of-groups-field-input' }}
    />
    <ValidationFeedback />
  </SectionPanel>
);

GroupsGeneratorConfigurationSection.propTypes = {
  values: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    participants: PropTypes.arrayOf(PropTypes.string),
    numberOfGroups: PropTypes.string,
  }).isRequired,
  onFieldChange: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

export default withTranslation('GroupsGenerator')(GroupsGeneratorConfigurationSection);
