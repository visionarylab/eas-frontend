/* eslint-disable react/destructuring-assignment */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { translate } from 'react-i18next';

import PublicSummaryPanel from '../../PublicSummaryPanel/PublicSummaryPanel.jsx';
import Page from '../../Page/Page.jsx';
import FacebookLoginButton from '../../FacebookLoginButton/FacebookLoginButton.jsx';
import PrizesOverview from '../../PrizesOverview/PrizesOverview.jsx';
import STYLES from './PublishedFacebookLoginRafflePage.scss';

const c = className => STYLES[className];

const PublishedFacebookLoginRafflePage = props => (
  <Page htmlTitle={props.title} className={c('PublishedFacebookLoginRafflePage')} noIndex>
    <div>
      <Typography variant="display2">{props.title}</Typography>
      {props.results.length ? (
        <Fragment>
          <Typography variant="h1">{props.t('winners')}</Typography>
          {props.results.map(result => (
            <div>{result}</div>
          ))}
          <PublicSummaryPanel>
            <Typography variant="h1">{props.t('draw_details')}</Typography>
            <div>Participants: {props.participants.join(', ')}</div>
            <div>prizes: {props.prizes}</div>
            <div>
              Descripcion:
              <p>{props.description}</p>
            </div>
          </PublicSummaryPanel>
        </Fragment>
      ) : (
        <Fragment>
          <PrizesOverview prizes={props.prizes} />
          <div className={c('PublishedFacebookLoginRafflePage__participate-with-facebook')}>
            {props.userRegisteredInRaffle ? (
              <Typography variant="title">
                You are registered in the raffle as {props.userName}
              </Typography>
            ) : (
              <Fragment>
                <Typography variant="title">{props.t('registration_is_open')}</Typography>
                <br />
                {props.isLoggedInFB ? (
                  <Button variant="contained" color="primary" onClick={props.onRegisterInRaffle}>
                    {props.t('participate_as', { username: props.userName })}
                  </Button>
                ) : (
                  <div>
                    <Typography variant="body2">
                      {props.t('login_with_facebook_to_participate')}
                    </Typography>
                    <FacebookLoginButton />
                  </div>
                )}
              </Fragment>
            )}
          </div>
        </Fragment>
      )}
    </div>
  </Page>
);

PublishedFacebookLoginRafflePage.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  participants: PropTypes.arrayOf(PropTypes.string).isRequired,
  prizes: PropTypes.arrayOf(PropTypes.string).isRequired,
  results: PropTypes.arrayOf(PropTypes.object),
  isLoggedInFB: PropTypes.bool.isRequired,
  userName: PropTypes.string,
  userRegisteredInRaffle: PropTypes.bool.isRequired,
  onRegisterInRaffle: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

PublishedFacebookLoginRafflePage.defaultProps = {
  results: [],
  userName: null,
};

export default translate('PublishedFacebookLoginRafflePage')(PublishedFacebookLoginRafflePage);
