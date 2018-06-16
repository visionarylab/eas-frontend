import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { fbAsyncInit, getUserName } from '../../services/FacebookAPI/FacebookAPI';

export const FacebookContext = React.createContext();

class FacebookProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedInFB: false,
      userName: null,
    };
  }

  componentDidMount() {
    fbAsyncInit(this.onStatusChange);

    (function(d, s, id) {
      const fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      const js = d.createElement(s);
      js.id = id;
      js.src = 'https://connect.facebook.net/en_US/sdk.js';
      // js.src = 'https://connect.facebook.net/en_US/sdk/debug.js';
      fjs.parentNode.insertBefore(js, fjs);
    })(document, 'script', 'facebook-jssdk');
  }

  onStatusChange = response => this.setState({ isLoggedInFB: !!response.authResponse });

  queryUserName = async () => {
    const userName = await getUserName();
    this.setState({ userName });
  };

  getUserName = () => {
    if (!this.state.userName && this.state.isLoggedInFB) {
      this.queryUserName();
    }
    return this.state.userName;
  };
  render() {
    const context = {
      ...this.state,
      getUserName: this.getUserName,
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
