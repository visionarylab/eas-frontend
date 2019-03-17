/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import ReactRouterPropTypes from 'react-router-prop-types';
import moment from 'moment';
import { RaffleApi, Raffle, Prize, DrawTossPayload } from 'echaloasuerte-js-sdk';

import FacebookLoginRafflePage from './FacebookLoginRafflePage.jsx';
import recentDraws from '../../../services/recentDraws';
import withTracking from '../../withTracking/withTracking.jsx';

const raffleApi = new RaffleApi();
const analyticsDrawType = 'Facebook';

class FacebookLoginRafflePageContainer extends Component {
  constructor(props) {
    super(props);
    const dateScheduled = new Date();
    dateScheduled.setHours(dateScheduled.getHours() + 1);

    this.state = {
      APIError: false,
      values: {
        title: 'Sorteo en Facebook', // TODO This needs to be translated
        description: '',
        participants: [],
        prizes: [],
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

  handlePublish = async () => {
    this.props.history.push(`${this.props.location.pathname}/3`);
  };

  createDraw = () => {
    const { values } = this.state;
    const { title, description, prizes } = values;
    const drawData = {
      title,
      description, // TODO make description mandatory
      prizes: prizes.map(prize => Prize.constructFromObject({ name: prize })),
      participants: [
        {
          name: 'participant1',
          facebook_id: '000000',
        },
      ],
    };
    const facebookLoginDraw = Raffle.constructFromObject(drawData);
    return raffleApi.raffleCreate(facebookLoginDraw);
  };

  handlePublish = async () => {
    const { history } = this.props;
    const { values } = this.state;
    try {
      const draw = await this.createDraw();

      const { dateScheduled } = values;
      const drawTossPayload = DrawTossPayload.constructFromObject({ schedule_date: dateScheduled });
      const tossResponse = await raffleApi.raffleToss(draw.private_id, drawTossPayload);
      const scheduleDate = moment(tossResponse.schedule_date).unix();
      const { track } = this.props;
      track({
        mp: {
          name: `Publish - ${analyticsDrawType}`,
          properties: { drawType: analyticsDrawType, drawId: draw.id },
        },
        ga: { action: 'Publish', category: analyticsDrawType, label: draw.id },
      });

      const drawPath = `/facebook/${draw.id}`;
      recentDraws.add(draw, drawPath, scheduleDate);
      history.push(drawPath);
    } catch (err) {
      this.setState({ APIError: true });
    }
  };

  render() {
    const { values, APIError } = this.state;
    return (
      <FacebookLoginRafflePage
        apiError={APIError}
        values={values}
        onFieldChange={this.onFieldChange}
        handlePublish={this.handlePublish}
      />
    );
  }
}

FacebookLoginRafflePageContainer.propTypes = {
  location: ReactRouterPropTypes.location.isRequired,
  history: ReactRouterPropTypes.history.isRequired,
  match: ReactRouterPropTypes.match.isRequired,
  track: PropTypes.func.isRequired,
};

export default withTracking(translate('FacebookRaffle')(FacebookLoginRafflePageContainer));
