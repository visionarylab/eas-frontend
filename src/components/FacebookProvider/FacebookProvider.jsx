import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { apiCall, fbAsyncInit } from '../../services/FacebookAPI/FacebookAPI';
import i18n from '../../i18n/i18n';

export const FacebookContext = React.createContext();

class FacebookProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedInFB: false,
      userID: null,
      userName: null,
      userPages: [],
    };
  }

  componentDidMount() {
    fbAsyncInit(this.onStatusChange);

    // eslint-disable-next-line func-names
    (function(d, s, id) {
      const fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      const js = d.createElement(s);
      js.id = id;
      const locale = i18n.language.replace('-', '_');
      js.src = `https://connect.facebook.net/${locale}/sdk.js`;
      fjs.parentNode.insertBefore(js, fjs);
    })(document, 'script', 'facebook-jssdk');
  }

  onStatusChange = response => this.setState({ isLoggedInFB: !!response.authResponse });

  getUserDetails = () => {
    if (!this.state.userID) {
      this.queryUserDetails();
    }
    const { userID, userName } = this.state;
    return { userID, userName };
  };

  getUserPages = () => {
    if (!this.state.userPages.length) {
      this.queryFacebookPages();
    }
    return this.state.userPages;
  };

  queryFacebookPages = async () => {
    const response = await apiCall('/me/accounts');
    if (response && !response.error) {
      const userPages = response.data.map(page => ({
        pageName: page.name,
        accessToken: page.access_token,
      }));
      // if (pages.length) {
      this.setState({ userPages });
      // }
    }
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
      getUserPages: this.getUserPages,
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
