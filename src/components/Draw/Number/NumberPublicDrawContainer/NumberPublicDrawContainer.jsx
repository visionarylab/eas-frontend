import React from 'react';

import { tossNumberDraw, createPublicNumberDraw } from '../../../../services/EasAPI';
import NumberPublicDraw from '../NumberPublicDraw/NumberPublicDraw';

class NumberPublicDrawContainer extends React.Component {
  constructor(props) {
    super(props);

    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleToss = this.handleToss.bind(this);
    this.handleFromChange = this.handleFromChange.bind(this);
    this.handleToChange = this.handleToChange.bind(this);
    this.handleNumberOfResultsChange = this.handleNumberOfResultsChange.bind(this);
    this.handleAllowRepeatedChange = this.handleAllowRepeatedChange.bind(this);
    this.handleMakeDrawPublic = this.handleMakeDrawPublic.bind(this);

    this.state = {
      title: '',
      description: '',
      from: 1,
      to: 10,
      numberOfResults: 1,
      allowRepeated: false,
      results: [],
      public: false,
    };
  }

  handleToss() {
    const { from, to, numberOfResults, allowRepeated } = this.state;
    const draw = tossNumberDraw(from, to, numberOfResults, allowRepeated);
    this.setState({
      results: draw.results,
    });
  }

  handleTitleChange(event) {
    this.setState({
      title: event.target.value,
    });
  }

  handleDescriptionChange(event) {
    this.setState({
      description: event.target.value,
    });
  }

  handleFromChange(event) {
    this.setState({
      from: parseInt(event.target.value, 10),
    });
  }

  handleToChange(event) {
    this.setState({
      to: parseInt(event.target.value, 10),
    });
  }

  handleNumberOfResultsChange(event) {
    this.setState({
      numberOfResults: parseInt(event.target.value, 10),
    });
  }

  handleAllowRepeatedChange(event) {
    this.setState({
      allowRepeated: event.target.checked,
    });
  }

  handleMakeDrawPublic(event) {
    this.setState({
      public: true,
      results: [],
    });
    // const { from, to, numberOfResults, allowRepeated } = this.state;
    // const draw = createPublicNumberDraw(from, to, numberOfResults, allowRepeated);
    // Redirect to the public draw
  }

  render() {
    return (
      <NumberPublicDraw
        title={this.state.title}
        description={this.state.description}
        from={this.state.from}
        to={this.state.to}
        results={this.state.results}
        numberOfResults={this.state.numberOfResults}
        allowRepeated={this.state.allowRepeated}
        public={this.state.public}
        handleTitleChange={this.handleTitleChange}
        handleDescriptionChange={this.handleDescriptionChange}
        handleFromChange={this.handleFromChange}
        handleToChange={this.handleToChange}
        handleAllowRepeatedChange={this.handleAllowRepeatedChange}
        handleNumberOfResultsChange={this.handleNumberOfResultsChange}
        handleMakeDrawPublic={this.handleMakeDrawPublic}
        handleToss={this.handleToss}
      />
    );
  }
}

export default NumberPublicDrawContainer;
