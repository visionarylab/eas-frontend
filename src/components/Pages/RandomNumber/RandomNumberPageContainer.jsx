import React from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';

import RandomNumberPage from './RandomNumberPage';

class RandomNumberPageContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isPublic: true,
      results: [],
    };
  }

  onToss = results => {
    this.setState({ results });
  };

  handleMakeDrawPublic = () => {
    this.setState({
      isPublic: true,
    });
  };

  render() {
    return (
      <RandomNumberPage
        isPublic={this.state.isPublic}
        handleMakeDrawPublic={this.handleMakeDrawPublic}
        onToss={this.onToss}
        results={this.state.results}
      />
    );
  }
}

RandomNumberPageContainer.propTypes = {
  location: ReactRouterPropTypes.location.isRequired,
};

export default RandomNumberPageContainer;
