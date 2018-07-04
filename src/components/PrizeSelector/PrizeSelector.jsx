import React, { Component } from 'react';
import { translate } from 'react-i18next';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
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
    const { prizes, numberOfWinners, onFieldChange, t } = this.props;
    const { specifyPrizes } = this.state;
    return (
      <div>
        <Grid container spacing={8}>
          <Grid item sm={6}>
            <TextField
              name="numberOfWinners"
              label={t('number_of_winners')}
              placeholder="1"
              margin="normal"
              onChange={e => onFieldChange('numberOfWinners', parseInt(e.target.value, 10))}
              value={specifyPrizes ? prizes.length : numberOfWinners}
              type="number"
              disabled={specifyPrizes}
            />
          </Grid>
          <Grid item sm={6}>
            <FormControlLabel
              control={
                <Checkbox
                  name="specifyPrizes"
                  checked={specifyPrizes}
                  onChange={this.onSpecifyPrizesChange}
                />
              }
              label={t('specify_prizes')}
            />
          </Grid>
        </Grid>
        {this.state.specifyPrizes && (
          <MultiValueInput
            name="prizes"
            label={t('prizes')}
            placeholder="PS4"
            messageEmpty={t('no_prizes_selected')}
            values={prizes}
            onChange={prizes_ => onFieldChange('prizes', prizes_)}
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
