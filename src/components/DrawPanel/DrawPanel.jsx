import React from 'react';
import PropTypes from 'prop-types';

import STYLES from './DrawPanel.scss';

const c = className => STYLES[className];

const DrawPanel = props => <div className={c('DrawPanel')}>{props.children}</div>;

DrawPanel.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DrawPanel;
