import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';

import SectionPanel from '../../SectionPanel/SectionPanel';
import SubmitButton from '../../SubmitButton/SubmitButton';
import withFormValidation from '../../withValidation/withFormValidation';
import withFieldValidation from '../../withValidation/withFieldValidation';
import ValidationFeedback from '../../withValidation/ValidationFeedback';
import GeneralDetailsSection from '../../CommonSections/GeneralDetailsSection';
import WhenToTossSection from '../../CommonSections/WhenToTossSection';
import WizardForm from '../../WizardForm/WizardForm';

const ValidatedForm = withFormValidation(props => <form {...props} />);
const ValidatedTextField = withFieldValidation(TextField);
const ValidatedCheckbox = withFieldValidation(Checkbox);

const ConfigurationSection = ({ values, onFieldChange, t }) => (
  <SectionPanel title={t('draw_configuration')}>
    <Grid container spacing={16}>
      <Grid item xs={6}>
        <ValidatedTextField
          name="rangeMin"
          label={t('from')}
          placeholder="1"
          onChange={e => onFieldChange('rangeMin', e.target.value)}
          value={values.rangeMin}
          type="number"
          margin="normal"
          fullWidth
          validators={[{ rule: 'required' }]}
          data-component="RandomNumber__from-field"
          inputProps={{ 'data-component': 'RandomNumber__from-field-input' }}
        />
      </Grid>
      <Grid item xs={6}>
        <ValidatedTextField
          name="rangeMax"
          label={t('to')}
          placeholder="9"
          onChange={e => onFieldChange('rangeMax', e.target.value)}
          value={values.rangeMax}
          margin="normal"
          type="number"
          validators={[{ rule: 'required' }]}
          data-component="RandomNumber__to-field"
          inputProps={{ 'data-component': 'RandomNumber__to-input' }}
        />
      </Grid>
    </Grid>
    <div>
      <ValidatedTextField
        name="numberOfResults"
        label={t('number_of_results')}
        placeholder="1"
        onChange={e => onFieldChange('numberOfResults', e.target.value)}
        value={values.numberOfResults}
        margin="normal"
        type="number"
        validators={[
          { rule: 'required', value: true },
          { rule: 'min', value: 1, message: t('error_message_min_results', { min: 1 }) },
        ]}
        data-component="RandomNumber__number-of-results-field"
        inputProps={{ 'data-component': 'RandomNumber__number-of-results-input' }}
      />
      {values.numberOfResults > 1 && (
        <FormGroup row>
          <FormControlLabel
            control={
              <ValidatedCheckbox
                name="allowRepeated"
                checked={values.allowRepeated}
                onChange={e => onFieldChange('allowRepeated', e.target.checked)}
                inputProps={{ 'data-component': 'RandomNumber__allow-repated-input' }}
              />
            }
            label={t('allow_repeated')}
          />
        </FormGroup>
      )}
    </div>
    <ValidationFeedback />
  </SectionPanel>
);

ConfigurationSection.propTypes = {
  values: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    rangeMax: PropTypes.string.isRequired,
    rangeMin: PropTypes.string.isRequired,
    numberOfResults: PropTypes.string.isRequired,
    allowRepeated: PropTypes.bool.isRequired,
  }).isRequired,
  onFieldChange: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

const LocalDraw = ({ values, handleToss, onFieldChange, checkErrorsInConfiguration, t }) => (
  <ValidatedForm
    onSubmit={e => {
      e.preventDefault();
      handleToss();
    }}
    checkErrors={() => checkErrorsInConfiguration(t)}
  >
    <ConfigurationSection values={values} onFieldChange={onFieldChange} t={t} />
    <SubmitButton label={t('generate_numbers')} />
  </ValidatedForm>
);

LocalDraw.propTypes = {
  values: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    rangeMax: PropTypes.string.isRequired,
    rangeMin: PropTypes.string.isRequired,
    numberOfResults: PropTypes.string.isRequired,
    allowRepeated: PropTypes.bool.isRequired,
  }).isRequired,
  onFieldChange: PropTypes.func.isRequired,
  handleToss: PropTypes.func.isRequired,
  checkErrorsInConfiguration: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

const GeneralDetailsForm = withFormValidation(GeneralDetailsSection);
const ConfigurationForm = withFormValidation(ConfigurationSection);
const WhenToTossForm = withFormValidation(WhenToTossSection);

const PublicDraw = ({ values, handlePublish, onFieldChange, checkErrorsInConfiguration, t }) => {
  const steps = [
    {
      label: t('step_general_details'),
      render: wizardProps => (
        <GeneralDetailsForm
          title={values.title}
          description={values.description}
          onFieldChange={onFieldChange}
          t={t}
          {...wizardProps}
        />
      ),
    },
    {
      label: t('step_participants'),
      render: wizardProps => (
        <ConfigurationForm
          values={values}
          onFieldChange={onFieldChange}
          t={t}
          checkErrors={() => checkErrorsInConfiguration(t)}
          {...wizardProps}
        />
      ),
    },
    {
      label: t('step_when_to_toss'),
      render: wizardProps => (
        <WhenToTossForm
          dateScheduled={values.dateScheduled}
          onFieldChange={onFieldChange}
          t={t}
          {...wizardProps}
        />
      ),
    },
  ];
  return (
    <WizardForm steps={steps} onSubmit={handlePublish} submitButtonLabel={t('publish_raffle')} />
  );
};

PublicDraw.propTypes = {
  values: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    rangeMax: PropTypes.string.isRequired,
    rangeMin: PropTypes.string.isRequired,
    numberOfResults: PropTypes.string.isRequired,
    allowRepeated: PropTypes.bool.isRequired,
  }).isRequired,
  onFieldChange: PropTypes.func.isRequired,
  handlePublish: PropTypes.func.isRequired,
  checkErrorsInConfiguration: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

const RandomNumberForm = props => (
  <Fragment>
    <Typography color="primary" variant="display1">
      {props.t('random_number_default_title')}
    </Typography>
    {props.isPublic ? <PublicDraw {...props} /> : <LocalDraw {...props} />}
  </Fragment>
);

RandomNumberForm.propTypes = {
  isPublic: PropTypes.bool.isRequired,
  t: PropTypes.func.isRequired,
};

export default translate('RandomNumberPage')(RandomNumberForm);
