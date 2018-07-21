import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';

import withFieldValidation from './withFieldValidation';

const ValidatedTextField = props => <TextField {...props} />;

ValidatedTextField.propTypes = {};

export default withFieldValidation(ValidatedTextField);
