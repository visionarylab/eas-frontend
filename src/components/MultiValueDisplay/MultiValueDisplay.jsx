import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';

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
        {/* {label && <div className={c('MultiValueDisplay__label')}>{label}</div>} */}
        {label && <Typography variant="caption">{label}</Typography>}
        <div className={c('MultiValueDisplay__values-list')}>
          {values.length ? (
            values.map(value => (
              <Chip
                key={Math.random()}
                label={value}
                onDelete={allowDelete ? this.onValueDelete(value) : null}
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
  values: PropTypes.arrayOf(PropTypes.string).isRequired,
  allowDelete: PropTypes.bool,
  messageEmpty: PropTypes.string,
  onChange: PropTypes.func,
};

MultiValueDisplay.defaultProps = {
  label: null,
  allowDelete: false,
  messageEmpty: '',
  onChange: () => {},
};

export default MultiValueDisplay;
