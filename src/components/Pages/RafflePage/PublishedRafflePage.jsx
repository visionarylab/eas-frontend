import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { translate } from 'react-i18next';
import Grid from '@material-ui/core/Grid';
import classNames from 'classnames/bind';

import PublicSummaryPanel from '../../PublicSummaryPanel/PublicSummaryPanel';
import Page from '../../Page/Page';
import TransparentPanel from '../../TransparentPanel/TransparentPanel';
import PrizesOverview from '../../PrizesOverview/PrizesOverview';
import WinnersList from '../../WinnersList/WinnersList';
import BannerAlert, { ALERT_TYPES } from '../../BannerAlert/BannerAlert';
import trumpetIcon from './trumpet.png';

import STYLES from './PublishedRafflePage.scss';

const c = classNames.bind(STYLES);

const TrumpetIcon = ({ inverted }) => (
  <img
    src={trumpetIcon}
    className={c('PublishedRafflePage__trumpet-icon', {
      'PublishedRafflePage__trumpet-icon--flipped': inverted,
    })}
    alt={inverted}
  />
);

const SummaryRaffle = ({ participants, numberOfWinners, description, t }) => (
  <section className={c('PublishedRafflePage__summary-panel')}>
    <Grid container spacing={16} direction={'row'} justify={'center'}>
      <Grid item>
        <div>
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
      </Grid>
    </Grid>
  </section>
);

const SpectatorWithoutResults = props => (
  <Grid container spacing={16} direction={'column'} alignItems={'center'}>
    <PrizesOverview prizes={props.prizes} />{' '}
    <BannerAlert title={props.t('results_not_generated_yet')} type={ALERT_TYPES.NEUTRAL} />
  </Grid>
);

const WinnersTitle = ({ winnersLabel }) => (
  <Grid container direction={'row'}>
    <Grid item>
      <TrumpetIcon inverted />
    </Grid>
    <Grid item>
      <Typography variant="display1" component={'p'}>
        {winnersLabel}
      </Typography>
    </Grid>
    <Grid item>
      <TrumpetIcon />
    </Grid>
  </Grid>
);

const SpectatorWithResults = ({ results, t }) => (
  // <Grid container spacing={16} direction={'row'} justify={'center'}>
  // <Grid item md={6}>
  <section className={c('PublishedRafflePage__results-panel')}>
    <Grid container spacing={16} direction={'column'} alignItems={'center'}>
      <Grid item>
        <WinnersTitle winnersLabel={t('winners')} />
      </Grid>
      <Grid item>
        <WinnersList winners={results} />
      </Grid>
    </Grid>
  </section>
  // </Grid>
  // </Grid>
);

SpectatorWithResults.propTypes = {
  description: PropTypes.string.isRequired,
  participants: PropTypes.arrayOf(PropTypes.string).isRequired,
  numberOfWinners: PropTypes.number.isRequired,
  results: PropTypes.arrayOf(PropTypes.object),
  t: PropTypes.func.isRequired,
};

const PublishedRafflePage = props => {
  const { title, results } = props;
  return (
    <Page htmlTitle={title} noIndex>
      <Grid container direction={'row'} justify={'center'}>
        <Grid item sm={10}>
          <TransparentPanel>
            <Grid container direction={'column'} spacing={8}>
              <Grid item>
                <Typography
                  variant="display2"
                  align={'center'}
                  data-component={'PublishedRafflePage__Title'}
                >
                  {title}
                </Typography>
              </Grid>
              <Grid item md={6}>
                {results.length ? (
                  <SpectatorWithResults {...props} />
                ) : (
                  <SpectatorWithoutResults {...props} />
                )}
              </Grid>
              <Grid item>
                <SummaryRaffle {...props} />
              </Grid>
            </Grid>
          </TransparentPanel>
        </Grid>
      </Grid>
    </Page>
  );
};

PublishedRafflePage.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  participants: PropTypes.arrayOf(PropTypes.string).isRequired,
  numberOfWinners: PropTypes.number.isRequired,
  prizes: PropTypes.arrayOf(PropTypes.string).isRequired,
  results: PropTypes.arrayOf(PropTypes.object),
  t: PropTypes.func.isRequired,
};

PublishedRafflePage.defaultProps = {
  results: [],
};

export default translate('PublishedRafflePage')(PublishedRafflePage);
