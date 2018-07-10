import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { translate } from 'react-i18next';
import Grid from '@material-ui/core/Grid';
import classNames from 'classnames/bind';

import PublicSummaryPanel from '../../PublicSummaryPanel/PublicSummaryPanel';
import Page from '../../Page/Page';
import PublicDrawContent from '../../PublicDrawContent/PublicDrawContent';
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
    <PublicSummaryPanel>
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
    </PublicSummaryPanel>
  </section>
);

const SpectatorWithoutResults = props => (
  <Grid container spacing={16} direction={'column'} alignItems={'center'}>
    <PrizesOverview prizes={props.prizes} />{' '}
    <BannerAlert title={props.t('results_not_generated_yet')} type={ALERT_TYPES.NEUTRAL} />
    <SummaryRaffle {...props} />
  </Grid>
);

const SpectatorWithResults = ({ results, t, ...rest }) => (
  <Grid container spacing={16} direction={'column'} alignItems={'center'}>
    <Grid item>
      <section className={c('PublishedRafflePage__results-panel')}>
        <Grid container spacing={4} direction={'row'}>
          <TrumpetIcon inverted />
          <Typography variant="display1" component={'p'}>
            {t('winners')}
          </Typography>
          <TrumpetIcon />
        </Grid>
        <WinnersList winners={results} />
      </section>
    </Grid>
    <SummaryRaffle t={t} {...rest} />
    <Grid item />
  </Grid>
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
      <Grid container justify={'center'}>
        <PublicDrawContent>
          <Typography variant="display2" data-component={'PublishedRafflePage__Title'}>
            {title}
          </Typography>
          {results.length ? (
            <SpectatorWithResults {...props} />
          ) : (
            <SpectatorWithoutResults {...props} />
          )}
        </PublicDrawContent>
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
