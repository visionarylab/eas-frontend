import React, { Fragment } from 'react';
import { translate } from 'react-i18next';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';

import withFieldValidation from '../withValidation/withFieldValidation.jsx';

const ValidatedTextField = withFieldValidation(TextField);

const PublicDetails = ({ title, titleRequired, description, onFieldChange, t }) => (
  <Fragment>
    <ValidatedTextField
      name="title"
      label={t('title_label')}
      placeholder={t('title_placeholder')}
      value={title}
      margin="normal"
      fullWidth
      required={titleRequired}
      validators={titleRequired ? [{ rule: 'required' }] : []}
      onChange={e => onFieldChange('title', e.target.value)}
      data-component="PublicDetails__title-field"
      inputProps={{ 'data-component': 'PublicDetails__title-field-input' }}
    />

    <ValidatedTextField
      name="description"
      label={t('description_label')}
      placeholder={t('description_placeholder')}
      value={description}
      fullWidth
      multiline
      rows="4"
      margin="normal"
      onChange={e => onFieldChange('description', e.target.value)}
      data-component="PublicDetails__description-field"
      inputProps={{ 'data-component': 'PublicDetails__description-field-input' }}
    />
  </Fragment>
);

PublicDetails.propTypes = {
  title: PropTypes.string,
  titleRequired: PropTypes.bool,
  description: PropTypes.string,
  onFieldChange: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

PublicDetails.defaultProps = {
  title: '',
  description: '',
  titleRequired: false,
};

export default translate('PublicDetails')(PublicDetails);
