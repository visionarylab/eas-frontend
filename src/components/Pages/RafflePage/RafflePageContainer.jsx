import React, { Component } from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import { withRouter } from 'react-router';
import ReactGA from 'react-ga';
import { RaffleApi, Raffle, DrawTossPayload } from 'echaloasuerte-js-sdk';

import RafflePage from './RafflePage.jsx';

const raffleApi = new RaffleApi();

class RafflePageContainer extends Component {
  constructor(props) {
    super(props);

    const now = new Date();
    now.setHours(now.getHours() + 1);
    const dateScheduled = now;

    this.state = {
      values: {
        title: '',
        description: '',
        participants: [],
        prizes: [],
        numberOfWinners: 1,
        winners: [],
        dateScheduled,
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
    const { values } = this.state;
    const { title, description, participants, prizes } = values;
    const randomNumberDraw = Raffle.constructFromObject({
      title,
      description,
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
    const { values } = this.state;
    const draw = await this.createDraw();
    const { history, match } = this.props;
    const { dateScheduled } = values;
    const drawTossPayload = DrawTossPayload.constructFromObject({ schedule_date: dateScheduled });
    await raffleApi.raffleToss(draw.private_id, drawTossPayload);
    ReactGA.event({ category: 'Publish', action: 'Raffle', label: draw.id });
    const drawPathname = `${match.path}/${draw.private_id}`;
    history.push(drawPathname);
  };

  render() {
    const { values } = this.state;
    return (
      <RafflePage
        values={values}
        onFieldChange={this.onFieldChange}
        handlePublish={this.handlePublish}
      />
    );
  }
}

RafflePageContainer.propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
  match: ReactRouterPropTypes.match.isRequired,
};

export default withRouter(RafflePageContainer);
