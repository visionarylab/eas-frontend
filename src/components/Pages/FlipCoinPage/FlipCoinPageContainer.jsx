import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FlipCoinPage from './FlipCoinPage';

class FlipCoinPageContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coinSide: 'heads',
    };
  }

  handleFlipCoin = () => {
    console.log('asads');
    this.setState({ coinSide: 'tails' });
  };
  render() {
    return <FlipCoinPage coinSide={this.state.coinSide} onFlip={this.handleFlipCoin} />;
  }
}

FlipCoinPageContainer.propTypes = {};

export default FlipCoinPageContainer;
