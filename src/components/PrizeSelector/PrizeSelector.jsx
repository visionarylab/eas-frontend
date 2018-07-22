import React, { Component } from 'react';
import { translate } from 'react-i18next';
import PropTypes from 'prop-types';

import MultiValueInput from '../MultiValueInput/MultiValueInput';
import withFieldValidation from '../withValidation/withFieldValidation';

const ValidatedMultiValueInput = withFieldValidation(MultiValueInput);

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
    const { prizes, numberOfWinners, onFieldChange, t } = this.props; // eslint-disable-line no-unused-vars
    const { specifyPrizes } = this.state; // eslint-disable-line no-unused-vars
    return (
      <div>
        {/* <Grid container spacing={8}> */}
        {/* <Grid item sm={6}>
            <TextField
              name="numberOfWinners"
              label={t('number_of_winners')}
              placeholder="1"
              margin="normal"
              onChange={e => onFieldChange('numberOfWinners', parseInt(e.target.value, 10))}
              value={specifyPrizes ? prizes.length : numberOfWinners}
              type="number"
              disabled={specifyPrizes}
              inputProps={{ 'data-component': 'PrizeSelector__number-of-winners' }}
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
        {this.state.specifyPrizes && ( */}
        <ValidatedMultiValueInput
          name="prizes"
          label={t('prizes')}
          labelDisplayList={t('list_of_prizes')}
          placeholder="PS4"
          messageEmpty={t('no_prizes_selected')}
          value={prizes}
          onChange={prizes_ => onFieldChange('prizes', prizes_)}
          required
        />
        {/* )} */}
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
