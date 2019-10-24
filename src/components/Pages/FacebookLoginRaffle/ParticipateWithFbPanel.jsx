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
  facebookContext,
  t,
}) => {
  const { loadingFbStatus, isLoggedInFB, userName, logout, errorMessage } = facebookContext;
  if (loadingFbStatus) {
    return <LoadingSpinner />;
  }

  if (!isLoggedInFB) {
    return (
      <>
        <FacebookLoginButton sideLabel={t('login_with_facebook_to_participate')} />
        {errorMessage && <ErrorFeedback error={errorMessage} />}
      </>
    );
  }

  if (userRegisteredInRaffle) {
    return (
      <Typography variant="body1" data-testid="FacebookRaffle__participant-registered">
        You are registered in the raffle as {userName}
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
        {t('participate_as', { username: userName })}
      </Button>
      <Typography variant="caption" gutterBottom>
        <br />
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <Link component="button" variant="caption" onClick={logout}>
          O accede como otra persona
        </Link>
      </Typography>
    </>
  );
};

ParticipateWithFbPanel.propTypes = {
  userRegisteredInRaffle: PropTypes.bool.isRequired,
  onRegisterInRaffle: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  facebookContext: PropTypes.shape({
    isLoggedInFB: PropTypes.bool.isRequired,
    loadingFbStatus: PropTypes.bool.isRequired,
    userName: PropTypes.string,
    logout: PropTypes.func.isRequired,
    errorMessage: PropTypes.string,
  }).isRequired,
};

ParticipateWithFbPanel.defaultProps = {};

export default withFacebookSDK(ParticipateWithFbPanel);
