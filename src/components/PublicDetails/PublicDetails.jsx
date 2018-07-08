import React, { Fragment } from 'react';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';

const PublicDetails = props => (
  <Fragment>
    <TextField
      label={props.t('title_label')}
      placeholder={props.t('title_placeholder')}
      value={props.title}
      margin="normal"
      fullWidth
      onChange={e => props.onFieldChange('title', e.target.value)}
      inputProps={{ 'data-component': 'TitleInput' }}
    />
    <TextField
      label={props.t('description_label')}
      placeholder={props.t('description_placeholder')}
      value={props.description}
      fullWidth
      multiline
      rows="4"
      margin="normal"
      onChange={e => props.onFieldChange('description', e.target.value)}
      inputProps={{ 'data-component': 'DescriptionInput' }}
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
