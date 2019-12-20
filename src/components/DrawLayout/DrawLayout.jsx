import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { withRouter } from 'react-router';
import STYLES from './DrawLayout.scss';

const c = classNames.bind(STYLES);
const DrawLayout = ({ sidePanel, children, isMobile }) =>
  // eslint-disable-next-line no-nested-ternary
  isMobile ? (
    <>
      {children}
      {sidePanel}
    </>
  ) : sidePanel ? (
    <div className={c('DrawLayout__extraContent')}>
      <div className={c('DrawLayout__centralColumn')}>{children}</div>
      <div className={c('DrawLayout__rightColumn')}>{sidePanel}</div>
    </div>
  ) : (
    <div className={c('DrawLayout__contentOnly')}>{children}</div>
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
