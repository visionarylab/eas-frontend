import React, { Component } from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import ReactGA from 'react-ga';

import theme from './EasTheme';
import i18n from '../../i18n/i18n';
import AppShell from '../AppShell/AppShell';
import FacebookProvider from './../FacebookProvider/FacebookProvider';
import config from '../../config/config';

class App extends Component {
  constructor(props) {
    super(props);
    ReactGA.initialize(config.googleAnalyticsID);
    // eslint-disable-next-line no-undef
    Raven.config('https://bebd8f08ca1e44b0bd2b2d5f352332f4@sentry.io/1247679', {
      environment: config.environment,
    }).install();
  }

  render() {
    return (
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
  }
}

export default App;
