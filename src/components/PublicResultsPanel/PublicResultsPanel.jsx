import React from 'react';
import PropTypes from 'prop-types';

import TransparentPanel from '../TransparentPanel/TransparentPanel';

const PublicResultsPanel = props => (
  <section>
    <TransparentPanel>{props.children}</TransparentPanel>
  </section>
);
PublicResultsPanel.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PublicResultsPanel;
