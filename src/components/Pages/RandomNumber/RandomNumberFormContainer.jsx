import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

import ApiClient from '../../../services/api/EASApi';

import RandomNumberForm from './RandomNumberForm';

const { RandomNumberApi, RandomNumber } = ApiClient;
const randomNumberApi = new RandomNumberApi();

class RandomNumberFormContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      privateId: null,
      values: {
        title: 'Cool title',
        description: 'Nice description',
        rangeMin: '1',
        rangeMax: '10',
        numberOfResults: '1',
        allowRepeated: false,
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

  createDraw = async () => {
    console.log('create');
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
  };

  handleToss = async () => {
    if (!this.state.drawPrivateId) {
      const draw = await this.createDraw();
      this.setState({ drawPrivateId: draw.private_id });
    }
    let readDrawResponse;
    try {
      console.log('1');
      await randomNumberApi.randomNumberToss(this.state.drawPrivateId, {});
      console.log('2');
      readDrawResponse = await randomNumberApi.randomNumberRead(this.state.drawPrivateId);
      this.props.onToss(readDrawResponse.results[0].value);
    } catch (err) {
      alert(err);
    }
  };

  handlePublish = async () => {
    const draw = await this.createDraw();
    if (this.state.values.whenToToss === 'now') {
      try {
        await randomNumberApi.randomNumberToss(draw.private_id, {});
      } catch (err) {
        alert(err);
      }
    }
    this.props.history.push(`${this.props.location.pathname}/${draw.private_id}`);
  };

  render() {
    return (
      <RandomNumberForm
        values={this.state.values}
        isPublic={this.props.isPublic}
        onFieldChange={this.onFieldChange}
        handleToss={this.handleToss}
        handlePublish={this.handlePublish}
        handleMakeDrawPublic={this.handleMakeDrawPublic}
      />
    );
  }
}

RandomNumberFormContainer.propTypes = {};

export default withRouter(RandomNumberFormContainer);
