import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { translate } from 'react-i18next';

import PublicResultsPanel from '../../PublicResultsPanel/PublicResultsPanel';
import PublicSummaryPanel from '../../PublicSummaryPanel/PublicSummaryPanel';
import Page from '../../Page/Page';
import PublicDrawContent from '../../PublicDrawContent/PublicDrawContent';
import FacebookLoginButton from '../../FacebookLoginButton/FacebookLoginButton';
import PrizesOverview from '../../PrizesOverview/PrizesOverview';
import STYLES from './PublishedFacebookLoginRafflePage.scss';

const c = className => STYLES[className];

const PublishedFacebookLoginRafflePage = props => (
  <Page htmlTitle={props.title} className={c('PublishedFacebookLoginRafflePage')}>
    <PublicDrawContent>
      <Typography variant="display2">{props.title}</Typography>
      {props.results.length ? (
        <Fragment>
          <PublicResultsPanel>
            <Typography variant="display1">{props.t('winners')}</Typography>
            {props.results.map(result => <div>{result}</div>)}
          </PublicResultsPanel>
          <PublicSummaryPanel>
            <Typography variant="display1">{props.t('draw_details')}</Typography>
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
          {props.isLoggedInFB ? (
            <div>
              {props.userRegisteredInRaffle ? (
                <p>You are registered in the raffle as {props.userName}</p>
              ) : (
                <Button variant="raised" color="primary" onClick={props.onRegisterInRaffle}>
                  Participate as {props.userName}
                </Button>
              )}
            </div>
          ) : (
            <div>
              The registration is open! <br /> Login in Facebook to participante
              <FacebookLoginButton />
            </div>
          )}
        </Fragment>
      )}
    </PublicDrawContent>
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
