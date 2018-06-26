import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';

import FacebookPhotoRafflePage from './FacebookPhotoRafflePage';
import withFacebookSDK from './../../withFacebookSDK/withFacebookSDK';

import {
  getFacebookPages,
  onGetLikes,
  getObjectIdFromUrl,
} from '../../../services/FacebookAPI/FacebookAPI';

class FacebookPhotoRafflePageContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      values: {
        title: '',
        description: '',
        url: '',
        // participants: ['David Naranjo', 'Mr. Nobody'],
        participants: [],
        prizes: [],
        numberOfWinners: 1,
        winners: [],
        dateScheduled: null,
      },
      isLoggedInFB: false,
      participantsFetched: false,
      ownedPages: [],
    };
  }

  onFieldChange = (fieldName, value) => {
    if (fieldName === 'url') {
      try {
        getObjectIdFromUrl(this.state.values.url);
      } catch (error) {
        console.log('INVALID URL');
      }
    }
    console.log('onfliedChange', fieldName, value);
    this.setState(previousState => ({
      values: {
        ...previousState.values,
        ...{
          [fieldName]: value,
        },
      },
    }));
  };

  onGetLikes = async () => {
    const objectId = '1775681819145291_1775711522475654';
    // const objectId = '1775681819145291';
    // const objectId = getObjectIdFromUrl(this.state.values.url);
    // The following could be improved
    const userPages = this.props.facebookContext.getUserPages();
    userPages.map(page => page.accessToken).forEach(async pageAccessToken => {
      const participants = await onGetLikes(objectId, pageAccessToken);
      if (participants) {
        this.onFieldChange('participants', participants);
      }
      this.setState({ participantsFetched: true });
    });
  };

  getOwnedPages = async () => {
    const facebookPages = await getFacebookPages();
    this.setState({ ownedPages: facebookPages });
  };

  handlePublish = async () => {
    this.props.history.push(`${this.props.location.pathname}/3`);
  };

  render() {
    const { ownedPages, values, participantsFetched } = this.state;
    const { isLoggedInFB, getUserPages } = this.props.facebookContext;
    const userPages = isLoggedInFB ? getUserPages() : null;
    console.log('pages', userPages);
    return (
      <div>
        <FacebookPhotoRafflePage
          isLoggedInFB={isLoggedInFB}
          // userPages={isLoggedInFB ? getuserPages() : null}
          participantsFetched={participantsFetched}
          ownedPages={ownedPages}
          values={values}
          onGetLikes={this.onGetLikes}
          onFieldChange={this.onFieldChange}
          handlePublish={this.handlePublish}
        />
      </div>
    );
  }
}

FacebookPhotoRafflePageContainer.propTypes = {
  facebookContext: PropTypes.shape({
    isLoggedInFB: PropTypes.bool.isRequired,
    getUserDetails: PropTypes.func.isRequired,
    getUserPages: PropTypes.func.isRequired,
  }).isRequired,
  location: ReactRouterPropTypes.location.isRequired,
};

export default withFacebookSDK(FacebookPhotoRafflePageContainer);
