import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';

import MultiValueDisplay from '../MultiValueDisplay/MultiValueDisplay';

class MultiValueInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentValue: '',
    };
  }

  onCurrentValueChange = e => {
    const { delimiters } = this.props;
    const { value } = e.target;
    const regexFromMyArray = new RegExp(delimiters.join('|\\'), 'gi');
    if (regexFromMyArray.test(value)) {
      const values = value.split(regexFromMyArray);
      this.addValues(values);
    } else {
      this.setState({
        currentValue: e.target.value,
      });
    }
  };

  onKeyPress = e => {
    const { delimiters } = this.props;
    if (delimiters.includes(e.key)) {
      if (e.target.value) {
        this.addValues([e.target.value]);
      }
      e.preventDefault();
    }
  };

  addValues = newValues => {
    const { value: values } = this.props;
    this.props.onChange(values.concat(newValues));
    this.setState({ currentValue: '' });
  };

  onValueDelete = value => {
    const values = this.props.value;
    const indexToDelete = values.indexOf(value);
    values.splice(indexToDelete, 1);
    this.props.onChange(values);
  };

  render() {
    const { value: values, labelDisplayList, messageEmpty, ...rest } = this.props;
    const { delimiters, onChange, ...extra } = rest;
    console.log('values', values);
    return (
      <Fragment>
        <TextField
          onChange={this.onCurrentValueChange}
          onKeyPress={this.onKeyPress}
          type="text"
          margin="normal"
          value={this.state.currentValue}
          {...extra}
        />
        <MultiValueDisplay
          label={labelDisplayList}
          values={values}
          messageEmpty={messageEmpty}
          allowDelete
          onDelete={this.onValueDelete}
        />
      </Fragment>
    );
  }
}

MultiValueInput.propTypes = {
  label: PropTypes.string.isRequired,
  labelDisplayList: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  messageEmpty: PropTypes.string.isRequired,
  value: PropTypes.arrayOf(PropTypes.string),
  delimiters: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func.isRequired,
};

MultiValueInput.defaultProps = {
  delimiters: ['Enter', ','],
  value: [],
};

export default MultiValueInput;
