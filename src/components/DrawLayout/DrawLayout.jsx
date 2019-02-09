import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { withRouter } from 'react-router';
import { DeviceContext } from '../DeviceDetector/DeviceDetector.jsx';

import STYLES from './DrawLayout.scss';

const c = classNames.bind(STYLES);

const DrawLayout = ({ sidePanel, isPublic, children }) => (
  <DeviceContext.Consumer>
    {isMobile => (
      <div className={c('DrawLayout')}>
        <div
          className={c(`DrawLayout__content`, {
            'DrawLayout__content--opaque': isPublic && isMobile,
          })}
        >
          {children}
        </div>
        <div className={c('DrawLayout__side-panel')}>{sidePanel}</div>
      </div>
    )}
  </DeviceContext.Consumer>
);

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
