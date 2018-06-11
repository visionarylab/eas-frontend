import React, { Fragment } from 'react';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';

const PublicDetails = props => (
  <Fragment>
    <TextField
      label={props.t('title_label')}
      placeholder={props.t('title_placeholder')}
      margin="normal"
      onChange={e => props.onFieldChange('title', e.target.value)}
      value={props.title}
      fullWidth
      type="text"
    />
    <TextField
      label={props.t('description_label')}
      onChange={e => props.onFieldChange('description', e.target.value)}
      multiline
      fullWidth
      rows="4"
      placeholder={props.t('description_placeholder')}
      value={props.description}
      margin="normal"
    />
  </Fragment>
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
