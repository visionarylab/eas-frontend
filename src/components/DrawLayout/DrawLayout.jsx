import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { withRouter } from 'react-router';
import { isMobile } from 'react-device-detect';
import config from '../../config/config';

import STYLES from './DrawLayout.scss';

const c = classNames.bind(STYLES);

class DrawLayout extends Component {
  isSmallScreen = () => {
    if (config.isServer) {
      return isMobile;
    }
    return window.innerWidth <= 600;
  };

  render() {
    const { sidePanel, isPublic, children } = this.props;
    return (
      <div className={c('DrawLayout')}>
        <div
          className={c(`DrawLayout__content`, {
            'DrawLayout__content--opaque': isPublic && this.isSmallScreen(),
          })}
        >
          {children}
        </div>
        {sidePanel && <div className={c('DrawLayout__side-panel')}>{sidePanel}</div>}
      </div>
    );
  }
}

DrawLayout.propTypes = {
  sidePanel: PropTypes.node,
  isPublic: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

DrawLayout.defaultProps = {
  sidePanel: null,
  isPublic: false,
};

export default withRouter(DrawLayout);
