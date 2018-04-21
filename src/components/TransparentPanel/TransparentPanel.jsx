import React from 'react';
import PropTypes from 'prop-types';

import STYLES from './TransparentPanel.scss';

const c = className => STYLES[className];

const TransparentPanel = props => <div className={c('TransparentPanel')}>{props.children}</div>;

TransparentPanel.propTypes = {
  children: PropTypes.node.isRequired,
};

export default TransparentPanel;
