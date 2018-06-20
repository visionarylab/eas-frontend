import React, { Component } from 'react';
import ReactGA from 'react-ga';

const withGoogleAnalytics = WrappedComponent => {
  class WithGoogleAnalytics extends Component {
    constructor(props) {
      super(props);
      ReactGA.initialize('UA-62791775-3');
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  WithGoogleAnalytics.propTypes = {};
  return WithGoogleAnalytics;
};

export default withGoogleAnalytics;
