import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-translate';
import Grid from 'material-ui/Grid';
import TextField from 'material-ui/TextField';
import { FormGroup, FormControlLabel } from 'material-ui/Form';
import Checkbox from 'material-ui/Checkbox';

const NumberDrawForm = props => (
  <div>
    <Grid item sm={12}>
      <TextField
        label={props.t('from')}
        placeholder="1"
        margin="normal"
        onChange={props.handleFromChange}
        value={props.from}
        type="number"
      />
      <TextField
        label={props.t('to')}
        placeholder="9"
        margin="normal"
        onChange={props.handleToChange}
        value={props.to}
        type="number"
      />
    </Grid>
    <Grid item sm={12}>
      <TextField
        label={props.t('number_of_results')}
        placeholder="1"
        margin="normal"
        onChange={props.handleNumberOfResultsChange}
        value={props.numberOfResults}
        type="number"
      />
    </Grid>
    <FormGroup row>
      <FormControlLabel
        control={
          <Checkbox checked={props.allowRepeated} onChange={props.handleAllowRepeatedChange} />
        }
        label={props.t('allow_repeated')}
      />
    </FormGroup>
  </div>
);

NumberDrawForm.propTypes = {
  from: PropTypes.number.isRequired,
  to: PropTypes.number.isRequired,
  numberOfResults: PropTypes.number.isRequired,
  allowRepeated: PropTypes.bool.isRequired,
  handleFromChange: PropTypes.func.isRequired,
  handleToChange: PropTypes.func.isRequired,
  handleNumberOfResultsChange: PropTypes.func.isRequired,
  handleAllowRepeatedChange: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

export default translate('NumberDrawForm')(NumberDrawForm);
