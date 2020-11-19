import React from 'react';
import PropTypes from 'prop-types';
import STYLES from './LinkSetsResult.module.scss';
import Pair from '../../Pair/Pair.jsx';

const LinkSetsResult = ({ result }) => (
  <div className={STYLES.Result} data-testid="LinkSetsResult">
    {result.value.map((set, i) => (
      // eslint-disable-next-line react/no-array-index-key
      <Pair key={i} first={set.element1} second={set.element2} />
    ))}
  </div>
);

LinkSetsResult.propTypes = {
  result: PropTypes.shape({
    created_at: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]).isRequired,
    schedule_date: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
    value: PropTypes.arrayOf(Object),
  }).isRequired,
};

export default LinkSetsResult;
