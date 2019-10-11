import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import FacebookLoginButton from '../../FacebookLoginButton/FacebookLoginButton.jsx';
import LoadingSpinner from '../../LoadingSpinner/LoadingSpinner.jsx';

const ParticipateWithFbPanel = ({
  userRegisteredInRaffle,
  loadingFbStatus,
  isLoggedInFB,
  onRegisterInRaffle,
  userName,
  logout,
  t,
}) => {
  if (loadingFbStatus) {
    return <LoadingSpinner />;
  }

  if (!isLoggedInFB) {
    return <FacebookLoginButton sideLabel={t('login_with_facebook_to_participate')} />;
  }

  if (userRegisteredInRaffle) {
    return (
      <Typography variant="body1" data-testid="FacebookRaffle__participat-registered">
        You are registered in the raffle as {userName}
      </Typography>
    );
  }

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        data-testid="FacebookRaffle__participat-button"
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
  loadingFbStatus: PropTypes.bool.isRequired,
  userRegisteredInRaffle: PropTypes.bool.isRequired,
  isLoggedInFB: PropTypes.bool.isRequired,
  onRegisterInRaffle: PropTypes.func.isRequired,
  userName: PropTypes.string,
  logout: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

ParticipateWithFbPanel.defaultProps = {
  userName: null,
};

export default ParticipateWithFbPanel;
