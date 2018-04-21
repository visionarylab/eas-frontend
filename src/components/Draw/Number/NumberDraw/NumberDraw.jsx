import React from 'react';
import { translate } from 'react-translate';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import PublicDetails from '../../../PublicDetails/PublicDetails';
import MakeDrawPublicButton from '../../../MakeDrawPublicButton/MakeDrawPublicButton';
import NumberDrawForm from '../NumberDrawForm/NumberDrawForm';
import NumberDrawResults from '../NumberDrawResults/NumberDrawResults';
import GenerateResultsButton from '../../../GenerateResultsButton/GenerateResultsButton';
import PublishDrawOptions from '../../../PublishDrawOptions/PublishDrawOptions';
import DrawPanel from '../../../DrawPanel/DrawPanel';

const NumberDraw = props => {
  const {
    title,
    description,
    from,
    to,
    allowRepeated,
    numberOfResults,
    dateScheduled,
    isPublic,
    results,
  } = props.values;
  return (
    <Grid container>
      <Helmet>
        <title>{props.t('random_number_html_title')}</title>
      </Helmet>
      <Grid item xs={6}>
        <DrawPanel>
          <Grid item sm={12}>
            <Typography variant="display1">{props.t('random_number_default_title')}</Typography>
            {isPublic ? (
              <PublicDetails
                title={title}
                description={description}
                onFieldChange={props.onFieldChange}
              />
            ) : null}
            <NumberDrawForm
              from={from}
              to={to}
              numberOfResults={numberOfResults}
              allowRepeated={allowRepeated}
              onFieldChange={props.onFieldChange}
            />
            <Grid item xs={12}>
              {isPublic ? (
                <PublishDrawOptions
                  labelPublish={props.t('publish_draw')}
                  dateScheduled={dateScheduled}
                  handlePublish={props.handlePublish}
                  onFieldChange={props.onFieldChange}
                />
              ) : (
                <GenerateResultsButton
                  label={props.t('generate_numbers')}
                  handleToss={props.handleToss}
                />
              )}
            </Grid>
          </Grid>
          <Grid item sm={12}>
            <NumberDrawResults results={results} />
          </Grid>
        </DrawPanel>
      </Grid>

      <Grid item xs={6}>
        <Grid container spacing={16} direction="row" alignItems="center">
          <Grid item xs={10}>
            <Paper>{props.t('random_number_seo_description')}</Paper>
          </Grid>
          <Grid item xs={10}>
            <MakeDrawPublicButton handleMakeDrawPublic={props.handleMakeDrawPublic} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

NumberDraw.propTypes = {
  values: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    from: PropTypes.number,
    to: PropTypes.number,
    results: PropTypes.arrayOf(PropTypes.number),
    numberOfResults: PropTypes.number,
    allowRepeated: PropTypes.bool,
    isPublic: PropTypes.bool.isRequired,
    dateScheduled: PropTypes.string,
  }).isRequired,
  handleMakeDrawPublic: PropTypes.func.isRequired,
  handleToss: PropTypes.func.isRequired,
  handlePublish: PropTypes.func.isRequired,
  onFieldChange: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

NumberDraw.defaultProps = {
  values: {
    title: '',
    description: '',
    from: 1,
    to: 10,
    results: [],
    numberOfResults: 1,
    allowRepeated: false,
    dateScheduled: null,
  },
};

export default translate('NumberDraw')(NumberDraw);
