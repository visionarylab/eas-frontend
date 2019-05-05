import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactGA from 'react-ga';
import mixpanel from 'mixpanel-browser';
import { MixpanelProvider } from 'react-mixpanel';
import * as Sentry from '@sentry/browser';
import { connect } from 'react-redux';
// import showCookieBanner from '../../services/cookieConsent';
import initI18n from '../../i18n';
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
    }
    if (config.sentryEnabled) {
      Sentry.init({
        dsn: config.sentryDsn,
        environment: config.environment,
      });
    }
    initI18n(props.hostname);
  }

  componentDidMount() {
    hotjar.initialize(1051921, 6);
    // showCookieBanner();
  }

  render() {
    return (
      <ErrorBoundary
        render={() => (
          <ErrorPage>Something went bad, but we are working very hard to fix it</ErrorPage>
        )}
      >
        <MixpanelProvider mixpanel={mixpanel}>
          <FacebookProvider>
            <AppShell />
          </FacebookProvider>
        </MixpanelProvider>
      </ErrorBoundary>
    );
  }
}

App.propTypes = {
  hostname: PropTypes.string.isRequired,
};

const mapsStateToProps = state => ({ hostname: state.hostname.hostname });

export default connect(mapsStateToProps)(App);
