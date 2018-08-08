import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';

import STYLES from './Header.scss';
import logo from './logo_vector2.svg';

const c = classNames.bind(STYLES);

const Header = () => (
  <header className={c('Header')}>
    <Link to={'/'} className={c('Header__link')}>
      <img className={c('Header__logo')} src={logo} alt="EchaloASuerte" />
      <span> EchaloASuerte</span>
    </Link>
  </header>
);

export default Header;
