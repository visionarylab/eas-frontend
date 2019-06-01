import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SpinArrowPage from './SpinArrowPage.jsx';
import withTracking from '../../withTracking/withTracking.jsx';

const analyticsDrawType = 'Spin Arrow';

class ArrowPageContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      angle: 0,
    };
  }

  handleToss = () => {
    const { track } = this.props;
    track({
      mp: { name: `Toss - ${analyticsDrawType}`, properties: { drawType: analyticsDrawType } },
      ga: { action: 'Toss', category: analyticsDrawType },
    });
    const angle = Math.floor(Math.random() * 360);
    const randomInitialSpin = Math.floor(Math.random() * 5 + 8) * 360;
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

ArrowPageContainer.propTypes = {
  track: PropTypes.func.isRequired,
};

export default withTracking(ArrowPageContainer);
