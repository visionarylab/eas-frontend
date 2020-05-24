import React from 'react';
import { Typography } from '@material-ui/core';

import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import STYLES from './Winner.module.scss';

const Winner = ({ prize, participant }) => (
  <div className={STYLES.Container}>
    <div className={STYLES.Item}>
      <Paper className={STYLES.Card} elevation={2}>
        {prize.name}
      </Paper>
    </div>{' '}
    <Typography variant="h1" component="span">
      -
    </Typography>{' '}
    <div className={STYLES.Item}>
      <Paper className={STYLES.Card} elevation={2}>
        {participant.name}
      </Paper>
    </div>
  </div>
);

Winner.propTypes = {
  prize: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
  participant: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
};

export default Winner;
