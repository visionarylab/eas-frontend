import React from 'react';
import i18n from '../../i18n/i18n';

import TranslationsSwitch from '../TranslationsSwitch/TranslationsSwitch';
import STYLES from './Footer.scss';

const c = className => STYLES[className];

const availableLocales = ['es-ES', 'en-GB'];

const Footer = () => (
  <footer className={c('Footer')}>
    <TranslationsSwitch
      onChange={l => {
        console.log('locale', l);
        i18n.changeLanguage(l);
      }}
      available={availableLocales}
    />
  </footer>
);

Footer.propTypes = {};

export default Footer;
