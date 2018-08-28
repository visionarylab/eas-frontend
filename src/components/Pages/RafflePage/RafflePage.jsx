import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { translate } from 'react-i18next';
import classnames from 'classnames/bind';
import STYLES from './RafflePage.scss';
import Page from '../../Page/Page';
import PublicDetails from '../../PublicDetails/PublicDetails';
import SectionPanel from '../../SectionPanel/SectionPanel';
import withFormValidation from '../../withValidation/withFormValidation';
import withFieldValidation from '../../withValidation/withFieldValidation';
import MultiValueInput from '../../MultiValueInput/MultiValueInput';
import PrizeSelector from '../../PrizeSelector/PrizeSelector';
import WizardForm from '../../WizardForm/WizardForm';
import PublishDrawOptions from '../../PublishDrawOptions/PublishDrawOptions';

const c = classnames.bind(STYLES);

const ValidatedMultiValueInput = withFieldValidation(MultiValueInput);

const GeneralDetailsSection = ({ title, description, onFieldChange, t }) => (
  <SectionPanel title={t('general_details_raffle')}>
    <PublicDetails title={title} description={description} onFieldChange={onFieldChange} />
  </SectionPanel>
);
GeneralDetailsSection.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  onFieldChange: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

const ParticipantsSection = ({ participants, onFieldChange, t }) => (
  <SectionPanel title={t('who_will_participate')}>
    <ValidatedMultiValueInput
      name="participants"
      label={t('participants')}
      labelDisplayList={t('list_of_participants')}
      value={participants}
      placeholder="David, María, ..."
      onChange={p => {
        onFieldChange('participants', p);
      }}
      messageEmpty={t('you_havent_add_any_participants')}
      fullWidth
      inputProps={{ 'data-component': 'ParticipantsInput' }}
      validators={[{ rule: 'required' }]}
    />
  </SectionPanel>
);
ParticipantsSection.propTypes = {
  participants: PropTypes.arrayOf(PropTypes.string).isRequired,
  onFieldChange: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

const PrizesSection = ({ numberOfWinners, prizes, onFieldChange, t }) => (
  <SectionPanel title={t('detail_about_winners')}>
    <PrizeSelector
      numberOfWinners={numberOfWinners}
      prizes={prizes}
      onFieldChange={onFieldChange}
    />
  </SectionPanel>
);
PrizesSection.propTypes = {
  numberOfWinners: PropTypes.number.isRequired,
  prizes: PropTypes.arrayOf(PropTypes.string).isRequired,
  onFieldChange: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

const WhenToTossSection = ({ dateScheduled, onFieldChange, t }) => (
  <SectionPanel title={t('when_to_toss')}>
    <PublishDrawOptions
      options={['now', 'schedule']}
      dateScheduled={dateScheduled}
      onFieldChange={onFieldChange}
    />
  </SectionPanel>
);
WhenToTossSection.propTypes = {
  dateScheduled: PropTypes.instanceOf(Date),
  onFieldChange: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

WhenToTossSection.defaultProps = {
  dateScheduled: null,
};

const GeneralDetailsForm = withFormValidation(GeneralDetailsSection);
const ParticipantsForm = withFormValidation(ParticipantsSection);
const PrizesForm = withFormValidation(PrizesSection);
const WhenToTossForm = withFormValidation(WhenToTossSection);

const RafflePage = props => {
  const { values, onFieldChange, handlePublish, t } = props;

  const steps = [
    {
      label: t('step_general_details'),
      render: wizardProps => (
        <GeneralDetailsForm
          title={values.title}
          description={values.description}
          onFieldChange={props.onFieldChange}
          t={props.t}
          {...wizardProps}
        />
      ),
    },
    {
      label: t('step_participants'),
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
      label: t('step_prizes'),
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
    <Page htmlTitle={t('raffle_html_title')} className={c('RafflePage')}>
      <Typography color="primary" variant="display1">
        {t('raffle_default_title')}
      </Typography>
      <WizardForm
        steps={steps}
        // initialStep={3}
        onSubmit={handlePublish}
        submitButtonLabel={t('publish_raffle')}
      />
    </Page>
  );
};

RafflePage.propTypes = {
  values: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    participants: PropTypes.arrayOf(PropTypes.string).isRequired,
    prizes: PropTypes.arrayOf(PropTypes.string).isRequired,
    numberOfWinners: PropTypes.number.isRequired,
    winners: PropTypes.arrayOf(PropTypes.string).isRequired,
    dateScheduled: PropTypes.instanceOf(Date),
  }).isRequired,
  onFieldChange: PropTypes.func.isRequired,
  handlePublish: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

export default translate('RafflePage')(RafflePage);
