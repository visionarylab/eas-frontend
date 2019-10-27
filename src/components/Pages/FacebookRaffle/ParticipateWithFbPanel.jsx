import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import withFacebookSDK from '../../withFacebookSDK/withFacebookSDK.jsx';
import FacebookLoginButton from '../../FacebookLoginButton/FacebookLoginButton.jsx';
import LoadingSpinner from '../../LoadingSpinner/LoadingSpinner.jsx';
import ErrorFeedback from '../../ErrorFeedback/ErrorFeedback.jsx';

const ParticipateWithFbPanel = ({
  userRegisteredInRaffle,
  onRegisterInRaffle,
  registerFailedErrorMessage,
  facebookContext,
  t,
}) => {
  const { loadingFbStatus, isLoggedInFB, username, logout, fbErrorMessage } = facebookContext;
  if (loadingFbStatus) {
    return <LoadingSpinner />;
  }

  if (!isLoggedInFB) {
    return (
      <>
        <FacebookLoginButton sideLabel={t('login_with_facebook_to_participate')} />
        {fbErrorMessage && <ErrorFeedback error={fbErrorMessage} />}
      </>
    );
  }

  if (userRegisteredInRaffle) {
    return (
      <Typography variant="body1" data-testid="FacebookRaffle__participant-registered">
        {t('you_are_registered_as_username', { username })}
      </Typography>
    );
  }

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        data-testid="FacebookRaffle__participant-button"
        onClick={onRegisterInRaffle}
      >
        {t('participate_as', { username })}
      </Button>
      <Typography variant="caption" gutterBottom>
        <br />
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <Link component="button" variant="caption" onClick={logout}>
          {t('or_access_as_someone_else')}
        </Link>
      </Typography>
      {registerFailedErrorMessage && <ErrorFeedback error={registerFailedErrorMessage} />}
    </>
  );
};

ParticipateWithFbPanel.propTypes = {
  userRegisteredInRaffle: PropTypes.bool.isRequired,
  onRegisterInRaffle: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  registerFailedErrorMessage: PropTypes.string,
  facebookContext: PropTypes.shape({
    isLoggedInFB: PropTypes.bool.isRequired,
    loadingFbStatus: PropTypes.bool.isRequired,
    username: PropTypes.string,
    logout: PropTypes.func.isRequired,
    fbErrorMessage: PropTypes.string,
  }).isRequired,
};

ParticipateWithFbPanel.defaultProps = {
  registerFailedErrorMessage: '',
};

export default withFacebookSDK(ParticipateWithFbPanel);
