import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import classnames from 'classnames/bind';
import STYLES from './RandomNumberResult.module.scss';

const c = classnames.bind(STYLES);

const RandomNumberResult = ({ result }) => (
  <div className={c('RandomNumberResult')}>
    <Typography
      className={c('RandomNumberResult__results')}
      variant="body1"
      align="center"
      data-testid="RandomNumberResult__result"
    >
      {result.value.join(', ')}
    </Typography>
  </div>
);

RandomNumberResult.propTypes = {
  result: PropTypes.shape({
    created_at: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]).isRequired,
    schedule_date: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]).isRequired,
    value: PropTypes.arrayOf(PropTypes.number),
  }).isRequired,
};

export default RandomNumberResult;