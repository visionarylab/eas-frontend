import React, { Component } from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import PublishedRaffle from './PublishedRafflePage';
import { getRaffleDraw } from '../../../services/EasAPI';

class PublishedRafflePageContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      description: '',
      participants: [],
      numberOfWinners: 1,
      prizes: [],
      results: [],
    };
  }

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    const drawId = parseInt(this.props.match.params.drawId, 10);
    const raffle = getRaffleDraw(drawId);
    const { title, description, participants, numberOfWinners, prizes } = raffle;
    const results = raffle.results.map(result => ({
      winnerName: result.winnerName,
      extraData: result.prize || result.position,
    }));
    this.setState({
      title,
      description,
      participants,
      numberOfWinners,
      prizes,
      results,
    });
  }

  render() {
    const { title, description, participants, numberOfWinners, prizes, results } = this.state;
    return (
      <PublishedRaffle
        title={title}
        description={description}
        participants={participants}
        numberOfWinners={numberOfWinners}
        results={results}
        prizes={prizes}
      />
    );
  }
}

PublishedRafflePageContainer.propTypes = {
  match: ReactRouterPropTypes.match.isRequired,
};

export default PublishedRafflePageContainer;
