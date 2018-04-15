import React from 'react';
import PropTypes from 'prop-types';

const PublicResultsPanel = props => {
  return (
    <div>
      {props.children}
    </div>
  );
};

PublicResultsPanel.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PublicResultsPanel;