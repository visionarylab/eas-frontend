import React from 'react';
import { translate } from 'react-translate';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Public from 'material-ui-icons/Public';
import { FormGroup, FormControlLabel } from 'material-ui/Form';
import Checkbox from 'material-ui/Checkbox';

import STYLES from './Number.scss';

import { tossNumberDraw } from '../../../services/EasAPI';

class Number extends React.Component {
  constructor(props) {
    super(props);

    this.handleToss = this.handleToss.bind(this);
    this.handleFromChange = this.handleFromChange.bind(this);
    this.handleToChange = this.handleToChange.bind(this);
    this.handleNumberOfResultsChange = this.handleNumberOfResultsChange.bind(this);
    this.handleAllowRepeatedChange = this.handleAllowRepeatedChange.bind(this);

    this.state = {
      from: props.from,
      to: props.to,
      numberOfResults: props.numberOfResults,
      allowRepeated: props.allowRepeated,
      results: props.results,
    };
  }

  handleToss() {
    const { from, to, numberOfResults, allowRepeated } = this.state;
    const results = tossNumberDraw(from, to, numberOfResults, allowRepeated);
    this.setState({
      results,
    });
  }

  handleFromChange(event) {
    this.setState({
      from: parseInt(event.target.value, 10),
    });
  }

  handleToChange(event) {
    this.setState({
      to: parseInt(event.target.value, 10),
    });
  }

  handleNumberOfResultsChange(event) {
    this.setState({
      numberOfResults: parseInt(event.target.value, 10),
    });
  }

  handleAllowRepeatedChange(event) {
    this.setState({
      allowRepeated: event.target.checked,
    });
  }

  render() {
    return (
      <Grid container className={STYLES.Number}>
        <Helmet>
          <title>{this.props.t('random_number_default_title')}</title>
        </Helmet>
        <Grid item xs={8}>
          <Grid item sm={12}>
            <Typography type="display1">{this.props.t('random_number_default_title')}</Typography>
            <Grid item sm={12}>
              <TextField
                label={this.props.t('from')}
                placeholder="1"
                margin="normal"
                onChange={this.handleFromChange}
                value={this.state.from}
                type="number"
              />
              <TextField
                label={this.props.t('to')}
                placeholder="9"
                margin="normal"
                onChange={this.handleToChange}
                value={this.state.to}
                type="number"
              />
            </Grid>
            <Grid item sm={12}>
              <TextField
                label={this.props.t('number_of_results')}
                placeholder="1"
                margin="normal"
                onChange={this.handleNumberOfResultsChange}
                value={this.state.numberOfResults}
                type="number"
              />
            </Grid>
            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.state.allowRepeated}
                    onChange={this.handleAllowRepeatedChange}
                  />
                }
                label={this.props.t('allow_repeated')}
              />
            </FormGroup>
            <Grid item xs={12}>
              <Button raised color="primary" onClick={this.handleToss} >
                {this.props.t('generate_numbers')}
              </Button>
            </Grid>
          </Grid>
          <Grid item sm={12}>
            <span className={STYLES.Number__result}>{this.state.results}</span>
          </Grid>
        </Grid>
        <Grid item xs={4}>
          <Grid container spacing={16} direction="row" alignItems="center">
            <Grid item xs={10}>
              <Paper>{this.props.t('random_number_description')}</Paper>
            </Grid>
            <Grid item xs={10}>
              <Button raised color="primary">
                {this.props.t('make_public')}
                <Public />
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

Number.propTypes = {
  from: PropTypes.number,
  to: PropTypes.number,
  results: PropTypes.arrayOf(PropTypes.number),
  numberOfResults: PropTypes.number,
  allowRepeated: PropTypes.bool,
  t: PropTypes.func.isRequired,
};

Number.defaultProps = {
  from: 1,
  to: 10,
  results: [],
  numberOfResults: 1,
  allowRepeated: false,
};

export default translate('Number')(Number);
