import React from 'react';
import { MuiThemeProvider } from 'material-ui/styles';
import { BrowserRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';

import theme from './EasTheme';
import i18n from '../../i18n/i18n';
import STYLES from './App.scss';
import AppShell from '../AppShell/AppShell';

const App = () => (
  <div className={STYLES.App}>
    <I18nextProvider i18n={i18n}>
      <MuiThemeProvider theme={theme}>
        <BrowserRouter>
          <AppShell />
        </BrowserRouter>
      </MuiThemeProvider>
    </I18nextProvider>
  </div>
);

export default App;
