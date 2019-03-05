import React, { Component } from 'react';
import { I18nextProvider } from 'react-i18next';
import ReactGA from 'react-ga';

import mixpanel from 'mixpanel-browser';
import { MixpanelProvider } from 'react-mixpanel';
import i18n from '../../i18n/i18n';
import AppShell from '../AppShell/AppShell.jsx';
import FacebookProvider from '../FacebookProvider/FacebookProvider.jsx';
import config from '../../config/config';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary.jsx';
import ErrorPage from '../Pages/ErrorPage/ErrorPage.jsx';
import { hotjar } from '../../services/hotjar';

class App extends Component {
  constructor(props) {
    super(props);

    if (config.analiticsEnabled) {
      mixpanel.init(config.mixpanelID, { debug: config.mixpanel_debug, track_pageview: false });
      ReactGA.initialize(config.googleAnalyticsID, { titleCase: false });
      ReactGA.set({ dimension2: 'v3' });
      hotjar.initialize(1051921, 6);
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
        <MixpanelProvider mixpanel={mixpanel}>
          <I18nextProvider i18n={i18n}>
            <FacebookProvider>
              <AppShell />
            </FacebookProvider>
          </I18nextProvider>
        </MixpanelProvider>
      </ErrorBoundary>
    );
  }
}

export default App;
