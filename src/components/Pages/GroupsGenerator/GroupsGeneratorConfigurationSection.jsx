import React, { Fragment } from 'react';
import { translate } from 'react-i18next';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import SectionPanel from '../../SectionPanel/SectionPanel.jsx';
import withFieldValidation from '../../withValidation/withFieldValidation.jsx';
import MultiValueInput from '../../MultiValueInput/MultiValueInput.jsx';
import withFeedbackValidation from '../../withValidation/withFeedbackValidation.jsx';
import ErrorFeedback from '../../ErrorFeedback/ErrorFeedback.jsx';

const ValidatedTextField = withFieldValidation(TextField);
const ValidatedMultiValueInput = withFieldValidation(MultiValueInput);
const ValidationFeedback = withFeedbackValidation(ErrorFeedback);

const GroupsGeneratorConfigurationSection = ({ values, onFieldChange, t }) => (
  <Fragment>
    <SectionPanel title="Introduce los participantes">
      <ValidatedMultiValueInput
        name="participants"
        label={t('field_label_participants')}
        labelDisplayList={t('field_label_list_of_participants')}
        placeholder="David, Ana..."
        messageEmpty={t('message_no_participants_added')}
        value={values.participants}
        fullWidth
        onChange={e => onFieldChange('participants', e.target.value)}
        validators={[{ rule: 'required' }]}
        data-component="GroupsGenerator__participants-field"
        inputProps={{ 'data-component': 'GroupsGenerator__participants-field-input' }}
      />
    </SectionPanel>
    <SectionPanel title="Cuantos grupos quieres hacer?">
      <ValidatedTextField
        name="numberOfGroups"
        label={t('field_label_number_of_groups')}
        placeholder="2"
        onChange={e => onFieldChange('numberOfGroups', e.target.value)}
        value={values.numberOfGroups}
        type="number"
        margin="normal"
        validators={[{ rule: 'required' }, { rule: 'min', value: 2 }]}
        data-component="GroupsGenerator__number-of-groups-field"
        inputProps={{ 'data-component': 'GroupsGenerator__number-of-groups-field-input' }}
      />
    </SectionPanel>
    <ValidationFeedback />
  </Fragment>
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

export default translate('GroupsGenerator')(GroupsGeneratorConfigurationSection);
