import React, { Component } from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import PublishedRaffle from './PublishedRafflePage';
import ApiClient from '../../../services/api/EASApi';

const { RaffleApi } = ApiClient;
const raffleApi = new RaffleApi();

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
      isOwner: false,
    };
  }

  componentDidMount() {
    this.loadData();
  }

  onToss = async () => {
    const drawId = this.props.match.params.drawId;
    try {
      await raffleApi.raffleToss(drawId, {});
      this.loadData();
    } catch (err) {
      alert(err);
    }
  };

  async loadData() {
    const drawId = this.props.match.params.drawId;
    const draw = await raffleApi.raffleRead(drawId);
    const { private_id: privateId, title, description, participants, prizes, results } = draw;
    this.setState({
      title,
      description,
      participants: participants.map(participant => participant.name),
      prizes: prizes.map(prize => prize.name),
      results: results.length ? results[0].value : [],
      isOwner: Boolean(privateId),
    });
  }

  render() {
    const {
      title,
      description,
      participants,
      numberOfWinners,
      prizes,
      results,
      isOwner,
    } = this.state;
    return (
      <PublishedRaffle
        title={title}
        description={description}
        participants={participants}
        numberOfWinners={numberOfWinners}
        results={results}
        prizes={prizes}
        onToss={this.onToss}
        isOwner={isOwner}
      />
    );
  }
}

PublishedRafflePageContainer.propTypes = {
  match: ReactRouterPropTypes.match.isRequired,
};

export default PublishedRafflePageContainer;
