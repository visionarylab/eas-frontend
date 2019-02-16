import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import withTracking from '../withTracking/withTracking.jsx';

const PublicModeButton = ({ to, label, trackingData, inputProps, dataComponent, track }) => (
  <Button
    component={props => <Link to={to} onClick={() => track(trackingData)} {...props} />}
    variant="contained"
    data-component={dataComponent}
    {...inputProps}
  >
    {label}
  </Button>
);

PublicModeButton.propTypes = {
  to: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  trackingData: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default withTracking(PublicModeButton);
