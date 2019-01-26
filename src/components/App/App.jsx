import React, { Component } from 'react';
import { I18nextProvider } from 'react-i18next';
import ReactGA from 'react-ga';

import i18n from '../../i18n/i18n';
import AppShell from '../AppShell/AppShell.jsx';
import FacebookProvider from '../FacebookProvider/FacebookProvider.jsx';
import config from '../../config/config';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary.jsx';
import ErrorPage from '../Pages/ErrorPage/ErrorPage.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    console.log('config.googleAnaliticsEnabled', config.googleAnaliticsEnabled);
    if (config.googleAnaliticsEnabled) {
      ReactGA.initialize(config.googleAnalyticsID);
      ReactGA.set({ dimension1: 'v3' });
    }
    if (config.sentryEnabled) {
      // eslint-disable-next-line no-undef
      window.Raven.config('https://bebd8f08ca1e44b0bd2b2d5f352332f4@sentry.io/1247679', {
        environment: config.environment,
      }).install();
    }
  }

  render() {
    return (
      <ErrorBoundary
        render={() => (
          <ErrorPage>Something went bad, but we are working very hard to fix it</ErrorPage>
        )}
      >
        <I18nextProvider i18n={i18n}>
          <FacebookProvider>
            <AppShell />
          </FacebookProvider>
        </I18nextProvider>
      </ErrorBoundary>
    );
  }
}

export default App;
