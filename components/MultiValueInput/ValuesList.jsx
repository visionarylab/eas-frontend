import React from 'react';
import PropTypes from 'prop-types';
import Chip from '@material-ui/core/Chip';

const ValuesList = React.memo(({ values, onValueDelete }) =>
  values.map(value => (
    <Chip
      onClick={e => {
        // Stop the input from being focused when a Chip is clicked
        e.stopPropagation();
      }}
      key={Math.random()}
      label={value}
      onDelete={onValueDelete}
    />
  )),
);

ValuesList.propTypes = {
  values: PropTypes.arrayOf(PropTypes.string).isRequired,
  onValueDelete: PropTypes.func.isRequired,
};

export default ValuesList;
