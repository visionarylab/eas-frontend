import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import STYLES from './FlipCoinPage.scss';

const c = classnames.bind(STYLES);

const FlipCoinPage = ({ coinSide, onFlip }) => (
  <button className={c('FlipCoinPage__coin', `FlipCoinPage__coin--${coinSide}`)} onClick={onFlip}>
    <img
      className={c('FlipCoinPage__coin-side', 'FlipCoinPage__coin-side--heads')}
      src="https://echaloasuerte.com/static/img/img_coin/head.png"
      alt="heads"
    />
    <img
      className={c('FlipCoinPage__coin-side', 'FlipCoinPage__coin-side--tails')}
      src="https://echaloasuerte.com/static/img/img_coin/tail.png"
      alt="tails"
    />
  </button>
);

FlipCoinPage.propTypes = {
  coinSide: PropTypes.string.isRequired,
  onFlip: PropTypes.func.isRequired,
};

export default FlipCoinPage;
