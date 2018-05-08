import React from 'react';
import PropTypes from 'prop-types';

import TransparentPanel from '../TransparentPanel/TransparentPanel';

const PublicResultsPanel = props => (
  <div>
    <TransparentPanel>{props.children}</TransparentPanel>
  </div>
);
PublicResultsPanel.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PublicResultsPanel;
