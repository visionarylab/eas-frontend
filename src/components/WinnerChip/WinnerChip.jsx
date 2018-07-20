import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import ApiClient from '../../services/api/EASApi';

import STYLES from './WinnerChip.scss';

const { RaffleResultPrize, RaffleResultParticipant } = ApiClient;
const c = classNames.bind(STYLES);

const WinnerChip = ({ participant, prize }) => (
  <div className={c('WinnerChip')}>
    <div className={c('WinnerChip__leftside-box')}>{prize.name}</div>
    <div className={c('WinnerChip__rigthside-box')}>{participant.name}</div>
  </div>
);

WinnerChip.propTypes = {
  prize: PropTypes.instanceOf(RaffleResultPrize).isRequired,
  participant: PropTypes.instanceOf(RaffleResultParticipant).isRequired,
};

export default WinnerChip;
