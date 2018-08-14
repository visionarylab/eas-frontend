import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import WinnerChip from '../WinnerChip/WinnerChip';
import ApiClient from '../../services/api/EASApi';
import STYLES from './WinnersList.scss';

const { RaffleResultPrize, RaffleResultParticipant } = ApiClient;
const c = classNames.bind(STYLES);

const WinnersList = ({ winners }) => (
  <div className={c('WinnersList')}>
    {winners.map((winner, i) => <WinnerChip key={`winner-${i}`} prize={winner} {...winner} />)}
  </div>
);

WinnersList.propTypes = {
  winners: PropTypes.arrayOf(
    PropTypes.shape({
      prize: PropTypes.instanceOf(RaffleResultPrize).isRequired,
      participant: PropTypes.instanceOf(RaffleResultParticipant).isRequired,
    }),
  ).isRequired,
};

export default WinnersList;
