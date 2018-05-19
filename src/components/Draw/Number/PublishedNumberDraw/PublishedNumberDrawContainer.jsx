import React, { Component } from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';

import { getNumberDraw } from '../../../../services/EasAPI';
import PublishedNumberDraw from '../PublishedNumberDraw/PublishedNumberDraw';
import ApiClient from '../../../../services/api/EASApi';

const { DrawApi, RandomNumber } = ApiClient;
const drawApi = new DrawApi();

class PublishedNumberDrawContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      description: '',
      from: null,
      to: null,
      numberOfResults: null,
      allowRepeated: null,
      results: [],
    };
  }

  componentDidMount() {
    this.loadData();
  }

  async loadData() {
    const drawId = this.props.match.params.drawId;

    const draw = await drawApi.getRandomNumber(drawId);
    const { title, description, results } = draw;
    this.setState({
      title,
      description,
      from: draw.range_min,
      to: draw.range_max,
      results,
    });
  }

  render() {
    const { title, description, from, to, numberOfResults, allowRepeated, results } = this.state;
    return (
      <PublishedNumberDraw
        title={title}
        description={description}
        from={from}
        to={to}
        numberOfResults={numberOfResults}
        allowRepeated={allowRepeated}
        results={results.map(result => result.value)}
      />
    );
  }
}

PublishedNumberDrawContainer.propTypes = {
  match: ReactRouterPropTypes.match.isRequired,
};

export default PublishedNumberDrawContainer;
