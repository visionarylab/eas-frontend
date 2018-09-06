import React, { Component } from 'react';
import PropTypes from 'prop-types';

const withFormValidation = WrappedComponent => {
  class WithFormValidation extends Component {
    constructor(props) {
      super(props);
      this.state = {
        formSubmitted: false,
        fieldErrors: {},
        formError: 'the is an error',
        changedFields: [],
      };
    }

    getChildContext() {
      return {
        registerValidatedField: this.registerValidatedField.bind(this),
        deregisterValidatedField: this.deregisterValidatedField.bind(this),
        onFieldChange: this.onFieldChange.bind(this),
        getErrorsToRenderInField: this.getErrorsToRenderInField.bind(this),
        getFormError: this.getFormError.bind(this),
        updateErrors: this.updateErrors.bind(this),
        updateFieldChangedState: this.updateFieldChangedState.bind(this),
      };
    }

    componentDidUpdate = (previousProps, previousState) => {
      // Check global form errors
      const formError = this.props.checkErrors();
      if (previousState.formError !== formError) {
        this.setState({
          formError,
        });
      }
    };

    onSubmit = e => {
      console.log('this.isFormValid()', this.isFormValid());
      if (!this.isFormValid()) {
        e.preventDefault();
        this.setState({
          formSubmitted: true,
        });
      } else {
        this.props.onSubmit(e);
      }
    };

    // eslint-disable-next-line no-unused-vars
    onFieldChange = (name, valid) => {
      // TODO not sure why this is needed, remove if after a while doesn't cause problems
      // this.updateErrors(name, valid);
      // this.updateFieldChangedState(name);
    };

    getErrorsToRenderInField(name) {
      const { changedFields, fieldErrors, formSubmitted } = this.state; // eslint-disable-line no-unused-vars
      // return formSubmitted || changedFields.includes(name) ? fieldErrors[name] : undefined;  //don't rememeber why formSubmitted was needed here
      return changedFields.includes(name) ? fieldErrors[name] : undefined;
    }

    getFormError() {
      return this.state.formError;
    }

    isFormValid = () => {
      const fieldErrors = Object.values(this.state.fieldErrors);
      const fieldsValid = !fieldErrors.some(Boolean);
      const formValid = !this.state.formError;
      return fieldsValid && formValid;
    };

    registerValidatedField(name, errors, value) {
      this.updateErrors(name, errors);
      const isEmptyAtRegister = (Array.isArray(value) && !value.length) || value === '';
      if (!isEmptyAtRegister) {
        this.updateFieldChangedState(name);
      } else if (this.state.changedFields.indexOf(name) !== -1) {
        const changedFields = this.state.changedFields.slice();
        changedFields.splice(changedFields.indexOf(name), 1);
        this.setState({
          changedFields,
        });
      }
    }

    updateFieldChangedState(name) {
      if (!this.state.changedFields.includes(name)) {
        const changedFields = this.state.changedFields.slice();
        changedFields.push(name);
        this.setState(() => ({
          changedFields,
        }));
      }
    }

    updateErrors(name, errors) {
      const formError = this.props.checkErrors();
      this.setState(
        previousState => {
          let fieldErrors;
          if (errors) {
            // Add the error to the state
            fieldErrors = {
              ...previousState.fieldErrors,
              [name]: errors,
            };
          } else {
            // Remove the error from the state
            const { [name]: value, ...restFieldErrors } = previousState.fieldErrors;
            fieldErrors = restFieldErrors;
          }
          return {
            formError,
            fieldErrors,
          };
        },
        () => {
          this.triggerValidationChange();
        },
      );
    }

    triggerValidationChange = () => {
      if (this.props.onValidationChange) {
        const isValid = this.isFormValid();
        this.props.onValidationChange(isValid);
      }
    };

    deregisterValidatedField(name) {
      this.setState(
        previousState => {
          const fieldErrors = Object.assign({}, previousState.fieldErrors);
          delete fieldErrors[name];
          return {
            fieldErrors,
          };
        },
        () => {
          if (this.props.onFieldDeregister) {
            this.props.onFieldDeregister(name);
          }
          this.triggerValidationChange();
        },
      );
    }

    render() {
      const { onSubmit, onFieldDeregister, onValidationChange, checkErrors, ...props } = this.props;
      return <WrappedComponent {...props} onSubmit={this.onSubmit} />;
    }
  }

  WithFormValidation.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onFieldDeregister: PropTypes.func,
    onValidationChange: PropTypes.func,
    checkErrors: PropTypes.func,
  };

  WithFormValidation.defaultProps = {
    onFieldDeregister: null,
    onValidationChange: null,
    checkErrors: () => {},
  };

  WithFormValidation.childContextTypes = {
    registerValidatedField: PropTypes.func,
    deregisterValidatedField: PropTypes.func,
    onFieldChange: PropTypes.func,
    getErrorsToRenderInField: PropTypes.func,
    getFormError: PropTypes.func,
    updateErrors: PropTypes.func,
    updateFieldChangedState: PropTypes.func,
  };

  return WithFormValidation;
};

export default withFormValidation;
