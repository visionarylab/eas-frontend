import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import STYLES from './WinnerChip.scss';

const c = classNames.bind(STYLES);

const WinnerChip = ({ extraData, winnerName }) => (
  <div className={c('WinnerChip')}>
    <div className={c('WinnerChip__leftside-box')}>{extraData}</div>
    <div className={c('WinnerChip__rigthside-box')}>{winnerName}</div>
  </div>
);

WinnerChip.propTypes = {
  extraData: PropTypes.string.isRequired,
  winnerName: PropTypes.string.isRequired,
};

export default WinnerChip;
