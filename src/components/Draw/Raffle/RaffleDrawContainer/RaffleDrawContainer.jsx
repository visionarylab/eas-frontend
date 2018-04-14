import React, { Component } from 'react';
import PropTypes from 'prop-types';

import RaffleDraw from '../RaffleDraw/RaffleDraw';
import { tossRaffleDraw, createPublicNumberDraw } from '../../../../services/EasAPI';

class RaffleDrawContainer extends Component {
  constructor(props) {
    super(props);

    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleToss = this.handleToss.bind(this);
    this.handleParticipantsChange = this.handleParticipantsChange.bind(this);
    this.handleNumberOfWinnersChange = this.handleNumberOfWinnersChange.bind(this);
    this.handlePublish = this.handlePublish.bind(this);
    this.handleWhenResultShown = this.handleWhenResultShown.bind(this);

    this.state = {
      title: '',
      description: '',
      participants: [],
      numberOfWinners: 1,
      winners: [],
      whenResultShown: 'now',
    };
  }

  handleToss() {
    const { from, to, numberOfResults, allowRepeated } = this.state;
    const draw = tossRaffleDraw(from, to, numberOfResults, allowRepeated);
    this.setState({
      results: draw.results,
    });
  }

  handlePublish() {
    // Publish the draw
    // const { from, to, numberOfResults, allowRepeated } = this.state;
    // const draw = createPublicNumberDraw(from, to, numberOfResults, allowRepeated);
    // Redirect to the public draw
  }

  handleTitleChange(event) {
    console.log('title changed')
    this.setState({
      title: event.target.value,
    });
  }

  handleDescriptionChange(event) {
    this.setState({
      description: event.target.value,
    });
  }

  handleParticipantsChange(event) {
    this.setState({
      participants: event.target.value,
    });
  }

  handleNumberOfWinnersChange(event) {
    this.setState({
      numberOfWinners: parseInt(event.target.value, 10),
    });
  }

  handleWhenResultShown(event) {
    this.setState({
      whenResultShown: event.target.value,
    });
  }

  render() {
    return (
      <RaffleDraw
        title={this.state.title}
        description={this.state.description}
        participants={this.state.participants}
        winners={this.state.winners}
        numberOfWinners={this.state.numberOfWinners}
        whenResultShown={this.state.whenResultShown}
        handleTitleChange={this.handleTitleChange}
        handleDescriptionChange={this.handleDescriptionChange}
        handleParticipantsChange={this.handleParticipantsChange}
        handleNumberOfWinnersChange={this.handleNumberOfWinnersChange}
        handleWhenResultShown={this.handleWhenResultShown}
        handleToss={this.handleToss}
        handlePublish={this.handlePublish}
      />
    );
  }
}

export default RaffleDrawContainer;
