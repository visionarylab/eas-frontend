import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { translate } from 'react-i18next';

import PublicResultsPanel from '../../../PublicResultsPanel/PublicResultsPanel';
import PublicSummaryPanel from '../../../PublicSummaryPanel/PublicSummaryPanel';
import STYLES from './PublishedNumberDraw.scss';

const c = className => STYLES[className];

const PublishedNumberDraw = props => (
  <div>
    <div className={c('PublishedNumberDraw')}>
      <section className={c('PublishedNumberDraw__results-panel')}>
        <Typography variant="display2">{props.title}</Typography>
        <PublicResultsPanel>
          <Typography variant="display1">{props.t('chosen_numbers')}</Typography>
          <div>{props.results.map(result => <div>{result}</div>)}</div>
        </PublicResultsPanel>
      </section>
      <section className={c('PublishedNumberDraw__summary-panel')}>
        <PublicSummaryPanel>
          <div>
            <Typography variant="display1">{props.t('draw_details')}</Typography>
            <div>From: {props.from}</div>
            <div>To: {props.to}</div>
            <div>Number of results: {props.numberOfResults}</div>
            <div>Allow repeated: {props.allowRepeated}</div>
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

PublishedNumberDraw.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  from: PropTypes.number.isRequired,
  to: PropTypes.number.isRequired,
  numberOfResults: PropTypes.number.isRequired,
  allowRepeated: PropTypes.bool.isRequired,
  results: PropTypes.arrayOf(PropTypes.object),
  t: PropTypes.func.isRequired,
};

PublishedNumberDraw.defaultProps = {
  results: [],
};

export default translate('PublishedNumberDraw')(PublishedNumberDraw);
