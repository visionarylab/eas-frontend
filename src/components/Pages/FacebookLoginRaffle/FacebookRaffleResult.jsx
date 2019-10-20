import React from 'react';
import PropTypes from 'prop-types';
import { RaffleResult } from 'echaloasuerte-js-sdk';
import classnames from 'classnames/bind';
import Typography from '@material-ui/core/Typography';
import STYLES from './FacebookRaffleResult.scss';
import getOrdinal from '../../../i18n/ordinals';

const c = classnames.bind(STYLES);

// This has been copy pasted form raffle, should review
const FacebookRaffleResult = ({ result }) => (
  <div className={c('FacebookRaffleResult')}>
    <div className={c('FacebookRaffleResult__container')}>
      {result.value.map((winner, index) => (
        <div key={winner.prize.id} data-testid="WinnersList__result">
          <Typography variant="h5" display="inline">
            {getOrdinal(index + 1)} Premio (
          </Typography>
          <Typography variant="h2" display="inline">
            {winner.prize.name}
          </Typography>
          <Typography variant="h5" display="inline">
            ): {winner.participant.name}
          </Typography>
        </div>
      ))}
    </div>
  </div>
);

FacebookRaffleResult.propTypes = {
  result: PropTypes.instanceOf(RaffleResult).isRequired,
};

export default FacebookRaffleResult;
