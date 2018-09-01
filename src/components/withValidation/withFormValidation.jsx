import React, { Component } from 'react';
import PropTypes from 'prop-types';

const withFormValidation = WrappedComponent => {
  class WithFormValidation extends Component {
    constructor(props) {
      super(props);
      this.state = {
        formSubmitted: false,
        validations: {},
        formError: 'the is an error',
        changedFields: [],
      };
    }

    getChildContext() {
      return {
        registerValidatedField: this.registerValidatedField.bind(this),
        deregisterValidatedField: this.deregisterValidatedField.bind(this),
        onFieldChange: this.onFieldChange.bind(this),
        getFieldErrors: this.getFieldErrors.bind(this),
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
      if (!this.isFormValid()) {
        e.preventDefault();
        this.setState({
          formSubmitted: true,
        });
      } else {
        this.props.onSubmit(e);
      }
    };

    onFieldChange = (name, valid) => {
      // TODO not sure why this is needed, remove if after a while doesn't cause problems
      // this.updateErrors(name, valid);
      // this.updateFieldChangedState(name);
    };

    getFieldErrors(name) {
      const { changedFields, validations, formSubmitted } = this.state;
      // return formSubmitted || changedFields.includes(name) ? validations[name] : undefined;  //don't rememeber why formSubmitted was needed here
      return changedFields.includes(name) ? validations[name] : undefined;
    }

    getFormError() {
      return this.state.formError;
    }

    isFormValid = () => {
      const validations = Object.values(this.state.validations);
      const fieldsValid = !validations.some(Boolean);
      const formValid = !this.state.formError;
      return fieldsValid && formValid;
    };

    registerValidatedField(name, valid, value) {
      this.updateErrors(name, valid);

      const isEmptyAtRegister = (Array.isArray(value) && !value.length) || value === '';
      if (!isEmptyAtRegister) {
        this.updateFieldChangedState(name);
      } else if (this.state.changedFields.indexOf(name) !== -1) {
        const changedFields = this.state.changedFields.slice();
        changedFields.splice(changedFields.indexOf(name));
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
        previousState => ({
          formError,
          validations: {
            ...previousState.validations,
            ...{
              [name]: errors,
            },
          },
        }),
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
          const validations = Object.assign({}, previousState.validations);
          delete validations[name];
          return {
            validations,
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
      const { onSubmit, onFieldDeregister, onValidationChange, ...props } = this.props;
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
    getFieldErrors: PropTypes.func,
    getFormError: PropTypes.func,
    updateErrors: PropTypes.func,
    updateFieldChangedState: PropTypes.func,
  };

  return WithFormValidation;
};

export default withFormValidation;
