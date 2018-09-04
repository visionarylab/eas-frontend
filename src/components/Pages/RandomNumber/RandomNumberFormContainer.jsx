import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import ReactRouterPropTypes from 'react-router-prop-types';
import ReactGA from 'react-ga';
import EASApi from '../../../services/EASApi';
// import { RandomNumberApi, RandomNumber } from 'echaloasuerte-js-sdk';

import RandomNumberForm from './RandomNumberForm';

const randomNumberApi = new EASApi.RandomNumberApi();

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
    const randomNumberDraw = EASApi.RandomNumber.constructFromObject(drawData);
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

  checkErrorsInConfiguration = t => {
    const { values } = this.state;
    const rangeMin = parseInt(values.rangeMin, 10);
    const rangeMax = parseInt(values.rangeMax, 10);
    const numberOfResults = parseInt(values.numberOfResults, 10);
    if (rangeMin >= rangeMax) {
      return t('error_in_ranges', {
        min: values.rangeMin,
        max: values.rangeMax,
      });
    } else if (!values.allowRepeated && numberOfResults > rangeMax - rangeMin) {
      return t('range_not_big_enough');
    }
    return undefined;
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
        checkErrorsInConfiguration={this.checkErrorsInConfiguration}
      />
    );
  }
}

RandomNumberFormContainer.propTypes = {
  isPublic: PropTypes.bool.isRequired,
  location: ReactRouterPropTypes.location.isRequired,
};

export default withRouter(RandomNumberFormContainer);
