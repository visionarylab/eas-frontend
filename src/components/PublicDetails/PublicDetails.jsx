import React, { Fragment } from 'react';
import { translate } from 'react-i18next';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';

import withFieldValidation from '../withValidation/withFieldValidation';

const ValidatedTextField = withFieldValidation(TextField);

const PublicDetails = props => (
  <Fragment>
    <ValidatedTextField
      name="title"
      label={props.t('title_label')}
      placeholder={props.t('title_placeholder')}
      value={props.title}
      margin="normal"
      fullWidth
      onChange={e => props.onFieldChange('title', e.target.value)}
      data-component={'PublicDetails__title-field'}
      inputProps={{ 'data-component': 'PublicDetails__title-field-input' }}
      validators={[{ rule: 'required' }]}
    />

    <ValidatedTextField
      name="description"
      label={props.t('description_label')}
      placeholder={props.t('description_placeholder')}
      value={props.description}
      fullWidth
      multiline
      rows="4"
      margin="normal"
      onChange={e => props.onFieldChange('description', e.target.value)}
      data-component={'PublicDetails__description-field'}
      inputProps={{ 'data-component': 'PublicDetails__description-field-input' }}
      validators={[{ rule: 'required' }]}
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
