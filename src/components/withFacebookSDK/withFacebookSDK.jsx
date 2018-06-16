import React, { Component } from 'react';

import { fbAsyncInit } from '../../services/FacebookAPI/FacebookAPI';

const withFacebookSDK = WrappedComponent => {
  class WithFacebookSDK extends Component {
    componentDidMount() {
      fbAsyncInit();

      (function(d, s, id) {
        const fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {
          return;
        }
        const js = d.createElement(s);
        js.id = id;
        // js.src = 'https://connect.facebook.net/en_US/sdk.js';
        js.src = 'https://connect.facebook.net/en_US/sdk/debug.js';
        fjs.parentNode.insertBefore(js, fjs);
      })(document, 'script', 'facebook-jssdk');
    }
    render() {
      return <WrappedComponent {...this.props} />;
    }
  }
  WithFacebookSDK.propTypes = {};

  return WithFacebookSDK;
};

export default withFacebookSDK;
