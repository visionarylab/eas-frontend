import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-translate';
import Grid from 'material-ui/Grid';
import TextField from 'material-ui/TextField';

const RaffleDrawForm = props => (
  <div>
    <div>
      <TextField
        label={props.t('title')}
        placeholder="Sorte de Navidad"
        margin="normal"
        onChange={props.handleTitleChange}
        value={props.title}
        type="text"
        fullWidth
      />
      <TextField
        id="multiline-static"
        label={props.t('description')}
        multiline
        rows="4"
        onChange={props.handleDescriptionChange}
        value={props.description}
        fullWidth
      />
    </div>

    {/* <Grid item sm={12}> */}

    <TextField
      label={props.t('participants')}
      placeholder="David"
      margin="normal"
      onChange={props.handleParticipantsChange}
      value={props.participants}
      type="text"
      fullWidth
    />
    {/* </Grid> */}
    {/* <Grid item sm={12}> */}
    <TextField
      label={props.t('number_of_winners')}
      placeholder="1"
      margin="normal"
      onChange={props.handleNumberOfWinnersChange}
      value={props.numberOfWinners}
      type="number"
    />
    {/* </Grid> */}
  </div>
);

RaffleDrawForm.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  participants: PropTypes.arrayOf(PropTypes.string).isRequired,
  numberOfWinners: PropTypes.number.isRequired,
  handleTitleChange: PropTypes.func.isRequired,
  handleDescriptionChange: PropTypes.func.isRequired,
  handleParticipantsChange: PropTypes.func.isRequired,
  handleNumberOfWinnersChange: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

export default translate('RaffleDrawForm')(RaffleDrawForm);
