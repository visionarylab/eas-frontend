import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import WinnerChip from '../WinnerChip/WinnerChip';
import STYLES from './WinnersList.scss';

const c = classNames.bind(STYLES);

const WinnersList = ({ winners }) => (
  <div className={c('WinnersList')}>
    {winners.map((winner, i) => <WinnerChip key={`winner-${i}`} {...winner} />)}
  </div>
);

WinnersList.propTypes = {
  winners: PropTypes.arrayOf(
    PropTypes.shape({
      extraData: PropTypes.string.isRequired,
      winnerName: PropTypes.string,
    }),
  ).isRequired,
};

export default WinnersList;
