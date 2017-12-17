import React from 'react';
import PropTypes from 'prop-types';
import { Grid, TextField, Button } from 'material-ui';
import { translate } from 'react-translate';

import { tossLetterDraw } from '../../../services/EasAPI';

class Letter extends React.Component {
  constructor(props) {
    super(props);

    this.handleNumberOfLettersChange = this.handleNumberOfLettersChange.bind(this);
    this.handleToss = this.handleToss.bind(this);

    this.state = {
      numberOfLetters: props.numberOfLetters,
      results: props.results,
    };
  }

  handleNumberOfLettersChange(event) {
    this.setState({
      numberOfLetters: parseInt(event.target.value, 10),
    });
  }

  handleToss() {
    const results = tossLetterDraw(this.state.numberOfLetters);
    this.setState({
      results,
    });
  }

  render() {
    return (
      <Grid>
        <TextField
          label={this.props.t('number_of_letters')}
          placeholder="1"
          margin="normal"
          onChange={this.handleNumberOfLettersChange}
          value={this.state.numberOfLetters}
          type="number"
        />
        <div>
          <Button raised color="primary" onClick={this.handleToss} >
            {this.props.t('generate_letters')}
          </Button>
        </div>
        <div>
          {this.state.results}
        </div>
      </Grid>
    );
  }
}

Letter.propTypes = {
  numberOfLetters: PropTypes.number,
  results: PropTypes.arrayOf(PropTypes.string),
};

Letter.defaultProps = {
  numberOfLetters: 1,
  results: [],
};

export default translate('Letter')(Letter);
