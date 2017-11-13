import React from 'react';
import Grid from 'material-ui/Grid';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import { tossNumberDraw } from '../../../services/EasAPI';

class Number extends React.Component {
  constructor (props) {
    super(props);

    this.handleToss = this.handleToss.bind(this);
    this.handleFromChange = this.handleFromChange.bind(this);
    this.handleToChange = this.handleToChange.bind(this);

    this.state = {
      result: null,
      from: 2,
      to: 5,
    }
  }

  handleToss() {
    const {from, to} = this.state;
    const result = tossNumberDraw(from, to);
    this.setState({
      result: result,
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

  render() {
    return (
      <Grid container justify="center">
        <Grid item sm={8}>
          <Typography type="display1">Generate a random number</Typography>
          <Grid item sm={12}>
            <TextField
              label="From"
              placeholder="1"
              margin="normal"
              onChange={this.handleFromChange}
              value={this.state.from}
            />
            <TextField
              label="To"
              placeholder="9"
              margin="normal"
              onChange={this.handleToChange}
              value={this.state.to}
            />
          </Grid>
          <Grid item xs={12}>
            <Button raised color="primary" onClick={this.handleToss} >
              Toss
            </Button>
          </Grid>
        </Grid>
        <Grid item sm={8}>
          {this.state.result}
        </Grid>
      </Grid>
    );
  }
}

export default Number;
