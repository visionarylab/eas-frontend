import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';

import RaffleDraw from '../RaffleDraw/RaffleDraw';
import {
  tossRaffleDraw,
  createPublicNumberDraw,
  publishRaffleDraw,
} from '../../../../services/EasAPI';

class RaffleDrawContainer extends Component {
  constructor(props) {
    super(props);

    this.handlePublish = this.handlePublish.bind(this);

    this.state = {
      title: 'test title',
      description: '',
      participants: [],
      numberOfWinners: 1,
      winners: [],
      whenResultShown: 'now',
      dateScheduled: Date(),
      values: {
        title: 'test title',
        description: '',
        participants: [],
        numberOfWinners: 1,
        winners: [],
        whenResultShown: 'now',
        dateScheduled: Date(),
      },
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
    // const draw = createPublicNumberDraw(from, to, numberOfResults, allowRepeated);
    // Redirect to the public draw
    const {
      title,
      description,
      participants,
      numberOfWinners,
      whenResultShown,
      dateResultsShown,
    } = this.state;
    const draw = publishRaffleDraw(
      title,
      description,
      participants,
      numberOfWinners,
      whenResultShown,
      dateResultsShown,
    );
    this.props.history.push(`${this.props.location.pathname}/${draw.id}`);
    console.log(draw);
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
