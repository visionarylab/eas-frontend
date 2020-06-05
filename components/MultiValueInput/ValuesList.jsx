import React from 'react';
import PropTypes from 'prop-types';
import Chip from '@material-ui/core/Chip';

const ValuesList = React.memo(({ values, onValueDelete }) =>
  values.map((value, i) => (
    // eslint-disable-next-line react/no-array-index-key
    <Chip key={`value-${i}`} label={value} onDelete={() => onValueDelete(i)} />
  )),
);

ValuesList.propTypes = {
  values: PropTypes.arrayOf(PropTypes.string).isRequired,
  onValueDelete: PropTypes.func.isRequired,
};

export default ValuesList;
