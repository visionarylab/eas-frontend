import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import SectionPanel from '../../../SectionPanel/SectionPanel';
import MultiValueInput from '../../../MultiValueInput/MultiValueInput';
import PrizeSelector from '../../../PrizeSelector/PrizeSelector';

const RaffleDrawForm = props => (
  <div>
    <SectionPanel>
      <Typography variant="title">{props.t('basic_about_info_raffle')}</Typography>
      <TextField
        name="title"
        label={props.t('title')}
        placeholder="Sorte de Navidad"
        margin="normal"
        onChange={e => props.onFieldChange('title', e.target.value)}
        value={props.title}
        type="text"
        fullWidth
      />
      <TextField
        id="multiline-static"
        name="description"
        label={props.t('description')}
        multiline
        rows="4"
        onChange={e => props.onFieldChange('description', e.target.value)}
        value={props.description}
        fullWidth
      />
    </SectionPanel>
    <SectionPanel>
      <Typography variant="title">{props.t('raffle_configuration')}</Typography>
      <MultiValueInput
        name="participants"
        label={props.t('participants')}
        values={props.participants}
        placeholder="David"
        onChange={participants => props.onFieldChange('participants', participants)}
        fullWidth
      />
      <PrizeSelector
        numberOfWinners={props.numberOfWinners}
        prizes={props.prizes}
        onFieldChange={props.onFieldChange}
      />
    </SectionPanel>
  </div>
);

RaffleDrawForm.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  participants: PropTypes.arrayOf(PropTypes.string),
  prizes: PropTypes.arrayOf(PropTypes.string),
  numberOfWinners: PropTypes.number,
  onFieldChange: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

RaffleDrawForm.defaultProps = {
  title: '',
  description: '',
  participants: [],
  prizes: [],
  numberOfWinners: 1,
};

export default translate('RaffleDrawForm')(RaffleDrawForm);
