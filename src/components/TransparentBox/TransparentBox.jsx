import React from 'react';
import classnames from 'classnames/bind';
import PropTypes from 'prop-types';
import STYLES from './TransparentBox.scss';

const c = classnames.bind(STYLES);

const TransparentBox = ({ children, center }) => (
  <div className={c('TransparentBox', { 'TransparentBox--center': center })}>{children}</div>
);

TransparentBox.propTypes = {
  children: PropTypes.node.isRequired,
  center: PropTypes.bool,
};

TransparentBox.defaultProps = {
  center: false,
};

export default TransparentBox;
