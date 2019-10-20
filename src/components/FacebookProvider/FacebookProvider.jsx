import React, { Component } from 'react';
import PropTypes from 'prop-types';
import i18n from 'i18next';
import {
  apiCall,
  fbAsyncInit,
  injectScript,
  getLikesOnObject,
  queryUserDetails,
  logout,
} from '../../services/FacebookAPI/FacebookAPI';

export const FacebookContext = React.createContext();

class FacebookProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loadingFbStatus: true,
      loadingFbDetails: true,
      isLoggedInFB: false,
      userId: null,
      userName: null,
      userPages: null,
    };
  }

  componentDidMount() {
    const updateLoginStatus = async response => {
      // status: connected == logged in
      // status: unknown == logged out
      const isLoggedInFB = response.status === 'connected' && !!response.authResponse;
      if (!isLoggedInFB) {
        this.setState({
          isLoggedInFB: false,
          loadingFbStatus: false,
        });
      } else {
        try {
          const userDetails = await queryUserDetails();
          this.setState({
            isLoggedInFB: true,
            loadingFbStatus: false,
            userId: userDetails.userId,
            userName: userDetails.userName,
          });
        } catch (e) {
          this.setState({
            isLoggedInFB: false,
            loadingFbStatus: false,
          });
        }
      }
    };
    fbAsyncInit(updateLoginStatus);
    const locale = i18n.language.replace('-', '_');
    injectScript(locale);
  }

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
    const { userPages } = this.state;
    const accessTokens = userPages.map(page => page.accessToken);
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

  render() {
    const context = {
      ...this.state,
      queryUserDetails,
      queryUserPages: this.queryUserPages,
      queryLikesOnObject: this.queryLikesOnObject,
      logout,
    };
    const { children } = this.props;
    return <FacebookContext.Provider value={context}>{children}</FacebookContext.Provider>;
  }
}
FacebookProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default FacebookProvider;
