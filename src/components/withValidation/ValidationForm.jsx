import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withFormValidation from './withFormValidation';

class Form extends Component {
  render() {
    return <form>{this.props.children}</form>;
  }
}

Form.propTypes = {
  children: PropTypes.number.isRequired,
};

export default withFormValidation(Form);
