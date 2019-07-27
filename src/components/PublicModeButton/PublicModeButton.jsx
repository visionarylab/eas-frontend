import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import withTracking from '../withTracking/withTracking.jsx';

const PublicModeButton = ({ to, label, trackingData, dataTestId, inputProps, track }) => {
  const CollisionLink = React.forwardRef((props, ref) => (
    <Link innerRef={ref} to={to} {...props} onClick={() => track(trackingData)} />
  ));

  return (
    <Button component={CollisionLink} data-testid={dataTestId} variant="contained" {...inputProps}>
      {label}
    </Button>
  );
};

PublicModeButton.propTypes = {
  to: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  track: PropTypes.func.isRequired,
  dataTestId: PropTypes.string,
  inputProps: PropTypes.shape(),
  trackingData: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

PublicModeButton.defaultProps = {
  inputProps: {},
  dataTestId: '',
};

export default withTracking(PublicModeButton);
