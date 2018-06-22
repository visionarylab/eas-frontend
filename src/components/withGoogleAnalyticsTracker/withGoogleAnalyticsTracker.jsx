import React, { Component } from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import ReactGA from 'react-ga';
import { withRouter } from 'react-router';

const withGoogleAnalyticsTracker = WrappedComponent => {
  class WithGoogleAnalyticsTracker extends Component {
    componentDidMount() {
      const page = this.props.location.pathname;
      ReactGA.pageview(page);
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  WithGoogleAnalyticsTracker.propTypes = {
    location: ReactRouterPropTypes.location.isRequired,
  };
  return withRouter(WithGoogleAnalyticsTracker);
};

export default withGoogleAnalyticsTracker;
