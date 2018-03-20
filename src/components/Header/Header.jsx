import React from 'react';
import PropTypes from 'prop-types';
import Typography from 'material-ui/Typography';

import TranslationsSwitch from '../TranslationsSwitch';
import available from '../../i18n/available';

const Header = ({ onLanguageChange }) => (
  <div>
    <Typography variant="display3" align="center">
      Échalo A Suerte
    </Typography>
    <TranslationsSwitch onChange={l => onLanguageChange(l)} available={Object.keys(available)} />
  </div>
);

Header.propTypes = {
  onLanguageChange: PropTypes.func.isRequired,
};

export default Header;
