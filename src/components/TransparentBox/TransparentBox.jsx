import React from 'react';
import classnames from 'classnames/bind';
import PropTypes from 'prop-types';
import STYLES from './TransparentBox.scss';

const c = classnames.bind(STYLES);

const TransparentBox = ({ children }) => <div className={c('TransparentBox')}>{children}</div>;

TransparentBox.propTypes = {
  children: PropTypes.node.isRequired,
};

export default TransparentBox;
