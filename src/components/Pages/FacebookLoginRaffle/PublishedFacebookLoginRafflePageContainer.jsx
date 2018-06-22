import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';

import PublishedFacebookLoginRafflePage from './PublishedFacebookLoginRafflePage';
import ApiClient from '../../../services/api/EASApi';
import withFacebookSDK from './../../withFacebookSDK/withFacebookSDK';

const { DrawApi } = ApiClient;

class PublishedFacebookLoginRafflePageContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      description: '',
      participants: [],
      prizes: [],
      results: [],
      userRegisteredInRaffle: false,
    };
  }

  componentDidMount() {
    this.loadData();
  }

  async loadData() {
    const drawId = this.props.match.params.drawId;

    // const draw = await drawApi.getRandomNumber(drawId);
    const draw = {
      title: 'Sorteo de Navidad',
      description: 'This is a complete description',
      results: [],
      participants: ['David', 'Mario', 'Pedro'],
      prizes: ['PS4'],
    };
    this.setState({
      ...draw,
    });
  }

  onRegisterInRaffle = () => {
    // Call EAS API to participate
    const { userName, userID } = this.props.facebookContext.getUserDetails();
    console.log('Register as', userName, userID);
    this.setState({ userRegisteredInRaffle: true });
  };

  render() {
    const {
      title,
      description,
      participants,
      prizes,
      results,
      userRegisteredInRaffle,
    } = this.state;
    const { isLoggedInFB, getUserDetails } = this.props.facebookContext;
    return (
      <PublishedFacebookLoginRafflePage
        title={title}
        description={description}
        participants={participants}
        prizes={prizes}
        results={results.map(result => result.value)}
        isLoggedInFB={isLoggedInFB}
        userName={isLoggedInFB ? getUserDetails().userName : null}
        userRegisteredInRaffle={userRegisteredInRaffle}
        onRegisterInRaffle={this.onRegisterInRaffle}
      />
    );
  }
}

PublishedFacebookLoginRafflePageContainer.propTypes = {
  facebookContext: PropTypes.shape({
    isLoggedInFB: PropTypes.bool.isRequired,
    getUserDetails: PropTypes.func.isRequired,
  }).isRequired,
  match: ReactRouterPropTypes.match.isRequired,
};

export default withFacebookSDK(PublishedFacebookLoginRafflePageContainer);
