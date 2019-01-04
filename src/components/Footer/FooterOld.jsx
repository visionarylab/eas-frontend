import React from 'react';
import classnames from 'classnames/bind';
import i18n from '../../i18n/i18n';
import TranslationsSwitch from '../TranslationsSwitch/TranslationsSwitch.jsx';
import STYLES from './FooterOld.scss';
import config from '../../config/config';

const c = classnames.bind(STYLES);

const availableLocales = ['es-ES', 'en-GB'];

const redirect = locale => {
  const { protocol, pathname, search } = window.location;
  const { environment } = config;
  let newDomain;
  if (locale === 'en-GB') {
    if (environment === 'production') {
      newDomain = 'woreep.com';
    } else {
      newDomain = 'dev.woreep.com';
    }
  } else if (environment === 'production') {
    newDomain = 'echaloasuerte.com';
  } else {
    newDomain = 'beta-dev.echaloasuerte.com';
  }
  const targetUrl = `${protocol}//${newDomain}${pathname}${search}`;
  window.location.replace(targetUrl);
};

const handleChangeLanguage = l => {
  if (config.environment === 'local') {
    // Avoid redirecting to ease the translation process in local
    i18n.changeLanguage(l);
  } else {
    redirect(l);
  }
};

const Footer = () => (
  <footer className={c('Footer')}>
    <div className={c('Footer__bar')}>
      <TranslationsSwitch onChange={handleChangeLanguage} available={availableLocales} />
    </div>
  </footer>
);

Footer.propTypes = {};

export default Footer;
