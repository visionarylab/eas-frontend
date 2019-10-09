/* eslint-disable react/destructuring-assignment */
import React, { useState } from 'react';
import { frontloadConnect } from 'react-frontload';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';

import classNames from 'classnames/bind';
import Typography from '@material-ui/core/Typography';
import { withTranslation } from 'react-i18next';

// import moment from 'moment';
import { RaffleResult, Participant, Prize } from 'echaloasuerte-js-sdk';
// import ApiClient from '../../../services/api/EASApi';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Page from '../../Page/Page.jsx';
import useLoadDataAfterCountdown from '../../../hooks/useLoadDataAfterCountdown';
import DrawLayout from '../../DrawLayout/DrawLayout.jsx';
import DrawHeading from '../../DrawHeading/DrawHeading.jsx';
import FacebookRaffleResult from './FacebookRaffleResult.jsx';
import PrizesOverview from '../../PrizesOverview/PrizesOverview.jsx';

import ResultsBox from '../../ResultsBox/ResultsBox.jsx';
import Countdown from '../../Countdown/Countdown.jsx';
import LoadingSpinner from '../../LoadingSpinner/LoadingSpinner.jsx';
import ShareButtons from '../../ShareButtons/ShareButtons.jsx';
import STYLES from './PublishedFacebookRafflePage.scss';
import FacebookLoginButton from '../../FacebookLoginButton/FacebookLoginButton.jsx';

import { fetchRaffleDraw } from '../../../actions/drawActions';
import withFacebookSDK from '../../withFacebookSDK/withFacebookSDK.jsx';

const c = classNames.bind(STYLES);
const analyticsDrawType = 'Raffle';

const loadData = async props => {
  const { drawId } = props.match.params;
  await props.fetchRaffleDraw(drawId);
};

const onRegisterInRaffle = async () => {
  // const { match } = this.props;
  // const { drawId } = match.params;
  // const { userName, userID } = this.props.facebookContext.getUserDetails();
  // const participant = Participant.constructFromObject({ name: userName, facebook_id: userID });
  // /* const response = */ await raffleApi.raffleParticipantsAdd(drawId, participant);
  // console.log('Register as', userName, userID);
  // this.setState({ userRegisteredInRaffle: true });
};

// const checkIfUserRegistered = async () => {
//   const { userID } = this.props.facebookContext.getUserDetails();
//   const { participants } = this.state;
//   console.log('participants', participants);
//   console.log('userID', userID);
//   const participant = participants.find(p => p.facebook_id === userID);
//   if (participant) {
//     console.log('YES');
//     this.setState({ userRegisteredInRaffle: true });
//   } else {
//     console.log('NO');
//   }
// };

const PublishedFacebookLoginRafflePageContainer = props => {
  const { draw, match, t, hostname } = props;
  const { title, description, participants, prizes, result, isLoading } = draw;
  const shareUrl = hostname + match.url;

  const [userRegisteredInRaffle /* , setUserRegisteredInRaffle */] = useState(false);

  useLoadDataAfterCountdown(result, () => loadData(props));

  if (isLoading) {
    return <LoadingSpinner fullpage />;
  }

  // const ShareButtonsList = () => (
  //   <ShareButtons drawType={analyticsDrawType} sectionTitle={t('share_result')} url={shareUrl} />
  // );

  // componentDidUpdate(prevProps) {
  //   const { userID } = this.props.facebookContext;
  //   console.log('componentDidUpdate', userID);
  //   if (prevProps.facebookContext.userID !== userID && userID) {
  //     this.checkIfUserRegistered();
  //   }
  // }

  // async loadData() {
  //   const { match } = this.props;
  //   const { drawId } = match.params;

  //   const draw = await raffleApi.raffleRead(drawId);
  //   const { title, description, participants, prizes } = draw;
  //   const lastToss = draw.results[0];
  //   const scheduleDate = lastToss.schedule_date;

  //   // DONT USE DOMAIN HERE, USE THE HOSTNAME FROM REDUX
  //   const shareUrl = ''; // config.domain + match.url;

  //   if (scheduleDate > Date.now()) {
  //     const milisecondsMissing = scheduleDate - Date.now();
  //     setTimeout(() => {
  //       this.loadData();
  //     }, milisecondsMissing);
  //   }

  //   this.setState({
  //     // drawId,
  //     title,
  //     description,
  //     participants,
  //     prizes,
  //     result: lastToss,
  //     // isOwner: Boolean(privateId),
  //     isLoading: false,
  //     shareUrl,
  //   });
  // }

  // const {
  //   title,
  //   description,
  //   participants,
  //   prizes,
  //   result,
  //   userRegisteredInRaffle,
  //   shareUrl,
  //   isLoading,
  // } = this.state;
  const { isLoggedInFB, getUserDetails, logout } = props.facebookContext;
  const userName = isLoggedInFB ? getUserDetails().userName : null;
  return (
    // <PublishedFacebookLoginRafflePage
    //   title={title}
    //   description={description}
    //   participants={participants}
    //   prizes={prizes}
    //   result={result}
    //   isLoggedInFB={isLoggedInFB}
    //   userName={isLoggedInFB ? getUserDetails().userName : null}
    //   // userRegisteredInRaffle={userRegisteredInRaffle}
    //   // onRegisterInRaffle={this.onRegisterInRaffle}
    //   onFacebookLogout={logout}
    //   isLoading={isLoading}
    //   shareUrl={shareUrl}
    // />
    <Page
      className={c('PublishedFacebookRafflePage')}
      // ogImage={groupsOgImage}
      htmlTitle={title || t('html_title')}
      htmlDescription={description || t('html_description')}
      htmlKeywords={t('html_keywords')}
      noIndex
      pageType="facebook_raffle_published_draw"
    >
      <DrawLayout>
        <DrawHeading title={title || t('page_title')} subtitle={description} />
        {result.value ? (
          <>
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
          </>
        ) : (
          <>
            <PrizesOverview prizes={prizes} />
            <div className={c('PublishedFacebookRafflePage__participate-with-facebook')}>
              {userRegisteredInRaffle ? (
                <Typography variant="body1" data-testid="FacebookRaffle__participat-registered">
                  You are registered in the raffle as {userName}
                </Typography>
              ) : (
                <>
                  <Typography variant="body2">
                    {participants.length > 0 &&
                      t('people_registered_already', { count: participants.length })}
                    <br />
                  </Typography>
                  {isLoggedInFB ? (
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
                        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                        <Link component="button" variant="caption" onClick={logout}>
                          O accede como otra persona
                        </Link>
                      </Typography>
                    </>
                  ) : (
                    <div>
                      <Typography variant="body2">
                        {t('login_with_facebook_to_participate')}
                      </Typography>
                      <br />
                      <FacebookLoginButton />
                      <Button
                        variant="contained"
                        color="primary"
                        data-testid="FacebookRaffle__participat-button"
                        onClick={onRegisterInRaffle}
                      >
                        login
                      </Button>
                    </div>
                  )}
                </>
              )}
            </div>
            <Countdown date={result.schedule_date} />
            <ShareButtons
              drawType={analyticsDrawType}
              sectionTitle={t('share_draw')}
              url={shareUrl}
            />
          </>
        )}
      </DrawLayout>
    </Page>
  );
};

PublishedFacebookLoginRafflePageContainer.propTypes = {
  draw: PropTypes.shape({
    title: PropTypes.string,
    participants: PropTypes.arrayOf(PropTypes.instanceOf(Participant)).isRequired,
    prizes: PropTypes.arrayOf(PropTypes.instanceOf(Prize)).isRequired,
    description: PropTypes.string,
    result: PropTypes.instanceOf(RaffleResult),
    isOwner: PropTypes.bool,
    isLoading: PropTypes.bool,
  }).isRequired,
  facebookContext: PropTypes.shape({
    isLoggedInFB: PropTypes.bool.isRequired,
    getUserDetails: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
  }).isRequired,
  hostname: PropTypes.string.isRequired,
  match: ReactRouterPropTypes.match.isRequired,
  t: PropTypes.func.isRequired,
};

const TranslatedPage = withFacebookSDK(
  withTranslation('FacebookRaffle')(PublishedFacebookLoginRafflePageContainer),
);

const mapsStateToProps = state => ({
  draw: state.draws.draw,
  hostname: state.userRequest.hostname,
});

export default connect(
  mapsStateToProps,
  { fetchRaffleDraw },
)(
  frontloadConnect(loadData, {
    onMount: true,
    onUpdate: false,
  })(TranslatedPage),
);
