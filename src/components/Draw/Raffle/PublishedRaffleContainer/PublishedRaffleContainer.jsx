import React, { Component } from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import PublishedRaffle from '../PublishedRaffle/PublishedRaffle';
import { getRaffleDraw } from '../../../../services/EasAPI';

class PublishedRaffleContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      description: '',
      participants: [],
      numberOfWinners: 1,
      results: [],
    };
  }

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    const drawId = parseInt(this.props.match.params.drawId, 10);
    const raffle = getRaffleDraw(drawId);
    const { title, description, participants, numberOfWinners, results } = raffle;
    this.setState({
      title,
      description,
      participants,
      numberOfWinners,
      results,
    });
  }

  render() {
    const { title, description, participants, numberOfWinners, results } = this.state;
    return (
      <PublishedRaffle
        title={title}
        description={description}
        participants={participants}
        numberOfWinners={numberOfWinners}
        results={results}
      />
    );
  }
}

PublishedRaffleContainer.propTypes = {
  match: ReactRouterPropTypes.match.isRequired,
};

export default PublishedRaffleContainer;
