import React from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import ReactGA from 'react-ga';
import EASApi from '../../../services/EASApi';

import RandomNumberPage from './RandomNumberPage';
import RandomNumberQuickPage from './RandomNumberQuickPage';

const randomNumberApi = new EASApi.RandomNumberApi();
class RandomNumberPageContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      privateId: null,
      isPublic: false,
      values: {
        title: '',
        description: '',
        rangeMin: '1',
        rangeMax: '10',
        numberOfResults: '1',
        allowRepeated: false,
        dateScheduled: null,
      },
      quickResult: [],
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
      // this.props.onToss(tossResponse.value);
      this.setState({ quickResult: tossResponse.value });
    } catch (err) {
      alert(err);
    }
  };

  handlePublish = async () => {
    const draw = await this.createDraw();
    if (!this.state.values.dateScheduled) {
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
    const { isPublic, values, quickResult } = this.state;
    return isPublic ? (
      <RandomNumberPage
        values={values}
        onFieldChange={this.onFieldChange}
        handlePublish={this.handlePublish}
        checkErrorsInConfiguration={this.checkErrorsInConfiguration}
      />
    ) : (
      <RandomNumberQuickPage
        values={values}
        onFieldChange={this.onFieldChange}
        handleToss={this.handleToss}
        checkErrorsInConfiguration={this.checkErrorsInConfiguration}
        quickResult={quickResult}
      />
    );
  }
}

RandomNumberPageContainer.propTypes = {
  location: ReactRouterPropTypes.location.isRequired,
};

export default RandomNumberPageContainer;
