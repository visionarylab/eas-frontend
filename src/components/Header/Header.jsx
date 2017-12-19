import React from 'react';
import Typography from 'material-ui/Typography';

import TranslationsSwitch from '../TranslationsSwitch';
import available from '../../i18n/available';

const Header = () => (
  <div>
    <Typography type="display3" align="center">
      Échalo A Suerte
    </Typography>
    <TranslationsSwitch
      onChange={l => this.changeLanguage(l)}
      available={Object.keys(available)}
    />
  </div>
);

export default Header;
