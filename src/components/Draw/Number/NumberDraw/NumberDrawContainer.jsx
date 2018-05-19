import React from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';

import { publishNumberDraw } from '../../../../services/EasAPI';
import NumberDraw from '../NumberDraw/NumberDraw';
import ApiClient from '../../../../services/api/EASApi';

const { DrawApi, RandomNumber } = ApiClient;
const drawApi = new DrawApi();

class NumberDrawContainer extends React.Component {
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
        from: 1,
        to: 10,
        numberOfResults: 1,
        allowRepeated: false,
        results: [],
        isPublic: false,
        dateScheduled: null,
      },
    };
  }

  onFieldChange = e => {
    const { name } = e.target;
    const value = this.getValue(e);
    this.setState(previousState => ({
      drawId: null,
      values: {
        ...previousState.values,
        ...{
          [name]: value,
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
    const { title, description, from, to, numberOfResults, allowRepeated } = this.state.values;
    const randomNumberDraw = RandomNumber.constructFromObject({
      title,
      description,
      range_min: from,
      range_max: to,
    });
    try {
      return await drawApi.createRandomNumber(randomNumberDraw);
    } catch (err) {
      alert(err);
      return null;
    }
  }

  async handleToss() {
    if (!this.state.drawId) {
      const draw = await this.createDraw();
      this.setState({ drawId: draw.id });
    }
    let tossDrawResponse;
    try {
      tossDrawResponse = await drawApi.putRandomNumber(this.state.drawId);
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
    await drawApi.putRandomNumber(draw.id);
    this.props.history.push(`${this.props.location.pathname}/${draw.id}`);
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
      <NumberDraw
        values={this.state.values}
        onFieldChange={this.onFieldChange}
        handleToss={this.handleToss}
        handlePublish={this.handlePublish}
        handleMakeDrawPublic={this.handleMakeDrawPublic}
      />
    );
  }
}

NumberDrawContainer.propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
  location: ReactRouterPropTypes.location.isRequired,
};

export default NumberDrawContainer;
