import React, { Component } from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';

import LetterDrawPage from './LetterDrawPage';
import { tossLetterDraw } from '../../../services/EasAPI'; // Remove when the real API is implemented

class LetterDrawPageContainer extends Component {
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
        numberOfLetters: 1,
        results: [],
        isPublic: false,
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

  async createDraw() {
    // const { title, description, numberOfLetters } = this.state.values;
    // const randomNumberDraw = RandomNumber.constructFromObject({
    //   title,
    //   description,
    //   numberOfLetters,
    // });
    // try {
    //   return await drawApi.createRandomNumber(randomNumberDraw);
    // } catch (err) {
    //   alert(err);
    //   return null;
    // }
  }

  async handleToss() {
    // if (!this.state.drawId) {
    //   const draw = await this.createDraw();
    //   this.setState({ drawId: draw.private_id });
    // }
    // let tossDrawResponse;
    // try {
    //   tossDrawResponse = await drawApi.putRandomNumber(this.state.drawId);
    // } catch (err) {
    //   alert(err);
    // }
    this.setState(previousState => ({
      values: {
        ...previousState.values,
        results: tossLetterDraw(this.state.values.numberOfLetters),
      },
    }));
  }

  async handlePublish() {
    const draw = await this.createDraw();
    // await drawApi.putRandomNumber(draw.private_id);
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
    console.log('valuessss', this.state.values);
    return (
      <LetterDrawPage
        values={this.state.values}
        onFieldChange={this.onFieldChange}
        handleToss={this.handleToss}
        handlePublish={this.handlePublish}
        handleMakeDrawPublic={this.handleMakeDrawPublic}
      />
    );
  }
}

LetterDrawPageContainer.propTypes = {
  location: ReactRouterPropTypes.location.isRequired,
};

export default LetterDrawPageContainer;
