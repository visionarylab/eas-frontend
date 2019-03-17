/* eslint-disable react/destructuring-assignment */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { translate } from 'react-i18next';
import classnames from 'classnames/bind';
import { Participant, Prize, RaffleResult } from 'echaloasuerte-js-sdk';
import DrawLayout from '../../DrawLayout/DrawLayout.jsx';
import PublicSummaryPanel from '../../PublicSummaryPanel/PublicSummaryPanel.jsx';
import Page from '../../Page/Page.jsx';
import FacebookLoginButton from '../../FacebookLoginButton/FacebookLoginButton.jsx';
import PrizesOverview from '../../PrizesOverview/PrizesOverview.jsx';
import LoadingSpinner from '../../LoadingSpinner/LoadingSpinner.jsx';
import Countdown from '../../Countdown/Countdown.jsx';
import ShareButtons from '../../ShareButtons/ShareButtons.jsx';
import STYLES from './PublishedFacebookLoginRafflePage.scss';

const c = classnames.bind(STYLES);

const analyticsDrawType = 'Facebook Login';

const PublishedFacebookLoginRafflePage = props => {
  const {
    title,
    result,
    isOwner,
    participants,
    shareUrl,
    numberOfGroups,
    description,
    onToss,
    isLoading,
    t,
  } = props;
  if (isLoading) {
    return <LoadingSpinner fullpage />;
  }
  return (
    <Page
      className={c('PublishedFacebookLoginRafflePage')}
      // ogImage={groupsOgImage}
      htmlTitle={title || t('html_title')}
      htmlDescription={description || t('html_description')}
      htmlKeywords={t('html_keywords')}
      noIndex
      pageType="groups_published_draw"
      // className={c('PublishedGroupsGeneratorPage')}
    >
      <DrawLayout>
        <Typography
          align="center"
          variant="h1"
          data-component="PublishedGroupsGeneratorPage__Title"
        >
          {title || t('page_title')}
        </Typography>
        {description && <Typography variant="body2">{description}</Typography>}
        {props.result.value ? (
          <Fragment>
            <Typography variant="h1">{props.t('winners')}</Typography>
            {/* {props.results.map(result => (
                <div>{result}</div>
              ))} */}
            <PublicSummaryPanel>
              <Typography variant="h1">{props.t('draw_details')}</Typography>
              <div>Participants: {props.participants.join(', ')}</div>
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
                <Typography variant="body1">
                  You are registered in the raffle as {props.userName}
                </Typography>
              ) : (
                <Fragment>
                  <Typography variant="body1">{props.t('registration_is_open')}</Typography>
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
            <Countdown date={result.schedule_date} />
            <ShareButtons
              drawType={analyticsDrawType}
              sectionTitle={t('share_draw')}
              url={shareUrl}
            />
          </Fragment>
        )}
      </DrawLayout>
    </Page>
  );
};

PublishedFacebookLoginRafflePage.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  participants: PropTypes.arrayOf(PropTypes.instanceOf(Participant)).isRequired,
  prizes: PropTypes.arrayOf(PropTypes.instanceOf(Prize)).isRequired,
  result: PropTypes.instanceOf(RaffleResult),
  isLoggedInFB: PropTypes.bool.isRequired,
  userName: PropTypes.string,
  userRegisteredInRaffle: PropTypes.bool.isRequired,
  onRegisterInRaffle: PropTypes.func.isRequired,
  shareUrl: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
};

PublishedFacebookLoginRafflePage.defaultProps = {
  result: null,
  userName: null,
};

export default translate('FacebookRaffle')(PublishedFacebookLoginRafflePage);
