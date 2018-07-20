import React, { Component } from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';

import RafflePage from '../RafflePage/RafflePage';
import ApiClient from '../../../services/api/EASApi';

const { RaffleApi, Raffle } = ApiClient;
const raffleApi = new RaffleApi();

class RafflePageContainer extends Component {
  constructor(props) {
    super(props);

    this.handlePublish = this.handlePublish.bind(this);

    this.state = {
      values: {
        title: '',
        description: '',
        participants: [],
        prizes: [],
        numberOfWinners: 1,
        winners: [],
        dateScheduled: null,
      },
    };
  }

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

  async createDraw() {
    const { title, description, participants, prizes } = this.state.values;
    const randomNumberDraw = Raffle.constructFromObject({
      title,
      description,
      metadata: [
        {
          client: 'string',
          key: 'string',
          value: 'string',
        },
      ],
      participants: participants.map(participant => ({ name: participant })),
      prizes: prizes.map(prize => ({ name: prize })),
    });
    try {
      return await raffleApi.raffleCreate(randomNumberDraw);
    } catch (err) {
      alert(err);
      return null;
    }
  }

  async handlePublish() {
    const draw = await this.createDraw();
    this.props.history.push(`${this.props.location.pathname}/${draw.private_id}`);
  }

  render() {
    return (
      <RafflePage
        values={this.state.values}
        onFieldChange={this.onFieldChange}
        handlePublish={this.handlePublish}
      />
    );
  }
}

RafflePageContainer.propTypes = {
  location: ReactRouterPropTypes.location.isRequired,
};

export default RafflePageContainer;
