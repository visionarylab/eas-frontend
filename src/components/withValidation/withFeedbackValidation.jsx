import React, { Component } from 'react';
import PropTypes from 'prop-types';

const withFeedbackValidation = WrappedComponent => {
  class WithFeedbackValidation extends Component {
    render() {
      const error = this.context.getFormError();
      console.log('error', error);
      return <WrappedComponent error={error} />;
    }
  }

  WithFeedbackValidation.contextTypes = {
    // registerValidatedField: PropTypes.func.isRequired,
    // deregisterValidatedField: PropTypes.func.isRequired,
    // onFieldChange: PropTypes.func.isRequired,
    getFormError: PropTypes.func.isRequired,
    // updateErrors: PropTypes.func.isRequired,
    // updateFieldChangedState: PropTypes.func.isRequired,
  };

  return WithFeedbackValidation;
};

export default withFeedbackValidation;
