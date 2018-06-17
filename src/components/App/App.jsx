import React from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';

import theme from './EasTheme';
import i18n from '../../i18n/i18n';
import AppShell from '../AppShell/AppShell';
import FacebookProvider from './../FacebookProvider/FacebookProvider';
import withGoogleAnalytics from './../withGoogleAnalytics/withGoogleAnalytics';

const App = () => (
  <I18nextProvider i18n={i18n}>
    <MuiThemeProvider theme={theme}>
      <FacebookProvider>
        <BrowserRouter>
          <AppShell />
        </BrowserRouter>
      </FacebookProvider>
    </MuiThemeProvider>
  </I18nextProvider>
);

export default withGoogleAnalytics(App);
