import React, { Component } from 'react';
import { translate } from 'react-i18next';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import MultiValueInput from '../MultiValueInput/MultiValueInput';

class PrizeSelector extends Component {
  onPrizesChange = prizes => {
    this.props.onFieldChange({ target: { name: 'prizes', value: prizes } });
  };
  render() {
    const { props } = this;
    return (
      <div>
        <MultiValueInput
          name="prizes"
          label={props.t('prizes')}
          values={props.prizes}
          placeholder="PS4"
          onChange={this.onPrizesChange}
        />
        <TextField
          name="numberOfWinners"
          label={props.t('number_of_winners')}
          placeholder="1"
          margin="normal"
          onChange={props.onFieldChange}
          value={props.numberOfWinners}
          type="number"
        />
      </div>
    );
  }
}

PrizeSelector.propTypes = {
  prizes: PropTypes.arrayOf(PropTypes.string),
  numberOfWinners: PropTypes.number,
  onFieldChange: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

PrizeSelector.defaultProps = {
  prizes: [],
  numberOfWinners: 1,
};

export default translate('PrizeSelector')(PrizeSelector);
