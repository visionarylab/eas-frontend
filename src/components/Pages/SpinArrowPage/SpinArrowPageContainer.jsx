import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SpinArrowPage from './SpinArrowPage';

class ArrowPageContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      angle: 0,
    };
  }

  handleToss = () => {
    const angle = 100;
    const randomInitialSpin = Math.floor(Math.random() * 10 + 5) * 360;
    this.setState(previousState => {
      const currentAngle = previousState.angle;
      const degreesUntilZero = 360 - (currentAngle % 360);
      const totalRotation = currentAngle + degreesUntilZero + randomInitialSpin + angle;
      return {
        angle: totalRotation,
      };
    });
  };

  render() {
    const { angle } = this.state;
    return <SpinArrowPage angle={angle} handleToss={this.handleToss} />;
  }
}

ArrowPageContainer.propTypes = {};

export default ArrowPageContainer;