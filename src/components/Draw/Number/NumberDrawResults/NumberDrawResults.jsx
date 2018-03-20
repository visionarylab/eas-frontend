import React from 'react';
import PropTypes from 'prop-types';

import STYLE from './NumberDrawResults.scss';

const NumberDrawResults = props => <span className={STYLE.NumberDrawResults}>{props.results}</span>;

NumberDrawResults.propTypes = {
  results: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default NumberDrawResults;
