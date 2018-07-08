import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { translate } from 'react-i18next';

import PublicResultsPanel from '../../PublicResultsPanel/PublicResultsPanel';
import PublicSummaryPanel from '../../PublicSummaryPanel/PublicSummaryPanel';
import Page from '../../Page/Page';
import PublicDrawContent from '../../PublicDrawContent/PublicDrawContent';
import ResultsNotGeneratedYet from '../../ResultsNotGeneratedYet/ResultsNotGeneratedYet';

const PublishedRandomNumberPage = props => {
  const { title, results } = props;
  return (
    <Page htmlTitle={props.title} noIndex>
      <PublicDrawContent>
        <Typography variant="display2" data-component={'PublishedRandomNumberPage__Title'}>
          {title}
        </Typography>
        {results.length ? (
          <PublicResultsPanel>
            <Typography variant="display1">{props.t('chosen_numbers')}</Typography>
            {props.results.map(result => <div>{result}</div>)}
          </PublicResultsPanel>
        ) : (
          <ResultsNotGeneratedYet />
        )}
        <PublicSummaryPanel>
          <Typography variant="display1">{props.t('draw_details')}</Typography>
          <div>From: {props.rangeMin}</div>
          <div>To: {props.rangeMax}</div>
          <div>Number of results: {props.numberOfResults}</div>
          <div>Allow repeated: {props.allowRepeated}</div>
          <div>
            Descripcion:
            <p>{props.description}</p>
          </div>
        </PublicSummaryPanel>
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
