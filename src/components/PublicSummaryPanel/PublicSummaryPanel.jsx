import React from 'react';
import PropTypes from 'prop-types';

const PublicSummaryPanel = props => {
  return (
    <div>
      {props.children}
    </div>
  );
};

PublicSummaryPanel.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PublicSummaryPanel;