import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import classnames from 'classnames/bind';
import STYLES from './MultiValueDisplay.scss';

const c = classnames.bind(STYLES);

class MultiValueDisplay extends Component {
  onValueDelete = value => () => {
    const { onDelete } = this.props;
    onDelete(value);
  };

  render() {
    const { values, label, messageEmpty, onDelete } = this.props;
    return (
      <div className={c('MultiValueDisplay')} data-testid="MultiValueDisplay">
        {label && (
          <Typography color="textSecondary" variant="caption">
            {label}
          </Typography>
        )}
        <div className={c('MultiValueDisplay__values-list')}>
          {values.length ? (
            values.map(value => (
              <Chip
                key={Math.random()}
                label={value}
                onDelete={onDelete ? this.onValueDelete(value) : null}
                data-testid="MultiValueDisplay__chip"
              />
            ))
          ) : (
            <Typography
              color="textSecondary"
              variant="body1"
              className={c('MultiValueDisplay__empty-message')}
            >
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
