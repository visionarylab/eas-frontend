import React from 'react';
import { Typography } from '@material-ui/core';

import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import STYLES from './Pair.module.scss';

const Pair = ({ first, second }) => (
  <div className={STYLES.Container}>
    <div className={STYLES.Item}>
      <Paper className={STYLES.Card} elevation={2}>
        {first}
      </Paper>
    </div>{' '}
    <Typography variant="h1" component="span">
      -
    </Typography>{' '}
    <div className={STYLES.Item}>
      <Paper className={STYLES.Card} elevation={2}>
        {second}
      </Paper>
    </div>
  </div>
);

Pair.propTypes = {
  first: PropTypes.string.isRequired,
  second: PropTypes.string.isRequired,
};

export default Pair;
