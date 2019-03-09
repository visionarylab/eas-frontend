import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { withRouter } from 'react-router';
import STYLES from './DrawLayout.scss';

const c = classNames.bind(STYLES);

const DrawLayout = ({ sidePanel, children }) => (
  <div className={c('DrawLayout')}>
    <div className={c(`DrawLayout__content`)}>{children}</div>
    <div className={c('DrawLayout__side-panel')}>{sidePanel}</div>
  </div>
);

DrawLayout.propTypes = {
  sidePanel: PropTypes.node,
  children: PropTypes.node.isRequired,
};

DrawLayout.defaultProps = {
  sidePanel: null,
};

export default withRouter(DrawLayout);
