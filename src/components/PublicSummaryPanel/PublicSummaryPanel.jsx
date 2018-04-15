import React from 'react';
import PropTypes from 'prop-types';

const ResultsPanel = props => {
  return (
    <div>
      {props.children}
    </div>
  );
};

ResultsPanel.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ResultsPanel;