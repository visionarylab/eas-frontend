import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import STYLES from './FacebookLoginButton.scss';

const c = classNames.bind(STYLES);

class FacebookLoginButton extends Component {
  componentDidMount() {
    if (window.FB) {
      // The FB login button is parsed and rendered by XFBML
      // https://developers.facebook.com/docs/reference/javascript/FB.XFBML.parse/
      window.FB.XFBML.parse();
    }
  }

  // handleLogin = () => {
  //   const { onUserLoggedIn } = this.props;
  //   window.FB.login(response => {
  //     // Handle the response object, like in statusChangeCallback() in our demo
  //     // code.
  //     onUserLoggedIn();
  //   });
  // };

  render() {
    const { /* onLogin, */ permissions } = this.props;
    return (
      // <button onClick={this.handleLogin} data-testid="FacebookLoginButton">
      //   login
      // </button>
      <div className={c('FacebookLoginButton')} data-testid="FacebookLoginButton">
        <div
          className="fb-login-button"
          data-max-rows="1"
          data-size="large"
          data-button-type="continue_with"
          data-show-faces="false"
          data-auto-logout-link="true"
          data-use-continue-as="false"
          data-scope={permissions}
        />
      </div>
    );
  }
}

FacebookLoginButton.propTypes = {
  // onUserLoggedIn: PropTypes.func,
  permissions: PropTypes.string,
};

FacebookLoginButton.defaultProps = {
  // onUserLoggedIn: () => {},
  permissions: '',
};

export default FacebookLoginButton;
