import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { translate } from 'react-i18next';

import PublicSummaryPanel from '../../PublicSummaryPanel/PublicSummaryPanel';
import Page from '../../Page/Page';
import PublicDrawContent from '../../PublicDrawContent/PublicDrawContent';
import PrizesOverview from '../../PrizesOverview/PrizesOverview';
import WinnersList from '../../WinnersList/WinnersList';

import STYLES from './PublishedRafflePage.scss';

const c = className => STYLES[className];

const PublishedRafflePage = props => {
  const { title, participants, numberOfWinners, prizes, description, results, t } = props;
  return (
    <Page htmlTitle={title} noIndex className={c('PublishedRafflePage')}>
      <PublicDrawContent>
        <Typography variant="display2">{title}</Typography>
        {results.length ? (
          <Fragment>
            <section className={c('PublishedRafflePage__results-panel')}>
              <Typography variant="display1">{t('winners')}</Typography>
              <WinnersList winners={results} />
            </section>

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
          </Fragment>
        ) : (
          <PrizesOverview prizes={prizes} />
        )}
      </PublicDrawContent>
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
