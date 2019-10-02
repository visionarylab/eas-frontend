import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactGA from 'react-ga';
import mixpanel from 'mixpanel-browser';
import { MixpanelProvider } from 'react-mixpanel';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Cookies from 'js-cookie';
// import showCookieBanner from '../../services/cookieConsent';
import initI18n from '../../i18n';
import AppShell from '../AppShell/AppShell.jsx';
import FacebookProvider from '../FacebookProvider/FacebookProvider.jsx';
import config from '../../config/config';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary.jsx';
import ErrorPage from '../Pages/ErrorPage/ErrorPage.jsx';
// import { hotjar } from '../../services/hotjar';

class App extends Component {
  constructor(props) {
    super(props);
    if (config.googleAnalyticsEnabled) {
      const ABTestArrow = Cookies.get('spinner_split_test_version');
      ReactGA.initialize(config.googleAnalyticsID, { titleCase: false });
      ReactGA.set({ dimension2: ABTestArrow });
    }
    if (config.mixpanelEnabled) {
      mixpanel.init(config.mixpanelID, { debug: config.mixpanelDebug, track_pageview: false });
    }
    initI18n(props.hostname);
  }

  componentDidMount() {
    // Disabling hotjar as we are enabling it at page level
    // if (config.hotjarEnabled) {
    //   hotjar.initialize(1051921, 6);
    // }
    // showCookieBanner();
  }

  render() {
    return (
      <ErrorBoundary
        render={() => (
          <ErrorPage>Something went bad, but we are working very hard to fix it</ErrorPage>
        )}
      >
        <FacebookProvider>
          {config.mixpanelEnabled ? (
            <MixpanelProvider mixpanel={mixpanel}>
              <AppShell />
            </MixpanelProvider>
          ) : (
            <AppShell />
          )}
        </FacebookProvider>
      </ErrorBoundary>
    );
  }
}

App.propTypes = {
  hostname: PropTypes.string.isRequired,
};

const mapsStateToProps = state => ({ hostname: state.userRequest.hostname });

export default withRouter(connect(mapsStateToProps)(App));
