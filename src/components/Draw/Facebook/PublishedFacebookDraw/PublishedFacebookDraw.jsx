import React from 'react';
import PropTypes from 'prop-types';
import Typography from 'material-ui/Typography';
import { translate } from 'react-i18next';

import PublicResultsPanel from '../../../PublicResultsPanel/PublicResultsPanel';
import PublicSummaryPanel from '../../../PublicSummaryPanel/PublicSummaryPanel';
import STYLES from './PublishedFacebookDraw.scss';

const c = className => STYLES[className];

const PublishedFacebookDraw = props => (
  <div>
    <div className={c('PublishedFacebookDraw')}>
      <section className={c('PublishedFacebookDraw__results-panel')}>
        <Typography variant="display2">{props.title}</Typography>
        <PublicResultsPanel>
          <Typography variant="display1">{props.t('winners')}</Typography>
          <div>{props.results.map(result => <div>{result}</div>)}</div>
        </PublicResultsPanel>
      </section>
      <section className={c('PublishedFacebookDraw__summary-panel')}>
        <PublicSummaryPanel>
          <div>
            <Typography variant="display1">{props.t('draw_details')}</Typography>
            <div>Number of winners: {props.numberOfWinners}</div>
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

PublishedFacebookDraw.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  numberOfWinners: PropTypes.number.isRequired,
  results: PropTypes.arrayOf(PropTypes.object),
  t: PropTypes.func.isRequired,
};

PublishedFacebookDraw.defaultProps = {
  results: [],
};

export default translate('PublishedFacebookDraw')(PublishedFacebookDraw);
