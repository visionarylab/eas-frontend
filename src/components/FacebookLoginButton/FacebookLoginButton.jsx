import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import STYLES from './FacebookLoginButton.scss';

const c = classNames.bind(STYLES);

const FacebookLoginButton = ({ label }) => (
  <div className={c('FacebookLoginButton')} data-testid="FacebookLoginButton">
    <button
      type="button"
      onClick={() => window.FB.login()}
      className={c('FacebookLoginButton__button')}
    >
      {label}
    </button>
  </div>
);

FacebookLoginButton.propTypes = {
  label: PropTypes.string,
};

FacebookLoginButton.defaultProps = {
  label: '',
};

export default FacebookLoginButton;
