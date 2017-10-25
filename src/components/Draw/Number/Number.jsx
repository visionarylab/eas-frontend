import React from 'react';
import Grid from 'material-ui/Grid';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';

const Number = () => {
  return (
    <Grid container justify="center">
      <Grid item sm={8}>
        <Typography type="display1">Generate a random number</Typography>
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
    </Grid>
  );
};

export default Number;
