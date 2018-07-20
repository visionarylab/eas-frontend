import React from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';

import RandomNumberPage from './RandomNumberPage';
import ApiClient from '../../../services/api/EASApi';

const { RandomNumberApi, RandomNumber } = ApiClient;
const randomNumberApi = new RandomNumberApi();

class RandomNumberPageContainer extends React.Component {
  constructor(props) {
    super(props);

    this.handleMakeDrawPublic = this.handleMakeDrawPublic.bind(this);
    this.handlePublish = this.handlePublish.bind(this);
    this.handleToss = this.handleToss.bind(this);

    this.state = {
      drawPrivateId: null,
      isPublic: true,
      values: {
        title: 'Cool title',
        description: 'Nice description',
        rangeMin: 1,
        rangeMax: 10,
        numberOfResults: 1,
        allowRepeated: false,
        results: [],
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
      metadata: [
        {
          client: 'string',
          key: 'string',
          value: 'string',
        },
      ],
      range_min: rangeMin,
      range_max: rangeMax,
    });
    try {
      return await randomNumberApi.randomNumberCreate(randomNumberDraw);
    } catch (err) {
      alert(err);
      return null;
    }
  }

  async handleToss() {
    if (!this.state.drawPrivateId) {
      const draw = await this.createDraw();
      console.log('draw', draw);

      this.setState({ drawPrivateId: draw.private_id });
    }
    let readDrawResponse;
    try {
      await randomNumberApi.randomNumberToss(this.state.drawPrivateId, {});
      readDrawResponse = await randomNumberApi.randomNumberRead(this.state.drawPrivateId);
      this.setState(previousState => ({
        values: {
          ...previousState.values,
          results: readDrawResponse.results[0].value,
        },
      }));
    } catch (err) {
      alert(err);
    }
  }

  async handlePublish() {
    const draw = await this.createDraw();
    if (this.state.values.whenToToss === 'now') {
      try {
        await randomNumberApi.randomNumberToss(draw.private_id, {});
      } catch (err) {
        alert(err);
      }
    }
    this.props.history.push(`${this.props.location.pathname}/${draw.private_id}`);
  }

  handleMakeDrawPublic() {
    this.setState({
      isPublic: true,
    });
  }

  render() {
    return (
      <RandomNumberPage
        values={this.state.values}
        isPublic={this.state.isPublic}
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
