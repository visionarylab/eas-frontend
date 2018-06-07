import React, { Component } from 'react';
import { translate } from 'react-i18next';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';

import MultiValueInput from '../MultiValueInput/MultiValueInput';

class PrizeSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      specifyPrizes: props.prizes.length > 0,
    };
  }

  onSpecifyPrizesChange = e => {
    this.setState({ specifyPrizes: e.target.checked });
  };

  render() {
    const { props } = this;
    console.log('numberOfWinners', props.numberOfWinners);
    return (
      <div>
        <FormGroup row>
          <TextField
            name="numberOfWinners"
            label={props.t('number_of_winners')}
            placeholder="1"
            margin="normal"
            onChange={e => props.onFieldChange('numberOfWinners', parseInt(e.target.value, 10))}
            value={props.numberOfWinners}
            type="number"
          />
          <FormControlLabel
            control={
              <Checkbox
                name="specifyPrizes"
                checked={this.state.specifyPrizes}
                onChange={this.onSpecifyPrizesChange}
              />
            }
            label={props.t('specify_prizes')}
          />
        </FormGroup>
        {this.state.specifyPrizes && (
          <MultiValueInput
            name="prizes"
            label={props.t('prizes')}
            values={props.prizes}
            placeholder="PS4"
            onChange={prizes => props.onFieldChange('prizes', prizes)}
          />
        )}
      </div>
    );
  }
}

PrizeSelector.propTypes = {
  prizes: PropTypes.arrayOf(PropTypes.string).isRequired,
  numberOfWinners: PropTypes.number.isRequired,
  onFieldChange: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

export default translate('PrizeSelector')(PrizeSelector);
