import React from 'react';
import PropTypes from 'prop-types';

const Results = ({ results }) => <div>{results}</div>;

Results.propTypes = {
  results: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default Results;
