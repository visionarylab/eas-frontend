import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { translate } from 'react-i18next';
import classNames from 'classnames/bind';

import Page from '../../Page/Page';
import DrawContent from '../../DrawContent/DrawContent';
import PrizesOverview from '../../PrizesOverview/PrizesOverview';
import WinnersList from '../../WinnersList/WinnersList';
import ResultsBox from '../../ResultsBox/ResultsBox';
import SubmitButton from '../../SubmitButton/SubmitButton';
import PublishDrawOptions from '../../PublishDrawOptions/PublishDrawOptions';
import SectionPanel from '../../SectionPanel/SectionPanel';

import STYLES from './PublishedRafflePage.scss';

const c = classNames.bind(STYLES);

const SummaryRaffle = ({ participants, numberOfWinners, description, t }) => (
  <div className={c('PublishedRafflePage__summary-container')}>
    <div className={c('PublishedRafflePage__summary')}>
      <Typography variant="display1">{t('raffle_details')}</Typography>
      <div>
        {t('number_of_participants')} {participants.length}
      </div>
      <div>
        {t('number_of_winners')} {numberOfWinners}
      </div>
      <div>
        {t('description')}
        <p>{description}</p>
      </div>
    </div>
  </div>
);

const WithoutResults = ({ prizes, isOwner, onToss, values, onFieldChange, t }) => (
  <Fragment>
    <div className={c('PublishedRafflePage__results-box')}>
      <PrizesOverview prizes={prizes} />
    </div>
    <div>
      {/* <BannerAlert title={t('results_not_generated_yet')} type={ALERT_TYPES.NEUTRAL} /> */}
      {isOwner && (
        <Fragment>
          <SectionPanel title={t('when_to_toss')}>
            <PublishDrawOptions
              whenToToss={values.whenToToss}
              options={['now', 'schedule']}
              dateScheduled={values.dateScheduled}
              onFieldChange={onFieldChange}
            />
          </SectionPanel>
          <SubmitButton label={t('generate_resuts')} onClick={onToss} />
        </Fragment>
      )}
    </div>
  </Fragment>
);

WithoutResults.propTypes = {
  prizes: PropTypes.arrayOf(PropTypes.string),
  isOwner: PropTypes.bool.isRequired,
  onToss: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

const WithResults = ({ result, t }) => (
  <div className={c('PublishedRafflePage__results')}>
    <ResultsBox title={t('winners')}>
      <WinnersList winners={result.value} />
    </ResultsBox>
  </div>
);

WithResults.propTypes = {
  results: PropTypes.arrayOf(PropTypes.object),
  t: PropTypes.func.isRequired,
};

const PublishedRafflePage = props => {
  const { title, result } = props;
  console.log('resultssss', result);
  return (
    <Page htmlTitle={title} noIndex>
      <div className={c('PublishedRafflePage__content')}>
        <DrawContent title={title} footer={<SummaryRaffle {...props} />}>
          {result && result.value && result.value.length ? (
            <WithResults {...props} />
          ) : (
            <WithoutResults {...props} />
          )}
        </DrawContent>
      </div>
    </Page>
  );
};

PublishedRafflePage.propTypes = {
  title: PropTypes.string.isRequired,
  // result: PropTypes.arrayOf(PropTypes.object),
};

PublishedRafflePage.defaultProps = {
  result: null,
};

export default translate('PublishedRafflePage')(PublishedRafflePage);
