/* eslint-disable react/destructuring-assignment */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { translate } from 'react-i18next';
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
    isOwner,
    participants,
    shareUrl,
    numberOfGroups,
    description,
    onToss,
    isLoading,
    onUserLoggedIn,
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
        <Typography
          align="center"
          variant="h1"
          data-component="PublishedGroupsGeneratorPage__Title"
        >
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
              {props.userRegisteredInRaffle ? (
                <Typography variant="body1" data-component="FacebookRaffle__participat-registered">
                  You are registered in the raffle as {props.userName}
                </Typography>
              ) : (
                <Fragment>
                  <Typography variant="body2">
                    {t('people_registered_already', { count: 0 })}
                    {/* npm i react-i18next@v10.0.0 i18next@latest
                     to check if count_0 works */}
                    <br />
                  </Typography>
                  {props.isLoggedInFB ? (
                    <Button
                      variant="contained"
                      color="primary"
                      data-component="FacebookRaffle__participat-button"
                      onClick={props.onRegisterInRaffle}
                    >
                      {props.t('participate_as', { username: props.userName })}
                    </Button>
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
  description: PropTypes.string.isRequired,
  participants: PropTypes.arrayOf(PropTypes.instanceOf(Participant)).isRequired,
  prizes: PropTypes.arrayOf(PropTypes.instanceOf(Prize)).isRequired,
  result: PropTypes.instanceOf(RaffleResult),
  isLoggedInFB: PropTypes.bool.isRequired,
  userName: PropTypes.string,
  userRegisteredInRaffle: PropTypes.bool.isRequired,
  onRegisterInRaffle: PropTypes.func.isRequired,
  shareUrl: PropTypes.string.isRequired,
  onUserLoggedIn: PropTypes.func,
  t: PropTypes.func.isRequired,
};

PublishedFacebookLoginRafflePage.defaultProps = {
  result: null,
  userName: null,
  onUserLoggedIn: () => {},
};

export default translate('FacebookRaffle')(PublishedFacebookLoginRafflePage);
