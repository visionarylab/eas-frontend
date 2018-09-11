import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';

import STYLES from './MultiValueDisplay.scss';

const c = className => STYLES[className];

class MultiValueDisplay extends Component {
  onValueDelete = value => () => this.props.onDelete(value);

  render() {
    const { values, label, messageEmpty, onDelete } = this.props;
    return (
      <div className={c('MultiValueDisplay')} data-component="MultiValueDisplay">
        {label && <Typography variant="caption">{label}</Typography>}
        <div className={c('MultiValueDisplay__values-list')}>
          {values.length ? (
            values.map(value => (
              <Chip
                key={Math.random()}
                label={value}
                onDelete={onDelete ? this.onValueDelete(value) : null}
                data-component={'MultiValueDisplay__chip'}
              />
            ))
          ) : (
            <Typography variant="body1" className={c('MultiValueDisplay__empty-message')}>
              {messageEmpty}
            </Typography>
          )}
        </div>
      </div>
    );
  }
}

MultiValueDisplay.propTypes = {
  label: PropTypes.string,
  values: PropTypes.arrayOf(PropTypes.string),
  messageEmpty: PropTypes.string,
  onDelete: PropTypes.func,
};

MultiValueDisplay.defaultProps = {
  values: [],
  label: null,
  messageEmpty: '',
  onDelete: null,
};

export default MultiValueDisplay;
