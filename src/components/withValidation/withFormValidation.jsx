import React, { Component } from 'react';
import PropTypes from 'prop-types';

const withFormValidation = WrappedComponent => {
  class WithFormValidation extends Component {
    constructor(props) {
      super(props);
      this.state = {
        formSubmitted: false,
        validations: {},
        changedFields: [],
      };
    }

    getChildContext() {
      return {
        registerValidatedField: this.registerValidatedField.bind(this),
        deregisterValidatedField: this.deregisterValidatedField.bind(this),
        onFieldChange: this.onFieldChange.bind(this),
        getFieldErrors: this.getFieldErrors.bind(this),
        updateFieldValidationState: this.updateFieldValidationState.bind(this),
        updateFieldChangedState: this.updateFieldChangedState.bind(this),
      };
    }

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
      // this.updateFieldValidationState(name, valid);
      // this.updateFieldChangedState(name);
    };

    getFieldErrors(name) {
      const { changedFields, validations, formSubmitted } = this.state;
      return formSubmitted || changedFields.includes(name) ? validations[name] : undefined;
    }

    isFormValid = () => {
      const validations = Object.values(this.state.validations);
      return !validations.some(Boolean);
    };

    registerValidatedField(name, valid, value) {
      this.updateFieldValidationState(name, valid);

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

    updateFieldValidationState(name, valid) {
      this.setState(
        previousState => ({
          validations: {
            ...previousState.validations,
            ...{
              [name]: valid,
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
  };

  WithFormValidation.defaultProps = {
    onFieldDeregister: null,
    onValidationChange: null,
  };

  WithFormValidation.childContextTypes = {
    registerValidatedField: PropTypes.func,
    deregisterValidatedField: PropTypes.func,
    onFieldChange: PropTypes.func,
    getFieldErrors: PropTypes.func,
    updateFieldValidationState: PropTypes.func,
    updateFieldChangedState: PropTypes.func,
  };

  return WithFormValidation;
};

export default withFormValidation;
