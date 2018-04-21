import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import Grid from 'material-ui/Grid';
import TextField from 'material-ui/TextField';
import { FormGroup, FormControlLabel } from 'material-ui/Form';
import Checkbox from 'material-ui/Checkbox';

const NumberDrawForm = props => (
  <div>
    <Grid item sm={12}>
      <TextField
        id="from"
        name="from"
        label={props.t('from')}
        placeholder="1"
        margin="normal"
        onChange={props.onFieldChange}
        value={props.from}
        type="number"
      />
      <TextField
        name="to"
        label={props.t('to')}
        placeholder="9"
        margin="normal"
        onChange={props.onFieldChange}
        value={props.to}
        type="number"
      />
    </Grid>
    <Grid item sm={12}>
      <TextField
        name="numberOfResults"
        label={props.t('number_of_results')}
        placeholder="1"
        margin="normal"
        onChange={props.onFieldChange}
        value={props.numberOfResults}
        type="number"
      />
    </Grid>
    {props.numberOfResults > 1 ? (
      <FormGroup row>
        <FormControlLabel
          control={
            <Checkbox
              name="allowRepeated"
              checked={props.allowRepeated}
              onChange={props.onFieldChange}
            />
          }
          label={props.t('allow_repeated')}
        />
      </FormGroup>
    ) : (
      ''
    )}
  </div>
);

NumberDrawForm.propTypes = {
  from: PropTypes.number.isRequired,
  to: PropTypes.number.isRequired,
  numberOfResults: PropTypes.number.isRequired,
  allowRepeated: PropTypes.bool.isRequired,
  onFieldChange: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

export default translate('NumberDrawForm')(NumberDrawForm);
