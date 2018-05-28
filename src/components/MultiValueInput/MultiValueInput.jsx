import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import TextField from '@material-ui/core/TextField';

import STYLES from './MultiValueInput.scss';

const c = className => STYLES[className];

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

  onValueDelete = value => () => {
    const values = this.props.values;
    const indexToDelete = values.indexOf(value);
    values.splice(indexToDelete, 1);
    this.props.onChange(values);
  };

  addValues = newValues => {
    const { values } = this.props;
    this.props.onChange(values.concat(newValues));
    this.setState({ currentValue: '' });
  };

  render() {
    const { label, name, placeholder, values } = this.props;
    return (
      <div className={c('MultiValueInput')}>
        <TextField
          name={name}
          label={label}
          placeholder={placeholder}
          onChange={this.onCurrentValueChange}
          onKeyPress={this.onKeyPress}
          value={this.state.currentValue}
          type="text"
          fullWidth
        />
        {Boolean(values.length) && (
          <Paper>
            {values.map(value => (
              <Chip key={value} label={value} onDelete={this.onValueDelete(value)} />
            ))}
          </Paper>
        )}
      </div>
    );
  }
}

MultiValueInput.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  values: PropTypes.arrayOf(PropTypes.string).isRequired,
  delimiters: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func.isRequired,
};

MultiValueInput.defaultProps = {
  delimiters: ['Enter', ',', '.'],
};

export default MultiValueInput;
