import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { translate } from 'react-i18next';

import PublicDetails from '../../PublicDetails/PublicDetails';
import SectionPanel from '../../SectionPanel/SectionPanel';
import SubmitButton from '../../SubmitButton/SubmitButton';
import withFormValidation from '../../withValidation/withFormValidation';
import withFieldValidation from '../../withValidation/withFieldValidation';
import MultiValueInput from '../../MultiValueInput/MultiValueInput';
import PrizeSelector from '../../PrizeSelector/PrizeSelector';

const ValidatedForm = withFormValidation(props => <form noValidate {...props} />);
const ValidatedMultiValueInput = withFieldValidation(MultiValueInput);

const RaffleForm = props => {
  const { values, onFieldChange, handlePublish, t } = props;
  return (
    <ValidatedForm
      onSubmit={e => {
        e.preventDefault();
        handlePublish();
      }}
    >
      <Grid container direction={'column'} spacing={8}>
        <Grid item>
          <Typography variant="display1">{t('raffle_default_title')}</Typography>
        </Grid>
        <Grid item>
          <SectionPanel title={t('general_details_raffle')}>
            <PublicDetails
              title={values.title}
              description={values.description}
              onFieldChange={onFieldChange}
            />
          </SectionPanel>
        </Grid>
        <Grid item>
          <SectionPanel title={t('who_will_participate')}>
            <ValidatedMultiValueInput
              name="participants"
              label={t('participants')}
              labelDisplayList={t('list_of_participants')}
              value={values.participants}
              placeholder="David, María, ..."
              onChange={p => {
                onFieldChange('participants', p);
              }}
              messageEmpty={t('you_havent_add_any_participants')}
              fullWidth
              inputProps={{ 'data-component': 'ParticipantsInput' }}
              required
            />
          </SectionPanel>
          <SectionPanel title={t('detail_about_winners')}>
            <PrizeSelector
              numberOfWinners={values.numberOfWinners}
              prizes={values.prizes}
              onFieldChange={onFieldChange}
            />
          </SectionPanel>
          <SubmitButton type="submit" label={t('publish_raffle')} />
        </Grid>
      </Grid>
    </ValidatedForm>
  );
};

RaffleForm.propTypes = {
  values: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    participants: PropTypes.arrayOf(PropTypes.string).isRequired,
    prizes: PropTypes.arrayOf(PropTypes.string).isRequired,
    numberOfWinners: PropTypes.number.isRequired,
    winners: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  onFieldChange: PropTypes.func.isRequired,
  handlePublish: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

export default translate('RafflePage')(RaffleForm);
