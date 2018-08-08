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
import Wizard from '../../Wizard/Wizard';

const ValidatedMultiValueInput = withFieldValidation(MultiValueInput);

const GeneralDetailsSection = ({ values, onFieldChange, t }) => (
  <SectionPanel title={t('general_details_raffle')}>
    <PublicDetails
      title={values.title}
      description={values.description}
      onFieldChange={onFieldChange}
    />
  </SectionPanel>
);
const ParticipantsSection = ({ participants, onFieldChange, t }) => (
  <SectionPanel title={t('who_will_participate')}>
    <ValidatedMultiValueInput
      name="participants"
      label={t('participants')}
      labelDisplayList={t('list_of_participants')}
      value={participants}
      placeholder="David, María, ..."
      onChange={p => {
        console.log('p', p);
        onFieldChange('participants', p);
      }}
      messageEmpty={t('you_havent_add_any_participants')}
      fullWidth
      inputProps={{ 'data-component': 'ParticipantsInput' }}
      required
    />
  </SectionPanel>
);
const PrizesSection = ({ numberOfWinners, prizes, onFieldChange, t }) => (
  <SectionPanel title={t('detail_about_winners')}>
    <PrizeSelector
      numberOfWinners={numberOfWinners}
      prizes={prizes}
      onFieldChange={onFieldChange}
    />
  </SectionPanel>
);
const GeneralDetailsForm = withFormValidation(GeneralDetailsSection);
const ParticipantsForm = withFormValidation(ParticipantsSection);
const PrizesForm = withFormValidation(PrizesSection);

const RaffleForm = props => {
  const { values, onFieldChange, handlePublish, t } = props;

  const steps = [
    {
      label: 'Detalles generales',
      render: wizardProps => (
        <GeneralDetailsForm
          values={values}
          onFieldChange={props.onFieldChange}
          t={props.t}
          {...wizardProps}
        />
      ),
    },
    {
      label: 'Elegir participantes',
      render: wizardProps => (
        <ParticipantsForm
          participants={values.participants}
          onFieldChange={props.onFieldChange}
          t={props.t}
          {...wizardProps}
        />
      ),
    },
    {
      label: 'Cuándo se realizara el sorteo?',
      render: wizardProps => (
        <PrizesForm
          numberOfWinners={values.numberOfWinners}
          prizes={values.prizes}
          onFieldChange={onFieldChange}
          t={t}
          {...wizardProps}
        />
      ),
    },
  ];

  return (
    <Grid container direction={'column'} spacing={8}>
      <Grid item>
        <Typography color="primary" variant="display1">
          {t('raffle_default_title')}
        </Typography>
        <Wizard steps={steps} onSubmit={handlePublish} />
      </Grid>
      <Grid item>
        <SubmitButton type="submit" label={t('publish_raffle')} />
      </Grid>
    </Grid>
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
