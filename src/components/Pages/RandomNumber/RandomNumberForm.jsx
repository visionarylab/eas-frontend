import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';

import PublicDetails from '../../PublicDetails/PublicDetails';
import PublishDrawOptions from '../../PublishDrawOptions/PublishDrawOptions';
import SectionPanel from '../../SectionPanel/SectionPanel';
import SubmitButton from '../../SubmitButton/SubmitButton';
import withFormValidation from '../../withValidation/withFormValidation';
import withFieldValidation from '../../withValidation/withFieldValidation';

const ValidatedForm = withFormValidation(props => <form {...props} />);
const ValidatedTextField = withFieldValidation(TextField);

const RandomNumberForm = ({ values, isPublic, onFieldChange, handlePublish, handleToss, t }) => (
  <ValidatedForm
    onSubmit={e => {
      e.preventDefault();
      if (isPublic) {
        handlePublish();
      } else {
        handleToss();
      }
    }}
  >
    <Typography color="primary" variant="display1">
      {t('random_number_default_title')}
    </Typography>
    {isPublic && (
      <SectionPanel title={t('general_details_draw')}>
        <PublicDetails
          title={values.title}
          description={values.description}
          onFieldChange={onFieldChange}
        />
      </SectionPanel>
    )}
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
            required
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
            required
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
          required
        />
        {values.numberOfResults > 1 && (
          <FormGroup row>
            <FormControlLabel
              control={
                <Checkbox
                  checked={values.allowRepeated}
                  onChange={e => onFieldChange('allowRepeated', e.target.checked)}
                />
              }
              label={t('allow_repeated')}
            />
          </FormGroup>
        )}
      </div>
    </SectionPanel>
    {isPublic && (
      <SectionPanel title={t('when_to_toss')}>
        <PublishDrawOptions
          whenToToss={values.whenToToss}
          options={['now', 'manual', 'schedule']}
          dateScheduled={values.dateScheduled}
          onFieldChange={onFieldChange}
        />
      </SectionPanel>
    )}
    <SubmitButton label={t(isPublic ? 'publish_draw' : 'generate_numbers')} />
  </ValidatedForm>
);

RandomNumberForm.propTypes = {
  values: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    participants: PropTypes.arrayOf(PropTypes.string).isRequired,
    prizes: PropTypes.arrayOf(PropTypes.string).isRequired,
    numberOfWinners: PropTypes.number.isRequired,
    winners: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  isPublic: PropTypes.bool.isRequired,
  onFieldChange: PropTypes.func.isRequired,
  handleToss: PropTypes.func.isRequired,
  handlePublish: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

export default translate('RandomNumberPage')(RandomNumberForm);
