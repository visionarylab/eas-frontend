import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  apiCall,
  fbAsyncInit,
  injectScript,
  getLikesOnObject,
} from '../../services/FacebookAPI/FacebookAPI';
import i18n from '../../i18n/i18n';

export const FacebookContext = React.createContext();

class FacebookProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedInFB: false,
      userID: null,
      userName: null,
      userPages: null,
    };
  }

  componentDidMount() {
    const updateLoginStatus = response => this.setState({ isLoggedInFB: !!response.authResponse });
    fbAsyncInit(updateLoginStatus);

    const locale = i18n.language.replace('-', '_');
    injectScript(locale);
  }

  getUserDetails = () => {
    if (!this.state.userID) {
      this.queryUserDetails();
    }
    const { userID, userName } = this.state;
    return { userID, userName };
  };

  queryUserPages = async () => {
    const response = await apiCall('/me/accounts');
    if (response && !response.error) {
      const userPages = response.data.map(page => ({
        pageName: page.name,
        accessToken: page.access_token,
      }));
      this.setState({ userPages });
    }
  };

  queryLikesOnObject = async objectId => {
    const accessTokens = this.state.userPages.map(page => page.accessToken);
    const response = await Promise.all(
      accessTokens.map(token => getLikesOnObject(objectId, token)),
    );
    console.log('queryLikesOnObject___response', response);

    // accessTokens.forEach(async pageAccessToken => {
    //   const likers = await getLikesOnObject(objectId, pageAccessToken);
    //   if (likers.length) {
    //     this.onFieldChange('participants', likers);
    //   }
    //   this.setState({ participantsFetched: true });
    // });
  };

  queryUserDetails = async () => {
    const response = await apiCall('/me');
    if (response && !response.error) {
      this.setState({ userID: response.id, userName: response.name });
    }
  };

  render() {
    const context = {
      ...this.state,
      getUserDetails: this.getUserDetails,
      queryUserPages: this.queryUserPages,
      queryLikesOnObject: this.queryLikesOnObject,
    };
    return (
      <FacebookContext.Provider value={context}>{this.props.children}</FacebookContext.Provider>
    );
  }
}
FacebookProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default FacebookProvider;
