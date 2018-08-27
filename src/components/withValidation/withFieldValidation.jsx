import React, { Component } from 'react';
import PropTypes from 'prop-types';

const VALID_RULES = ['required', 'oneOf', 'pattern', 'min'];

const validateValue = (value, validators) =>
  Object.entries(validators).every(rule => {
    switch (rule[0]) {
      case 'required':
        return Boolean(String(value).trim());
      case 'min':
        return value >= validators.min;
      case 'oneOf':
        return validators.oneOf.includes(value);
      case 'pattern':
        return new RegExp(validators.pattern).test(String(value));
      case 'validate':
        return validators.validate();
      default:
        return false;
    }
  });

const withFieldValidation = WrappedComponent => {
  class WithFieldValidation extends Component {
    componentDidMount() {
      const valid = this.validateWithProvider(this.props.value);
      this.context.registerValidatedField(this.props.name, valid, this.props.value);
    }

    componentDidUpdate(prevProps) {
      if (
        prevProps.value !== this.props.value ||
        this.validateWithProvider(this.props.value) !== this.validateWithProvider(prevProps.value)
      ) {
        const valid = this.validateWithProvider(this.props.value);
        this.context.updateFieldValidationState(this.props.name, valid);
        this.context.updateFieldChangedState(this.props.name);
      }
    }

    componentWillUnmount() {
      this.context.deregisterValidatedField(this.props.name);
    }

    onFieldChange = value => {
      if (this.props.onChange) {
        this.props.onChange(value);
      }
      const valid = this.validateWithProvider(value);
      this.context.onFieldChange(this.props.name, valid);
    };

    validateWithProvider(value) {
      return this.isValid(value);
    }

    isValid = value => {
      const rules = VALID_RULES.filter(rule => this.props.validators[rule]);
      // const rules = Object.keys()
      console.log('value, this.props', value, this.props.validators);
      return validateValue(value, this.props.validators);
    };

    render() {
      const { validators, ...props } = this.props;
      const valid = 'valid' in props ? props.valid : this.context.isFieldValid(this.props.name);
      return <WrappedComponent {...props} error={valid === false} onChange={this.onFieldChange} />;
    }
  }

  WithFieldValidation.propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.arrayOf(PropTypes.string),
    ]),
    name: PropTypes.string.isRequired,
    validators: PropTypes.arrayOf(
      PropTypes.shape({
        required: PropTypes.bool,
        pattern: PropTypes.string,
        oneOf: PropTypes.arrayOf(PropTypes.string),
        positiveNumber: PropTypes.bool,
        validate: PropTypes.func,
      }),
    ),
  };

  WithFieldValidation.defaultProps = {
    onChange: null,
    validators: {},
    value: '',
  };

  WithFieldValidation.contextTypes = {
    registerValidatedField: PropTypes.func.isRequired,
    deregisterValidatedField: PropTypes.func.isRequired,
    onFieldChange: PropTypes.func.isRequired,
    isFieldValid: PropTypes.func.isRequired,
    updateFieldValidationState: PropTypes.func.isRequired,
    updateFieldChangedState: PropTypes.func.isRequired,
  };

  return WithFieldValidation;
};

export default withFieldValidation;
