import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import STYLES from './FacebookLoginButton.scss';

const c = classNames.bind(STYLES);

const FacebookLoginButton = props => (
  <div className={c('FacebookLoginButton')}>
    <div
      className="fb-login-button"
      data-max-rows="1"
      data-size="large"
      data-button-type="continue_with"
      data-show-faces="false"
      data-auto-logout-link="false"
      data-use-continue-as="false"
      data-scope="manage_pages"
    />
  </div>
);

FacebookLoginButton.propTypes = {};

export default FacebookLoginButton;
