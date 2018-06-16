import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';

import { getNumberDraw } from '../../../services/EasAPI';
import PublishedFacebookLoginDraw from './PublishedFacebookLoginDraw';
import ApiClient from '../../../services/api/EASApi';
import withFacebookSDK from './../../withFacebookSDK/withFacebookSDK';

const { DrawApi } = ApiClient;
const drawApi = new DrawApi();

class PublishedFacebookLoginDrawContainer extends Component {
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
    console.log('register!!');
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
    const { isLoggedInFB, getUserName } = this.props.facebookContext;
    return (
      <PublishedFacebookLoginDraw
        title={title}
        description={description}
        participants={participants}
        prizes={prizes}
        results={results.map(result => result.value)}
        isLoggedInFB={isLoggedInFB}
        userName={getUserName()}
        userRegisteredInRaffle={userRegisteredInRaffle}
        onRegisterInRaffle={this.onRegisterInRaffle}
      />
    );
  }
}

PublishedFacebookLoginDrawContainer.propTypes = {
  facebookContext: PropTypes.shape({
    isLoggedInFB: PropTypes.bool.isRequired,
    getUserName: PropTypes.func.isRequired,
  }).isRequired,
  match: ReactRouterPropTypes.match.isRequired,
};

export default withFacebookSDK(PublishedFacebookLoginDrawContainer);
