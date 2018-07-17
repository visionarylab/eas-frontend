import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { translate } from 'react-i18next';

import Page from '../../Page/Page';
import DrawContent from '../../DrawContent/DrawContent';
import ResultsBox from '../../ResultsBox/ResultsBox';
import ResultsNotGeneratedYet from '../../ResultsNotGeneratedYet/ResultsNotGeneratedYet';

const SummaryRaffle = ({ rangeMin, rangeMax, description, t }) => (
  <Grid container spacing={16} direction={'row'} justify={'center'}>
    <Grid item>
      <div>
        <Typography variant="display1">{t('draw_details')}</Typography>
        <div>
          {t('From')} {rangeMin}
        </div>
        <div>
          {t('To')} {rangeMax}
        </div>
        <div>
          {t('description')}
          <p>{description}</p>
        </div>
      </div>
    </Grid>
  </Grid>
);

const PublishedRandomNumberPage = props => {
  const { title, results } = props;
  return (
    <Page htmlTitle={title} noIndex>
      <Grid container direction={'row'} justify={'center'}>
        <Grid item sm={10}>
          <DrawContent title={title} footer={<SummaryRaffle {...props} />}>
            {results.length ? (
              <Grid container direction={'row'} justify={'center'}>
                <Grid item sm={6}>
                  <ResultsBox title={props.t('generated_numbers')}>
                    {props.results.map(result => (
                      <Typography variant="display3" component={'p'}>
                        {result}
                      </Typography>
                    ))}
                  </ResultsBox>
                </Grid>
              </Grid>
            ) : (
              <ResultsNotGeneratedYet />
            )}
          </DrawContent>
        </Grid>
      </Grid>
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
