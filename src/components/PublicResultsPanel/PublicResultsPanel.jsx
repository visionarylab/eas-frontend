import React from 'react';
import PropTypes from 'prop-types';

const PublicResultsPanel = props => <div>{props.children}</div>;

PublicResultsPanel.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PublicResultsPanel;
