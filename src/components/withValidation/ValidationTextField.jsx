import React from 'react';
import TextField from '@material-ui/core/TextField';

import withFieldValidation from './withFieldValidation';

const ValidatedTextField = props => <TextField {...props} />;

ValidatedTextField.propTypes = {};

export default withFieldValidation(ValidatedTextField);
