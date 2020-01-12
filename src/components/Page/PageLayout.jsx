import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { withRouter } from 'react-router';
import STYLES from './PageLayout.scss';

const c = classNames.bind(STYLES);
const PageLayout = ({ sidePanel, children, contentClassName, isMobile }) =>
  // eslint-disable-next-line no-nested-ternary
  isMobile ? (
    <>
      <div className={contentClassName}>{children}</div>
      {sidePanel}
    </>
  ) : sidePanel ? (
    <div className={c('PageLayout__extraContent')}>
      <div className={c('PageLayout__centralColumn', contentClassName)}>{children}</div>
      <div className={c('PageLayout__rightColumn')}>{sidePanel}</div>
    </div>
  ) : (
    <div className={c('PageLayout__contentOnly', contentClassName)}>{children}</div>
  );

PageLayout.propTypes = {
  sidePanel: PropTypes.node,
  children: PropTypes.node.isRequired,
  isMobile: PropTypes.bool.isRequired,
};

PageLayout.defaultProps = {
  sidePanel: null,
};

const mapStateToProps = state => ({ isMobile: state.userRequest.isMobile });
export default withRouter(connect(mapStateToProps)(PageLayout));
