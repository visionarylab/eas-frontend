import React, { Component } from 'react';

import PropTypes from 'prop-types';

import { FacebookContext } from './../FacebookProvider/FacebookProvider';

const withFacebookSDK = WrappedComponent => {
  class WithFacebookSDK extends Component {
    render() {
      return (
        <FacebookContext.Consumer>
          {context => <WrappedComponent {...this.props} facebookContext={context} />}
        </FacebookContext.Consumer>
      );
    }
  }
  WithFacebookSDK.propTypes = {};
  return WithFacebookSDK;
};

export default withFacebookSDK;
