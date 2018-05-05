import React from 'react';
import i18n from '../../i18n/i18n'; // initialized i18next instance

import TranslationsSwitch from '../TranslationsSwitch';
import available from '../../i18n/available';
import STYLES from './Footer.scss';

const c = className => STYLES[className];

const Footer = () => (
  <footer className={c('Footer')}>
    <TranslationsSwitch onChange={l => i18n.changeLanguage(l)} available={Object.keys(available)} />
  </footer>
);

Footer.propTypes = {};

export default Footer;
