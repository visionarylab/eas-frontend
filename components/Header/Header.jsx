import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import Typography from '@material-ui/core/Typography';
import { useRouter } from 'next/router';
import Button from '../Button.jsx';
import { withTranslation } from '../../i18n';

import STYLES from './Header.module.scss';
import logo from './logo_vector.svg';

const c = classNames.bind(STYLES);

const showRecentDrawsEnabled = true;

const Header = ({ t }) => {
  const router = useRouter();
  return (
    <header className={c('Header')}>
      <a href="/" className={c('Header__link')}>
        <img className={c('Header__logo')} src={logo} alt={t('brand_name')} />
        <Typography variant="h4" component="span" className={c('Header__title')}>
          {t('brand_name')}
        </Typography>
      </a>
      {showRecentDrawsEnabled && router.pathname !== '/recent' && (
        <span className={c('Header__links')}>
          <Button href="/recent" color="textPrimary">
            <Typography variant="body1" component="span" inline>
              {t('recent_draws')}
            </Typography>
          </Button>
        </span>
      )}
    </header>
  );
};

Header.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withTranslation('Common')(Header);
