import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';

import STYLES from './MultiValueDisplay.scss';

const c = className => STYLES[className];

class MultiValueDisplay extends Component {
  onValueDelete = value => () => {
    const values = this.props.values;
    const indexToDelete = values.indexOf(value);
    values.splice(indexToDelete, 1);
    this.props.onChange(values);
  };

  render() {
    const { values, label, allowDelete, messageEmpty } = this.props;
    return (
      <div className={c('MultiValueDisplay')} data-component="MultiValueDisplay">
        {/* <div>{label}</div> */}
        {values.length
          ? values.map(value => (
              <Chip
                key={value}
                label={value}
                onDelete={allowDelete ? this.onValueDelete(value) : null}
                data-component={'MultiValueDisplay__chip'}
              />
            ))
          : messageEmpty}
      </div>
    );
  }
}

MultiValueDisplay.propTypes = {
  label: PropTypes.string.isRequired,
  values: PropTypes.arrayOf(PropTypes.string).isRequired,
  allowDelete: PropTypes.bool,
  messageEmpty: PropTypes.string,
  onChange: PropTypes.func,
};

MultiValueDisplay.defaultProps = {
  allowDelete: false,
  messageEmpty: '',
  onChange: () => {},
};

export default MultiValueDisplay;
