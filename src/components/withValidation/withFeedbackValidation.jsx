import React from 'react';
import PropTypes from 'prop-types';

const withFeedbackValidation = WrappedComponent => {
  const WithFeedbackValidation = (props, context) => {
    const error = context.getFormError();
    return <WrappedComponent error={error} />;
  };

  WithFeedbackValidation.contextTypes = {
    getFormError: PropTypes.func.isRequired,
  };

  return WithFeedbackValidation;
};

export default withFeedbackValidation;
