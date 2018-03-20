import React from 'react';
import { translate } from 'react-translate';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';

import { getNumberDraw } from '../../../services/EasAPI';
import NumberDrawResults from './NumberDrawResults/NumberDrawResults';

class NumberDisplay extends React.Component {
  constructor(props) {
    super(props);

    this.state = getNumberDraw(this.props.match.params.drawId);
  }

  render() {
    return (
      <Grid container>
        <Helmet>
          <title>{this.state.title}</title>
        </Helmet>
        <Grid item xs={6}>
          <Grid item sm={12}>
            <Typography variant="display1">{this.state.title}</Typography>
            <div>
              {this.props.t('setup_description', {
                numberOfResults: this.state.numberOfResults,
                from: this.state.from,
                to: this.state.to,
              })}
              {this.state.allowRepeated
                ? this.props.t('repeated_results_allowed')
                : this.props.t('repeated_results_not_allowed')}
            </div>
          </Grid>
          <Grid item sm={12}>
            <NumberDrawResults results={this.props.results} />
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <Grid container spacing={16} direction="row" alignItems="center">
            <Grid item xs={10}>
              chat here
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

NumberDisplay.propTypes = {
  t: PropTypes.func.isRequired,
  results: PropTypes.arrayOf(PropTypes.number),
  match: PropTypes.shape({
    params: PropTypes.shape({
      drawId: PropTypes.string,
    }),
  }).isRequired,
};

NumberDisplay.defaultProps = {
  results: [],
};

export default translate('NumberDisplay')(NumberDisplay);