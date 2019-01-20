import React, { Component } from 'react';
import ReactGA from 'react-ga';
import FlipCoinPage from './FlipCoinPage.jsx';

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
    const { coinSide } = this.state;
    return <FlipCoinPage coinSide={coinSide} onFlip={this.handleFlipCoin} />;
  }
}

FlipCoinPageContainer.propTypes = {};

export default FlipCoinPageContainer;
