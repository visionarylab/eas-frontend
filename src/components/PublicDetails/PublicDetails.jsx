import React from 'react';
import Grid from 'material-ui/Grid';
import TextField from 'material-ui/TextField';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';

const PublicDetails = props => (
  <Grid item sm={12}>
    <TextField
      name="publicTitle"
      label={props.t('title_label')}
      placeholder={props.t('title_placeholder')}
      margin="normal"
      onChange={props.onFieldChange}
      value={props.title}
      fullWidth
      type="text"
    />
    <TextField
      name="publicDescription"
      label={props.t('description_label')}
      onChange={props.onFieldChange}
      multiline
      fullWidth
      rows="4"
      placeholder={props.t('description_placeholder')}
      value={props.description}
      margin="normal"
    />
  </Grid>
);

PublicDetails.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  onFieldChange: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

PublicDetails.defaultProps = {
  title: '',
  description: '',
};

export default translate('PublicDetails')(PublicDetails);
