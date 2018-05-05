import React, { Component } from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';

import RaffleDraw from '../RaffleDraw/RaffleDraw';
import { publishRaffleDraw } from '../../../../services/EasAPI';

class RaffleDrawContainer extends Component {
  constructor(props) {
    super(props);

    this.handlePublish = this.handlePublish.bind(this);

    this.state = {
      values: {
        title: '',
        description: '',
        participants: [],
        numberOfWinners: 1,
        winners: [],
        dateScheduled: null,
      },
    };
  }

  onFieldChange = e => {
    const { name, value } = e.target;
    this.setState(previousState => ({
      values: {
        ...previousState.values,
        ...{
          [name]: value,
        },
      },
    }));
  };

  handlePublish() {
    // Publish the draw
    // const draw = createPublicNumberDraw(from, to, numberOfResults, allowRepeated);
    // Redirect to the public draw
    const { title, description, participants, numberOfWinners, dateResultsShown } = this.state;
    const draw = publishRaffleDraw(
      title,
      description,
      participants,
      numberOfWinners,
      dateResultsShown,
    );
    this.props.history.push(`${this.props.location.pathname}/${draw.id}`);
  }

  render() {
    return (
      <RaffleDraw
        values={this.state.values}
        onFieldChange={this.onFieldChange}
        handlePublish={this.handlePublish}
      />
    );
  }
}

RaffleDrawContainer.propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
  location: ReactRouterPropTypes.location.isRequired,
};

export default RaffleDrawContainer;
