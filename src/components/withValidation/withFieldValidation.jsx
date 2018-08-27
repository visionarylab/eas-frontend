import React, { Component } from 'react';
import { translate } from 'react-i18next';

import PropTypes from 'prop-types';

const getErrors = (value, validators) =>
  validators.find(validator => {
    switch (validator.rule) {
      case 'required':
        return !String(value).trim();
      case 'min':
        return value < validator.value;
      //   case 'oneOf':
      //     return validators.oneOf.includes(value);
      //   case 'pattern':
      //     return new RegExp(validators.pattern).test(String(value));
      //   case 'validate':
      //     return validators.validate();
      default:
        return true;
    }
  });

const withFieldValidation = WrappedComponent => {
  class WithFieldValidation extends Component {
    componentDidMount() {
      const errors = getErrors(this.props.value, this.props.validators);
      this.context.registerValidatedField(this.props.name, errors, this.props.value);
    }

    componentDidUpdate(prevProps) {
      if (
        prevProps.value !== this.props.value ||
        this.isValid(this.props.value) !== this.isValid(prevProps.value)
      ) {
        const errors = getErrors(this.props.value, this.props.validators);
        this.context.updateFieldValidationState(this.props.name, errors);
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
      const valid = this.isValid(value);
      this.context.onFieldChange(this.props.name, valid);
    };

    getDefaultErrorMessage = error => {
      const { t } = this.props;
      switch (error.rule) {
        case 'required':
          return t('default_message_required_field');
        case 'min':
          return t('default_message_min', { min: error.value });
        default:
          return '';
      }
    };

    isValid = value => {
      const error = getErrors(value, this.props.validators);
      return error === undefined;
    };

    render() {
      const { validators, t, ...props } = this.props;
      const error = 'valid' in props ? props.valid : this.context.getFieldErrors(this.props.name);
      let message;
      if (error) {
        message = error.message || this.getDefaultErrorMessage(error);
      }
      return (
        <WrappedComponent
          {...props}
          error={Boolean(error)}
          helperText={message}
          onChange={this.onFieldChange}
        />
      );
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
        rule: PropTypes.string.isRequired,
        value: PropTypes.any.isRequired,
        message: PropTypes.string,
      }),
    ),
    t: PropTypes.func.isRequired,
  };

  WithFieldValidation.defaultProps = {
    onChange: null,
    validators: [],
    value: '',
  };

  WithFieldValidation.contextTypes = {
    registerValidatedField: PropTypes.func.isRequired,
    deregisterValidatedField: PropTypes.func.isRequired,
    onFieldChange: PropTypes.func.isRequired,
    getFieldErrors: PropTypes.func.isRequired,
    updateFieldValidationState: PropTypes.func.isRequired,
    updateFieldChangedState: PropTypes.func.isRequired,
  };

  return translate('WithFieldValidation')(WithFieldValidation);
};

export default withFieldValidation;
