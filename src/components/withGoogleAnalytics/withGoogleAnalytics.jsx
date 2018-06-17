import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactGA from 'react-ga';

const withGoogleAnalytics = WrappedComponent => {
  class WithGoogleAnalytics extends Component {
    constructor(props) {
      super(props);
      console.log('Initialize GA');
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
