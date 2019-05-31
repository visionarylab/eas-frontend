/* eslint-disable jsx-a11y/anchor-is-valid, no-alert */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { withTranslation } from 'react-i18next';
import Link from '@material-ui/core/Link';
import classnames from 'classnames/bind';
import { Participant, Prize, RaffleResult } from 'echaloasuerte-js-sdk';
import DrawLayout from '../../DrawLayout/DrawLayout.jsx';
import ResultsBox from '../../ResultsBox/ResultsBox.jsx';
import FacebookRaffleResult from './FacebookRaffleResult.jsx';
import Page from '../../Page/Page.jsx';
import FacebookLoginButton from '../../FacebookLoginButton/FacebookLoginButton.jsx';
import PrizesOverview from '../../PrizesOverview/PrizesOverview.jsx';
import LoadingSpinner from '../../LoadingSpinner/LoadingSpinner.jsx';
import Countdown from '../../Countdown/Countdown.jsx';
import ShareButtons from '../../ShareButtons/ShareButtons.jsx';
import STYLES from './PublishedFacebookRafflePage.scss';

const c = classnames.bind(STYLES);

const analyticsDrawType = 'Facebook';

const PublishedFacebookLoginRafflePage = props => {
  const {
    title,
    result,
    prizes,
    // isOwner,
    isLoggedInFB,
    userName,
    participants,
    shareUrl,
    onRegisterInRaffle,
    onFacebookLogout,
    userRegisteredInRaffle,
    description,
    isLoading,
    t,
  } = props;
  if (isLoading) {
    return <LoadingSpinner fullpage />;
  }
  return (
    <Page
      className={c('PublishedFacebookRafflePage')}
      // ogImage={groupsOgImage}
      htmlTitle={title || t('html_title')}
      htmlDescription={description || t('html_description')}
      htmlKeywords={t('html_keywords')}
      noIndex
      pageType="groups_published_draw"
      // className={c('PublishedGroupsGeneratorPage')}
    >
      <DrawLayout>
        <Typography align="center" variant="h1" data-testid="PublishedGroupsGeneratorPage__Title">
          {title || t('page_title')}
        </Typography>
        {description && <Typography variant="body2">{description}</Typography>}
        {result.value ? (
          <Fragment>
            <ResultsBox title={t('winners')}>
              <FacebookRaffleResult result={result} />
              <br />
              <ShareButtons
                drawType={analyticsDrawType}
                sectionTitle={t('share_result')}
                url={shareUrl}
              />
            </ResultsBox>
            <section /* className={c('PublishedFacebookRafflePage__details')} */>
              <Typography variant="h5">{t('published_raffle_details')}</Typography>
              <div>
                <Typography variant="body2">
                  {t('field_label_prizes')}: {prizes.map(p => p.name).join(', ')}
                </Typography>
              </div>
              <div>
                <Typography variant="body2">
                  {t('field_label_number_of_participants')}: {participants.length}
                </Typography>
              </div>
            </section>
          </Fragment>
        ) : (
          <Fragment>
            <PrizesOverview prizes={prizes} />
            <div className={c('PublishedFacebookRafflePage__participate-with-facebook')}>
              {userRegisteredInRaffle ? (
                <Typography variant="body1" data-testid="FacebookRaffle__participat-registered">
                  You are registered in the raffle as {userName}
                </Typography>
              ) : (
                <Fragment>
                  <Typography variant="body2">
                    {participants.length > 0 &&
                      t('people_registered_already', { count: participants.length })}
                    <br />
                  </Typography>
                  {isLoggedInFB ? (
                    <Fragment>
                      <Button
                        variant="contained"
                        color="primary"
                        data-testid="FacebookRaffle__participat-button"
                        onClick={onRegisterInRaffle}
                      >
                        {t('participate_as', { username: userName })}
                      </Button>
                      <Typography variant="caption" gutterBottom>
                        <Link component="button" variant="caption" onClick={onFacebookLogout}>
                          O accede como otra persona
                        </Link>
                      </Typography>
                    </Fragment>
                  ) : (
                    <div>
                      <Typography variant="body2">
                        {t('login_with_facebook_to_participate')}
                      </Typography>
                      <br />
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
  description: PropTypes.string,
  participants: PropTypes.arrayOf(PropTypes.instanceOf(Participant)).isRequired,
  prizes: PropTypes.arrayOf(PropTypes.instanceOf(Prize)).isRequired,
  result: PropTypes.instanceOf(RaffleResult),
  isLoggedInFB: PropTypes.bool.isRequired,
  userName: PropTypes.string,
  userRegisteredInRaffle: PropTypes.bool.isRequired,
  onRegisterInRaffle: PropTypes.func.isRequired,
  onFacebookLogout: PropTypes.func.isRequired,
  shareUrl: PropTypes.string.isRequired,
  // onUserLoggedIn: PropTypes.func,
  isLoading: PropTypes.func,
  t: PropTypes.func.isRequired,
};

PublishedFacebookLoginRafflePage.defaultProps = {
  isLoading: false,
  description: '',
  result: null,
  userName: null,
  // onUserLoggedIn: () => {},
};

export default withTranslation('FacebookRaffle')(PublishedFacebookLoginRafflePage);
