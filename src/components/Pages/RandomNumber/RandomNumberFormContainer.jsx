import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import ReactRouterPropTypes from 'react-router-prop-types';
import { RandomNumberApi, RandomNumber } from 'echaloasuerte-js-sdk';
import ReactGA from 'react-ga';

import RandomNumberForm from './RandomNumberForm';

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
      privateId: null,
      values: {
        ...previousState.values,
        ...{
          [fieldName]: value,
        },
      },
    }));
  };

  createDraw = async () => {
    const {
      title,
      description,
      rangeMin,
      rangeMax,
      numberOfResults,
      allowRepeated,
    } = this.state.values;

    const publicDetails = {
      title,
      description,
    };
    let drawData = {
      range_min: rangeMin,
      range_max: rangeMax,
      number_of_results: numberOfResults,
      allow_repeated_results: allowRepeated,
    };

    if (this.props.isPublic) {
      drawData = {
        ...drawData,
        ...publicDetails,
      };
    }
    const randomNumberDraw = RandomNumber.constructFromObject(drawData);
    try {
      return await randomNumberApi.randomNumberCreate(randomNumberDraw);
    } catch (err) {
      alert(err);
      return null;
    }
  };

  handleToss = async () => {
    let privateId;
    if (this.state.privateId) {
      privateId = this.state.privateId;
    } else {
      const draw = await this.createDraw();
      privateId = draw.private_id;
      this.setState({ privateId });
    }
    try {
      const tossResponse = await randomNumberApi.randomNumberToss(this.state.privateId, {});
      ReactGA.event({ category: 'Toss', action: 'Random Number', label: 'Local' });
      this.props.onToss(tossResponse.value);
    } catch (err) {
      alert(err);
    }
  };

  handlePublish = async () => {
    const draw = await this.createDraw();
    if (this.state.values.whenToToss === 'now') {
      try {
        await randomNumberApi.randomNumberToss(draw.private_id, {});
        this.props.history.push(`${this.props.location.pathname}/${draw.private_id}`);
      } catch (err) {
        alert(err);
      }
    }
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

RandomNumberFormContainer.propTypes = {
  isPublic: PropTypes.bool.isRequired,
  location: ReactRouterPropTypes.location.isRequired,
};

export default withRouter(RandomNumberFormContainer);
