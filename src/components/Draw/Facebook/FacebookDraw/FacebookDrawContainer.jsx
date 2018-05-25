import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';

import FacebookDraw from './FacebookDraw';
import { fbAsyncInit, getFacebookPages, onGetLikes } from '../../../../services/facebookAPI';

class FacebookDrawContainer extends Component {
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
      ownedPages: [],
    };
  }

  componentDidMount() {
    window.fbAsyncInit = () => {
      const onStatusChange = response => {
        if (response.authResponse) {
          this.setState({ isLoggedInFB: true });
          this.getOwnedPages();
        }
      };
      fbAsyncInit(onStatusChange);
    };

    (function(d, s, id) {
      const fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      const js = d.createElement(s);
      js.id = id;
      js.src = 'https://connect.facebook.net/en_US/sdk.js';
      fjs.parentNode.insertBefore(js, fjs);
    })(document, 'script', 'facebook-jssdk');
  }

  onFieldChange = (fieldName, value) => {
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
    // The following could be improved
    this.state.ownedPages.map(page => page.accessToken).forEach(async pageAccessToken => {
      const participants = await onGetLikes(objectId, pageAccessToken);
      if (participants) {
        this.onFieldChange('participants', participants);
      }
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
    const { isLoggedInFB, ownedPages, values } = this.state;
    return (
      <div>
        <FacebookDraw
          isLoggedInFB={isLoggedInFB}
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

FacebookDrawContainer.propTypes = {
  location: ReactRouterPropTypes.location.isRequired,
};

export default FacebookDrawContainer;
