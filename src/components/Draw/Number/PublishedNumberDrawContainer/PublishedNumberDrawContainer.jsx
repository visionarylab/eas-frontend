import React, { Component } from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';

import { getNumberDraw } from '../../../../services/EasAPI';
import PublishedNumberDraw from '../PublishedNumberDraw/PublishedNumberDraw';

class PublishedNumberDrawContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      description: '',
      from: 0,
      to: 10,
      numberOfResults: 1,
      allowRepeated: false,
      results: [2, 6],
    };
  }

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    const drawId = parseInt(this.props.match.params.drawId, 10);
    const numberDraw = getNumberDraw(drawId);
    const { title, description, from, to, numberOfResults, allowRepeated, results } = numberDraw;
    this.setState({
      title,
      description,
      from,
      to,
      numberOfResults,
      allowRepeated,
      results,
    });
  }

  render() {
    const { title, description, from, to, numberOfResults, allowRepeated, results } = this.state;
    return (
      <PublishedNumberDraw
        title={title}
        description={description}
        from={from}
        to={to}
        numberOfResults={numberOfResults}
        allowRepeated={allowRepeated}
        results={results}
      />
    );
  }
}

PublishedNumberDrawContainer.propTypes = {
  match: ReactRouterPropTypes.match.isRequired,
};

export default PublishedNumberDrawContainer;
