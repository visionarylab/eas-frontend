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
    this.props.onDelete(values);
  };

  render() {
    const { values, label, allowDelete } = this.props;
    return (
      <div className={c('MultiValueDisplay')}>
        <div>{label}</div>
        {Boolean(values.length) && (
          <Paper className={c('MultiValueDisplay__items-container')}>
            {values.map(value => (
              <Chip
                key={value}
                label={value}
                onDelete={allowDelete ? this.onValueDelete(value) : null}
              />
            ))}
          </Paper>
        )}
      </div>
    );
  }
}

MultiValueDisplay.propTypes = {
  label: PropTypes.string.isRequired,
  values: PropTypes.arrayOf(PropTypes.string).isRequired,
  allowDelete: PropTypes.bool,
  onDelete: PropTypes.func,
};

MultiValueDisplay.defaultProps = {
  allowDelete: false,
  onDelete: () => {},
};

export default MultiValueDisplay;
