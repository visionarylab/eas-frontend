import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import Typography from '@material-ui/core/Typography';
import { translate } from 'react-i18next';

import STYLES from './HeaderOld.scss';
import logo from './logo_old.png';

const c = classNames.bind(STYLES);

const Header = ({ t }) => (
  <div className={c('Header')}>
    <header className={c('Header__navbar')}>
      {/* <Link to="/" className={c('Header__link')}> */}
      <img className={c('Header__logo')} src={logo} alt={t('brand_name')} />
      {/* </Link> */}
    </header>
  </div>
);

Header.propTypes = {
  t: PropTypes.func.isRequired,
};

export default translate('Header')(Header);
