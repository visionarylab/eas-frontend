import React, { Component } from 'react';
import ReactGA from 'react-ga';
import FlipCoinPage from './FlipCoinPage';

class FlipCoinPageContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coinSide: 'heads',
    };
  }

  handleFlipCoin = () => {
    const coinSide = Math.floor(Math.random() * 2) ? 'heads' : 'tails';
    ReactGA.event({ category: 'Toss', action: 'Coin' });
    this.setState({ coinSide });
  };
  render() {
    return <FlipCoinPage coinSide={this.state.coinSide} onFlip={this.handleFlipCoin} />;
  }
}

FlipCoinPageContainer.propTypes = {};

export default FlipCoinPageContainer;
