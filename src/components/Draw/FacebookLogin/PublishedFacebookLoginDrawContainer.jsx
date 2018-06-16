import React, { Component } from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';

import { getNumberDraw } from '../../../services/EasAPI';
import PublishedFacebookLoginDraw from './PublishedFacebookLoginDraw';
import ApiClient from '../../../services/api/EASApi';
import withFacebookSDK from '../../withFacebookSDK/withFacebookSDK';

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
      description: 'This is a complete descriotion',
      results: [],
      participants: ['David', 'Mario', 'Pedro'],
      prizes: ['PS4'],
    };
    this.setState({
      ...draw,
    });
  }

  render() {
    const { title, description, participants, prizes, results } = this.state;
    return (
      <PublishedFacebookLoginDraw
        title={title}
        description={description}
        participants={participants}
        prizes={prizes}
        results={results.map(result => result.value)}
      />
    );
  }
}

PublishedFacebookLoginDrawContainer.propTypes = {
  match: ReactRouterPropTypes.match.isRequired,
};

export default withFacebookSDK(PublishedFacebookLoginDrawContainer);
