import React from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import urlJoin from 'url-join';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import Button from '@material-ui/core/Button';

// eslint-disable-next-line react/prop-types
const CurrentDrawCertifiedLink = ({ match, history, location, staticContext, ...rest }) => (
  <Link to={urlJoin(match.url, 'shared')} {...rest} />
);
CurrentDrawCertifiedLink.propTypes = {
  match: ReactRouterPropTypes.match.isRequired,
};

const PublicModeButton = ({ label, inputProps }) => (
  <Button
    component={withRouter(CurrentDrawCertifiedLink)}
    variant="contained"
    data-component="MakeCertifiedDrawPanel__button"
    {...inputProps}
  >
    {label}
  </Button>
);

PublicModeButton.propTypes = {
  label: PropTypes.string.isRequired,
};

export default PublicModeButton;
