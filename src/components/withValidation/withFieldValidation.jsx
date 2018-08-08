import React, { Component } from 'react';
import PropTypes from 'prop-types';

const VALID_RULES = ['required', 'oneOf', 'pattern'];

const validateValue = (rules, value, props) =>
  rules.every(rule => {
    switch (rule) {
      case 'required':
        return Boolean(String(value).trim());
      case 'oneOf':
        return props.oneOf.includes(value);
      case 'pattern':
        return new RegExp(props.pattern).test(String(value));
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
      return (this.props.validate || this.isValid)(value);
    }

    isValid = value => {
      const rules = VALID_RULES.filter(rule => this.props[rule]);
      return validateValue(rules, value, this.props);
    };

    render() {
      const { required, oneOf, pattern, validate, ...props } = this.props;
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
    required: PropTypes.bool,
    pattern: PropTypes.string,
    oneOf: PropTypes.arrayOf(PropTypes.string),
    validate: PropTypes.func,
  };

  WithFieldValidation.defaultProps = {
    onChange: null,
    value: '',
    required: false,
    oneOf: null,
    pattern: '',
    validate: null,
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
