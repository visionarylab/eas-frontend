/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';
import { RaffleApi, Participant } from 'echaloasuerte-js-sdk';
import PublishedFacebookLoginRafflePage from './PublishedFacebookLoginRafflePage.jsx';
// import ApiClient from '../../../services/api/EASApi';

import withFacebookSDK from '../../withFacebookSDK/withFacebookSDK.jsx';
import config from '../../../config/config';

const raffleApi = new RaffleApi();

class PublishedFacebookLoginRafflePageContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      description: '',
      participants: [],
      prizes: [],
      result: null,
      userRegisteredInRaffle: false,
      isLoading: true,
      shareUrl: '',
    };
  }

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate(prevProps, prevState) {
    const { userID } = this.props.facebookContext;
    console.log('componentDidUpdate', userID);
    if (prevProps.facebookContext.userID !== userID && userID) {
      this.checkIfUserRegistered();
    }
  }

  onRegisterInRaffle = async () => {
    const { match } = this.props;
    const { drawId } = match.params;
    const { userName, userID } = this.props.facebookContext.getUserDetails();

    const participant = Participant.constructFromObject({ name: userName, facebook_id: userID });
    const response = await raffleApi.raffleParticipantsAdd(drawId, participant);
    console.log('Register as', userName, userID);
    this.setState({ userRegisteredInRaffle: true });
  };

  checkIfUserRegistered = async () => {
    const { userID } = this.props.facebookContext.getUserDetails();
    const { participants } = this.state;
    console.log('participants', participants);
    console.log('userID', userID);
    const participant = participants.find(p => p.facebook_id === userID);
    if (participant) {
      console.log('YES');
      this.setState({ userRegisteredInRaffle: true });
    } else {
      console.log('NO');
    }
  };

  async loadData() {
    const { match } = this.props;
    const { drawId } = match.params;

    const draw = await raffleApi.raffleRead(drawId);
    const { title, description, participants, prizes } = draw;
    const lastToss = draw.results[0];
    const scheduleDate = lastToss.schedule_date;
    const shareUrl = config.domain + match.url;

    if (scheduleDate > Date.now()) {
      const milisecondsMissing = scheduleDate - Date.now();
      setTimeout(() => {
        this.loadData();
      }, milisecondsMissing);
    }

    this.setState({
      drawId,
      title,
      description,
      participants,
      prizes,
      result: lastToss,
      // isOwner: Boolean(privateId),
      isLoading: false,
      shareUrl,
    });
  }

  render() {
    const {
      title,
      description,
      participants,
      prizes,
      result,
      userRegisteredInRaffle,
      shareUrl,
      isLoading,
    } = this.state;
    const { isLoggedInFB, getUserDetails, logout } = this.props.facebookContext;
    return (
      <PublishedFacebookLoginRafflePage
        title={title}
        description={description}
        participants={participants}
        prizes={prizes}
        result={result}
        isLoggedInFB={isLoggedInFB}
        userName={isLoggedInFB ? getUserDetails().userName : null}
        userRegisteredInRaffle={userRegisteredInRaffle}
        onRegisterInRaffle={this.onRegisterInRaffle}
        onFacebookLogout={logout}
        isLoading={isLoading}
        shareUrl={shareUrl}
      />
    );
  }
}

PublishedFacebookLoginRafflePageContainer.propTypes = {
  facebookContext: PropTypes.shape({
    isLoggedInFB: PropTypes.bool.isRequired,
    getUserDetails: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
  }).isRequired,
};

export default withFacebookSDK(PublishedFacebookLoginRafflePageContainer);
