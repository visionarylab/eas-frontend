import React, { Component } from 'react';
import PropTypes from 'prop-types';

import withFormValidation from '../../hocs/withFormValidation';

const ValidatedForm = withFormValidation(props => <form noValidate {...props} />);

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      values: props.initialValues,
    };
    this.onFieldChange = this.onFieldChange.bind(this);
    this.onFieldDeregister = this.onFieldDeregister.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onFieldChange(e) {
    const { name, value, checked, type } = e.target;
    const val = type === 'checkbox' ? checked : value;
    this.setState(previousState => ({
      values: {
        ...previousState.values,
        ...{
          [name]: val,
        },
      },
    }));
  }

  onSubmit(e) {
    this.props.onSubmit(e, this.state.values);
  }

  onFieldDeregister(name) {
    if (name in this.props.initialValues) {
      this.setState(previousState => {
        const values = { ...previousState.values };
        values[name] = this.props.initialValues[name];
        return {
          values,
        };
      });
    }
  }

  render() {
    const { render, initialValues, onSubmit, ...props } = this.props;
    return (
      <ValidatedForm {...props} onSubmit={this.onSubmit} onFieldDeregister={this.onFieldDeregister}>
        {render({
          onFieldChange: this.onFieldChange,
          values: this.state.values,
          onSubmit: this.onSubmit,
        })}
      </ValidatedForm>
    );
  }
}

Form.propTypes = {
  render: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.shape(),
};

Form.defaultProps = {
  initialValues: {},
};

export default Form;
