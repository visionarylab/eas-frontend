import React from 'react';
import { Link } from 'react-router-dom';

import STYLES from './Header.scss';
import logo from './logo.png';

const c = className => STYLES[className];

const Header = () => (
  <header className={c('Header')}>
    <Link to={'/'} className={STYLES.BackArrow}>
      <img src={logo} alt="EchaloASuerte" />
    </Link>
  </header>
);

export default Header;
