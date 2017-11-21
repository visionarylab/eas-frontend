import React from 'react';
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import { FormGroup, FormControlLabel } from 'material-ui/Form';
import Checkbox from 'material-ui/Checkbox';
import Icon from 'material-ui/Icon';


import { tossNumberDraw } from '../../../services/EasAPI';

class Number extends React.Component {
  constructor (props) {
    super(props);

    this.handleToss = this.handleToss.bind(this);
    this.handleFromChange = this.handleFromChange.bind(this);
    this.handleToChange = this.handleToChange.bind(this);
    this.handleNumberOfResultsChange = this.handleNumberOfResultsChange.bind(this);
    this.handleAllowRepeatedChange = this.handleAllowRepeatedChange.bind(this);

    this.state = {
      results: null,
      from: props.from,
      to: props.to,
      numberOfResults: props.numberOfResults,
      allowRepeated: props.allowRepeated,
    }
  }

  handleToss() {
    const {from, to, numberOfResults, allowRepeated} = this.state;
    const results = tossNumberDraw(from, to, numberOfResults, allowRepeated);
    this.setState({
      results: results,
    });
  }

  handleFromChange(event) {
    this.setState({
      from: parseInt(event.target.value),
    });
  }

  handleToChange(event) {
    this.setState({
      to: parseInt(event.target.value),
    });
  }

  handleNumberOfResultsChange(event) {
    this.setState({
      numberOfResults: parseInt(event.target.value),
    });
  }

  handleAllowRepeatedChange(event) {
    this.setState({
      allowRepeated: event.target.checked,
    });
  }

  render() {
    return (
      <Grid container justify="center">
          {/* Add this arrow in the left side of the form to go back (change color and size) */}
          <Icon>keyboard_arrow_left</Icon>
        <Grid item sm={8}>

          <Typography type="display1">Generate random numbers</Typography>
          <Grid item sm={12}>
            <TextField
              label="From"
              placeholder="1"
              margin="normal"
              onChange={this.handleFromChange}
              value={this.state.from}
              type="number"
            />
            <TextField
              label="To"
              placeholder="9"
              margin="normal"
              onChange={this.handleToChange}
              value={this.state.to}
              type="number"
            />
          </Grid>
          <Grid item sm={12}>
            <TextField
              label="Number of results"
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
              label="Allow repeated"
            />
          </FormGroup>
          <Grid item xs={12}>
            <Button raised color="primary" onClick={this.handleToss} >
              Toss
            </Button>
          </Grid>
        </Grid>
        <Grid item sm={8}>
          {this.state.results}
        </Grid>
      </Grid>
    );
  }
}

Number.propTypes = {
  from: PropTypes.number,
  to: PropTypes.number,
  results: PropTypes.array,
  numberOfResults: PropTypes.number,
  allowRepeated: PropTypes.bool,
};

Number.defaultProps = {
  from: 1,
  to: 10,
  results: [],
  numberOfResults: 1,
  allowRepeated: false,
};

export default Number;
