import React, { Component } from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import PublishedRaffle from './PublishedRafflePage';
import ApiClient from '../../../services/api/EASApi';

const { RaffleApi, DrawTossPayload } = ApiClient;
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
      result: null,
      isOwner: false,
      values: {
        whenToToss: 'schedule',
        dateScheduled: 'Sun Jul 22 2018 21:17:22 GMT+0200 (Central European Summer Time)',
      },
    };
  }

  componentDidMount() {
    this.loadData();
  }

  onToss = async () => {
    const drawId = this.props.match.params.drawId;
    const { whenToToss, dateScheduled } = this.state.values;
    let payload = {};
    if (whenToToss === 'schedule') {
      payload = DrawTossPayload.constructFromObject({
        schedule_date: new Date(dateScheduled).toISOString(),
      });
    }
    try {
      await raffleApi.raffleToss(drawId, payload);
      this.loadData();
    } catch (err) {
      alert(err);
    }
  };

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

  async loadData() {
    const drawId = this.props.match.params.drawId;
    const draw = await raffleApi.raffleRead(drawId);
    const { private_id: privateId, title, description, participants, prizes } = draw;

    let result;
    if (draw.results.length) {
      const lastToss = draw.results[0];
      if (lastToss.value) {
        result = lastToss;
      } else {
        result = lastToss;
      }
    }
    this.setState({
      title,
      description,
      participants: participants.map(participant => participant.name),
      prizes: prizes.map(prize => prize.name),
      result,
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
      result,
      isOwner,
      values,
    } = this.state;
    return (
      <PublishedRaffle
        title={title}
        description={description}
        participants={participants}
        numberOfWinners={numberOfWinners}
        result={result}
        prizes={prizes}
        onToss={this.onToss}
        isOwner={isOwner}
        values={values}
        onFieldChange={this.onFieldChange}
      />
    );
  }
}

PublishedRafflePageContainer.propTypes = {
  match: ReactRouterPropTypes.match.isRequired,
};

export default PublishedRafflePageContainer;
