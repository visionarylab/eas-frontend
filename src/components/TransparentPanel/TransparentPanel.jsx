import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import STYLES from './TransparentPanel.scss';

const c = classNames.bind(STYLES);

const TransparentPanel = props => (
  <div
    className={c(
      'TransparentPanel',
      { 'TransparentPanel--no-padding': props.noPadding },
      props.className,
    )}
  >
    {props.children}
  </div>
);

TransparentPanel.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  noPadding: PropTypes.bool,
};

TransparentPanel.defaultProps = {
  className: null,
  noPadding: false,
};

export default TransparentPanel;
