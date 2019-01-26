import React from 'react';
import classnames from 'classnames/bind';
import STYLES from './LoadingCoin.scss';

const c = classnames.bind(STYLES);

const LoadingCoin = () => (
  <div className={c('LoadingCoin')}>
    <div />
  </div>
);

LoadingCoin.propTypes = {};

LoadingCoin.defaultProps = {};

export default LoadingCoin;
