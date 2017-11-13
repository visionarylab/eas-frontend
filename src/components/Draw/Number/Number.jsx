import React from 'react';
import Grid from 'material-ui/Grid';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import { tossDraw } from '../../../services/EasAPI';

class Number extends React.Component {
  constructor (props) {
    super(props);

    this.handleToss = this.handleToss.bind(this);

    this.state = {
      result: null,
    }
  }

  handleToss() {
    const result = tossDraw();
    console.log(result);
    this.setState({
      result: result,
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
            />
            <TextField
              label="To"
              placeholder="9"
              margin="normal"
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
