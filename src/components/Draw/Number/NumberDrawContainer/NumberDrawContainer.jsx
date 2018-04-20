import React from 'react';

import { tossNumberDraw, createPublicNumberDraw } from '../../../../services/EasAPI';
import NumberDraw from '../NumberDraw/NumberDraw';

class NumberDrawContainer extends React.Component {
  constructor(props) {
    super(props);

    this.handleMakeDrawPublic = this.handleMakeDrawPublic.bind(this);
    this.handlePublish = this.handlePublish.bind(this);
    this.handleToss = this.handleToss.bind(this);

    this.state = {
      values: {
        title: '',
        description: '',
        from: 1,
        to: 10,
        numberOfResults: 1,
        allowRepeated: false,
        results: [],
        isPublic: false,
        dateScheduled: null,
      },
    };
  }

  getValue = e => {
    const { value, type, checked } = e.target;
    switch (type) {
      case 'number':
        return parseInt(value, 10);
      case 'checkbox':
        return checked;
      default:
        return value;
    }
  };

  handleToss() {
    const { from, to, numberOfResults, allowRepeated } = this.state.values;
    const draw = tossNumberDraw(from, to, numberOfResults, allowRepeated);
    this.setState(previousState => ({
      values: {
        ...previousState.values,
        results: draw.results,
      },
    }));
  }

  handlePublish() {
    // Publish the draw
    // const { from, to, numberOfResults, allowRepeated } = this.state;
    // const draw = createPublicNumberDraw(from, to, numberOfResults, allowRepeated);
    // Redirect to the public draw
  }

  handleMakeDrawPublic() {
    this.setState(previousState => ({
      values: {
        ...previousState.values,
        isPublic: true,
        results: [],
      },
    }));
  }

  onFieldChange = e => {
    const { name } = e.target;
    const value = this.getValue(e);
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
      <NumberDraw
        values={this.state.values}
        onFieldChange={this.onFieldChange}
        handleToss={this.handleToss}
        handlePublish={this.handlePublish}
        handleMakeDrawPublic={this.handleMakeDrawPublic}
      />
    );
  }
}

export default NumberDrawContainer;
