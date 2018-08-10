import React, { Component } from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import { withRouter } from 'react-router';

import RafflePage from './RafflePage';
import ApiClient from '../../../services/api/EASApi';

const { RaffleApi, Raffle } = ApiClient;
const raffleApi = new RaffleApi();

class RafflePageContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      privateId: null,
      values: {
        title: 'the title',
        description: 'desc',
        participants: ['aa', 'bb'],
        prizes: ['11'],
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

  createDraw = async () => {
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
  };

  handlePublish = async () => {
    const draw = await this.createDraw();
    this.props.history.push(`${this.props.location.pathname}/${draw.private_id}`);
  };

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

export default withRouter(RafflePageContainer);
