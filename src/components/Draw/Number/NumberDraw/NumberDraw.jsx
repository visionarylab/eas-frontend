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

const NumberDraw = props => (
  <Grid container>
    <Helmet>
      <title>{props.t('random_number_default_title')}</title>
    </Helmet>
    <Grid item xs={6}>
      <Grid item sm={12}>
        <Typography variant="display1">{props.t('random_number_default_title')}</Typography>
        {props.public ? (
          <PublicDetails
            title={props.title}
            description={props.description}
            handleTitleChange={props.handleTitleChange}
            handleDescriptionChange={props.handleDescriptionChange}
          />
        ) : null}
        <NumberDrawForm
          from={props.from}
          to={props.to}
          numberOfResults={props.numberOfResults}
          allowRepeated={props.allowRepeated}
          handleFromChange={props.handleFromChange}
          handleToChange={props.handleToChange}
          handleAllowRepeatedChange={props.handleAllowRepeatedChange}
          handleNumberOfResultsChange={props.handleNumberOfResultsChange}
        />
        <Grid item xs={12}>
          {props.public ? (
            <PublishDrawOptions
              whenResultShown={props.whenResultShown}
              labelPublish={props.t('publish_draw')}
              dateScheduled={props.dateScheduled}
              handleScheduleDateChange={props.handleScheduleDateChange}
              handlePublish={props.handlePublish}
              handleWhenResultShown={props.handleWhenResultShown}
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
        <NumberDrawResults results={props.results} />
      </Grid>
    </Grid>
    <Grid item xs={6}>
      <Grid container spacing={16} direction="row" alignItems="center">
        <Grid item xs={10}>
          <Paper>{props.t('random_number_description')}</Paper>
        </Grid>
        <Grid item xs={10}>
          <MakeDrawPublicButton handleMakeDrawPublic={props.handleMakeDrawPublic} />
        </Grid>
      </Grid>
    </Grid>
  </Grid>
);

NumberDraw.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  from: PropTypes.number,
  to: PropTypes.number,
  results: PropTypes.arrayOf(PropTypes.number),
  numberOfResults: PropTypes.number,
  allowRepeated: PropTypes.bool,
  public: PropTypes.bool.isRequired,
  whenResultShown: PropTypes.string.isRequired,
  dateScheduled: PropTypes.string,
  handleTitleChange: PropTypes.func.isRequired,
  handleDescriptionChange: PropTypes.func.isRequired,
  handleFromChange: PropTypes.func.isRequired,
  handleToChange: PropTypes.func.isRequired,
  handleAllowRepeatedChange: PropTypes.func.isRequired,
  handleNumberOfResultsChange: PropTypes.func.isRequired,
  handleMakeDrawPublic: PropTypes.func.isRequired,
  handleToss: PropTypes.func.isRequired,
  handlePublish: PropTypes.func.isRequired,
  handleWhenResultShown: PropTypes.func.isRequired,
  handleScheduleDateChange: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

NumberDraw.defaultProps = {
  title: '',
  description: '',
  from: 1,
  to: 10,
  results: [],
  numberOfResults: 1,
  allowRepeated: false,
  dateScheduled: Date(),
};

export default translate('NumberDraw')(NumberDraw);
