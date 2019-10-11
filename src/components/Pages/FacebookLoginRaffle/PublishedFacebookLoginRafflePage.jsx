/* eslint-disable react/destructuring-assignment */
import React, { useState, useEffect } from 'react';
import { frontloadConnect } from 'react-frontload';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';

import classNames from 'classnames/bind';
import Typography from '@material-ui/core/Typography';
import { withTranslation } from 'react-i18next';

// import moment from 'moment';
import { RaffleApi, RaffleResult, Participant, Prize } from 'echaloasuerte-js-sdk';
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
import ParticipateWithFbPanel from './ParticipateWithFbPanel.jsx';

import { fetchRaffleDraw } from '../../../actions/drawActions';
import withFacebookSDK from '../../withFacebookSDK/withFacebookSDK.jsx';

const c = classNames.bind(STYLES);
const raffleApi = new RaffleApi();
const analyticsDrawType = 'Raffle';

const loadData = async props => {
  const { drawId } = props.match.params;
  await props.fetchRaffleDraw(drawId);
};

const PublishedFacebookLoginRafflePage = props => {
  const { draw, match, t, hostname } = props;
  const { drawId, url } = match.params;
  const { title, description, participants, prizes, result, isLoading } = draw;
  const shareUrl = hostname + url;
  const { isLoggedInFB, loadingFbStatus, logout, userName, userId } = props.facebookContext;
  const [userRegisteredInRaffle, setUserRegisteredInRaffle] = useState(false);

  useEffect(() => {
    const participant = participants.find(p => p.facebook_id === userId);
    if (participant) {
      setUserRegisteredInRaffle(true);
    } else {
      setUserRegisteredInRaffle(false);
    }
  }, [participants, userId]);

  useLoadDataAfterCountdown(result, () => loadData(props));

  if (isLoading) {
    return <LoadingSpinner fullpage />;
  }

  const onRegisterInRaffle = async () => {
    const participant = Participant.constructFromObject({ name: userName, facebook_id: userId });
    /* const response = */ await raffleApi.raffleParticipantsAdd(drawId, participant);
    loadData(props);
  };
  return (
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
            <Typography variant="body2">
              {participants.length > 0 &&
                t('people_registered_already', { count: participants.length })}
              <br />
            </Typography>
            <div className={c('PublishedFacebookRafflePage__participate-with-facebook')}>
              <ParticipateWithFbPanel
                userRegisteredInRaffle={userRegisteredInRaffle}
                loadingFbStatus={loadingFbStatus}
                isLoggedInFB={isLoggedInFB}
                userName={userName}
                onRegisterInRaffle={onRegisterInRaffle}
                logout={logout}
                t={t}
              />
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

PublishedFacebookLoginRafflePage.propTypes = {
  draw: PropTypes.shape({
    title: PropTypes.string,
    participants: PropTypes.arrayOf(PropTypes.instanceOf(Participant)).isRequired,
    prizes: PropTypes.arrayOf(PropTypes.instanceOf(Prize)),
    description: PropTypes.string,
    result: PropTypes.instanceOf(RaffleResult),
    isOwner: PropTypes.bool,
    isLoading: PropTypes.bool,
  }).isRequired,
  facebookContext: PropTypes.shape({
    isLoggedInFB: PropTypes.bool.isRequired,
    loadingFbStatus: PropTypes.bool.isRequired,
    queryUserDetails: PropTypes.func.isRequired,
    userName: PropTypes.string,
    userId: PropTypes.string,
    logout: PropTypes.func.isRequired,
  }).isRequired,
  hostname: PropTypes.string.isRequired,
  match: ReactRouterPropTypes.match.isRequired,
  t: PropTypes.func.isRequired,
};

const TranslatedPage = withFacebookSDK(
  withTranslation('FacebookRaffle')(PublishedFacebookLoginRafflePage),
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
