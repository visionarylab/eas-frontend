import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { translate } from 'react-i18next';
import classNames from 'classnames/bind';

import PublicResultsPanel from '../../PublicResultsPanel/PublicResultsPanel';
import PublicSummaryPanel from '../../PublicSummaryPanel/PublicSummaryPanel';
import Page from '../../Page/Page';
import PublicDrawContent from '../../PublicDrawContent/PublicDrawContent';
import STYLES from './PublishedRandomNumberPage.scss';

const c = classNames.bind(STYLES);

const PublishedRandomNumberPage = props => {
  const { results } = props;
  return (
    <Page htmlTitle={props.title} className={c('PublishedRandomNumberPage')}>
      <PublicDrawContent>
        <Typography variant="display2">{props.title}</Typography>
        {results.length ? null : null}
        <section className={c('PublishedRandomNumberPage__results-panel')}>
          <PublicResultsPanel>
            <Typography variant="display1">{props.t('chosen_numbers')}</Typography>
            <div>{props.results.map(result => <div>{result}</div>)}</div>
          </PublicResultsPanel>
        </section>
        <section className={c('PublishedRandomNumberPage__summary-panel')}>
          <PublicSummaryPanel>
            <div>
              <Typography variant="display1">{props.t('draw_details')}</Typography>
              <div>From: {props.rangeMin}</div>
              <div>To: {props.rangeMax}</div>
              <div>Number of results: {props.numberOfResults}</div>
              <div>Allow repeated: {props.allowRepeated}</div>
              <div>
                Descripcion:
                <p>{props.description}</p>
              </div>
            </div>
          </PublicSummaryPanel>
        </section>
      </PublicDrawContent>
    </Page>
  );
};

PublishedRandomNumberPage.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  rangeMin: PropTypes.number,
  rangeMax: PropTypes.number,
  numberOfResults: PropTypes.number,
  allowRepeated: PropTypes.bool,
  results: PropTypes.arrayOf(PropTypes.object),
  t: PropTypes.func.isRequired,
};

PublishedRandomNumberPage.defaultProps = {
  title: '',
  description: '',
  rangeMin: null,
  rangeMax: null,
  numberOfResults: null,
  allowRepeated: null,
  results: [],
};

export default translate('PublishedRandomNumberPage')(PublishedRandomNumberPage);
