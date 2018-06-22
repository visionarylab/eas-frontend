import React, { Component } from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';

import PublishedRandomNumberPage from './PublishedRandomNumberPage';
import ApiClient from '../../../services/api/EASApi';

const { DrawApi } = ApiClient;
const drawApi = new DrawApi();

class PublishedRandomNumberPageContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      description: '',
      rangeMin: null,
      rangeMax: null,
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
    const { title, description, range_min: rangeMin, range_max: rangeMax, results } = draw;
    this.setState({
      title,
      description,
      rangeMin,
      rangeMax,
      results,
    });
  }

  render() {
    const {
      title,
      description,
      rangeMin,
      rangeMax,
      numberOfResults,
      allowRepeated,
      results,
    } = this.state;
    return (
      <PublishedRandomNumberPage
        title={title}
        description={description}
        rangeMin={rangeMin}
        rangeMax={rangeMax}
        numberOfResults={numberOfResults}
        allowRepeated={allowRepeated}
        results={results.map(result => result.value)}
      />
    );
  }
}

PublishedRandomNumberPageContainer.propTypes = {
  match: ReactRouterPropTypes.match.isRequired,
};

export default PublishedRandomNumberPageContainer;
