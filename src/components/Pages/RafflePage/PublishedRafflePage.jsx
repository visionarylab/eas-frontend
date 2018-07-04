import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { translate } from 'react-i18next';

import PublicResultsPanel from '../../PublicResultsPanel/PublicResultsPanel';
import PublicSummaryPanel from '../../PublicSummaryPanel/PublicSummaryPanel';
import STYLES from './PublishedRafflePage.scss';

const c = className => STYLES[className];

const PublishedRafflePage = props => (
  <div>
    <div className={c('PublishedRafflePage')}>
      <section className={c('PublishedRafflePage__results-panel')}>
        <Typography variant="display2">{props.title}</Typography>
        <PublicResultsPanel>
          <Typography variant="display1">{props.t('winners')}</Typography>
          <div>
            {props.results.map(result => (
              <div>
                {result.position} - {result.participant}
              </div>
            ))}
          </div>
        </PublicResultsPanel>
      </section>
      <section className={c('PublishedRafflePage__summary-panel')}>
        <PublicSummaryPanel>
          <div>
            <Typography variant="display1">Extra details</Typography>
            <div>Number of winners: {props.numberOfWinners}</div>
            <div>Participants: {props.participants.join(', ')}</div>
            <div>
              Descripcion:
              <p>{props.description}</p>
            </div>
          </div>
        </PublicSummaryPanel>
      </section>
    </div>
  </div>
);

PublishedRafflePage.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  participants: PropTypes.arrayOf(PropTypes.string).isRequired,
  numberOfWinners: PropTypes.number.isRequired,
  results: PropTypes.arrayOf(PropTypes.object),
  t: PropTypes.func.isRequired,
};

PublishedRafflePage.defaultProps = {
  results: [],
};

export default translate('PublishedRafflePage')(PublishedRafflePage);