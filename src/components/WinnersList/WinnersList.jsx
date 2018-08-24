import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import WinnerChip from '../WinnerChip/WinnerChip';
import ApiClient from '../../services/api/EASApi';
import STYLES from './WinnersList.scss';

const { RaffleResultValue } = ApiClient;
const c = classNames.bind(STYLES);

const WinnersList = ({ winners }) => (
  <div className={c('WinnersList')}>
    {winners.map(winner => <WinnerChip key={winner.prize.id} prize={winner} {...winner} />)}
  </div>
);

WinnersList.propTypes = {
  winners: PropTypes.arrayOf(RaffleResultValue).isRequired,
};

export default WinnersList;
