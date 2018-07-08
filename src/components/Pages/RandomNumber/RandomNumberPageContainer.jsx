import React from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';

import RandomNumberPage from './RandomNumberPage';
import ApiClient from '../../../services/api/EASApi';

const { RandomNumberApi, RandomNumber } = ApiClient;
const randomNumberApi = new RandomNumberApi();
console.log('ApiClient', ApiClient);
console.log('randomNumberApi', randomNumberApi.randomNumberCreate);

class RandomNumberPageContainer extends React.Component {
  constructor(props) {
    super(props);

    this.handleMakeDrawPublic = this.handleMakeDrawPublic.bind(this);
    this.handlePublish = this.handlePublish.bind(this);
    this.handleToss = this.handleToss.bind(this);

    this.state = {
      drawId: null,
      values: {
        title: '',
        description: '',
        rangeMin: 1,
        rangeMax: 10,
        numberOfResults: 1,
        allowRepeated: false,
        results: [],
        isPublic: false,
        whenToToss: 'now',
        dateScheduled: null,
      },
    };
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

  getValue = e => {
    const { value, type, checked } = e.target;
    switch (type) {
      case 'number':
        return parseInt(value, 10);
      case 'checkbox':
        return checked;
      default:
        return value;
    }
  };

  async createDraw() {
    const {
      title,
      description,
      rangeMin,
      rangeMax,
      numberOfResults,
      allowRepeated,
    } = this.state.values;
    const randomNumberDraw = RandomNumber.constructFromObject({
      title,
      description,
      range_min: rangeMin,
      range_max: rangeMax,
    });
    try {
      return await randomNumberApi.createRandomNumber(randomNumberDraw);
    } catch (err) {
      alert(err);
      return null;
    }
  }

  async handleToss() {
    if (!this.state.drawId) {
      const draw = await this.createDraw();
      this.setState({ drawId: draw.private_id });
    }
    let tossDrawResponse;
    try {
      tossDrawResponse = await randomNumberApi.putRandomNumber(this.state.drawId);
    } catch (err) {
      alert(err);
    }
    this.setState(previousState => ({
      values: {
        ...previousState.values,
        results: tossDrawResponse.results[0].value,
      },
    }));
  }

  async handlePublish() {
    const draw = await this.createDraw();
    if (!this.state.whenToToss === 'now') {
      await randomNumberApi.putRandomNumber(draw.private_id);
    }
    this.props.history.push(`${this.props.location.pathname}/${draw.private_id}`);
  }

  handleMakeDrawPublic() {
    this.setState(previousState => ({
      values: {
        ...previousState.values,
        isPublic: true,
        results: [],
      },
    }));
  }

  render() {
    return (
      <RandomNumberPage
        values={this.state.values}
        onFieldChange={this.onFieldChange}
        handleToss={this.handleToss}
        handlePublish={this.handlePublish}
        handleMakeDrawPublic={this.handleMakeDrawPublic}
      />
    );
  }
}

RandomNumberPageContainer.propTypes = {
  location: ReactRouterPropTypes.location.isRequired,
};

export default RandomNumberPageContainer;
