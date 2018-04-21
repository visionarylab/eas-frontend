import React from 'react';
import PropTypes from 'prop-types';

import TransparentPanel from '../TransparentPanel/TransparentPanel';

const DrawPanel = props => <TransparentPanel>{props.children}</TransparentPanel>;

DrawPanel.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DrawPanel;
