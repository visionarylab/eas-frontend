import React, { Fragment } from 'react';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import SectionPanel from '../../SectionPanel/SectionPanel.jsx';
import withFieldValidation from '../../withValidation/withFieldValidation.jsx';
import MultiValueInput from '../../MultiValueInput/MultiValueInput.jsx';
import withFeedbackValidation from '../../withValidation/withFeedbackValidation.jsx';
import ErrorFeedback from '../../ErrorFeedback/ErrorFeedback.jsx';

const ValidatedMultiValueInput = withFieldValidation(MultiValueInput);
const ValidationFeedback = withFeedbackValidation(ErrorFeedback);

const RaffleConfigurationSection = ({ values, onFieldChange, t }) => (
  <Fragment>
    <SectionPanel title={t('section_title_prizes')}>
      <ValidatedMultiValueInput
        name="prizes"
        label={t('field_label_prizes')}
        labelDisplayList={t('field_label_list_of_prizes')}
        placeholder="PS4"
        messageEmpty={t('message_no_prizes_added')}
        value={values.prizes}
        fullWidth
        onChange={e => onFieldChange('prizes', e.target.value)}
        data-component="Raffle__prizes-field"
        inputProps={{ 'data-component': 'Raffle__prizes-field-input' }}
        validators={[{ rule: 'required' }]}
      />
    </SectionPanel>
    <SectionPanel title={t('section_title_participants')}>
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
        data-component="Raffle__participants-field"
        inputProps={{ 'data-component': 'Raffle__participants-field-input' }}
      />
    </SectionPanel>
    <ValidationFeedback />
  </Fragment>
);

RaffleConfigurationSection.propTypes = {
  values: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    participants: PropTypes.arrayOf(PropTypes.string),
    numberOfGroups: PropTypes.string,
  }).isRequired,
  onFieldChange: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

export default withTranslation('Raffle')(RaffleConfigurationSection);
