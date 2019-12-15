import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { withRouter } from 'react-router';
import STYLES from './DrawLayout.module.scss';

const c = classNames.bind(STYLES);
const DrawLayout = ({ sidePanel, children, isMobile }) =>
  // eslint-disable-next-line no-nested-ternary
  isMobile ? (
    <>
      {children}
      {sidePanel && <div className={c('DrawLayout__side-panel')}>{sidePanel}</div>}
    </>
  ) : sidePanel ? (
    <div className={STYLES.ExtraContent}>
      <div className={STYLES.CentralColumn}>{children}</div>
      <div className={STYLES.RightColumn}>{sidePanel}</div>
    </div>
  ) : (
    <div className={STYLES.ContentOnly}>{children}</div>
  );

DrawLayout.propTypes = {
  sidePanel: PropTypes.node,
  children: PropTypes.node.isRequired,
  isMobile: PropTypes.bool.isRequired,
};

DrawLayout.defaultProps = {
  sidePanel: null,
};

const mapStateToProps = state => ({ isMobile: state.userRequest.isMobile });
export default withRouter(connect(mapStateToProps)(DrawLayout));
