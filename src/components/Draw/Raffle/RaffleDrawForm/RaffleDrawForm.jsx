import React from 'react';
import PropTypes from 'prop-types';
import { translate } from "react-i18next";
import TextField from 'material-ui/TextField';

const RaffleDrawForm = props => {
  const onParticipantsChange = e => {
    const participants = e.target.value.split(',');
    props.onFieldChange({ target: { name: 'participants', value: participants } });
  };

  return (
    <div>
      <div>
        <TextField
          name="title"
          label={props.t('title')}
          placeholder="Sorte de Navidad"
          margin="normal"
          onChange={props.onFieldChange}
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
          onChange={props.onFieldChange}
          value={props.description}
          fullWidth
        />
      </div>

      {/* <Grid item sm={12}> */}

      <TextField
        name="participants"
        label={props.t('participants')}
        placeholder="David"
        margin="normal"
        onChange={onParticipantsChange}
        value={props.participants}
        type="text"
        fullWidth
      />
      {/* </Grid> */}
      {/* <Grid item sm={12}> */}
      <TextField
        name="numberOfWinners"
        label={props.t('number_of_winners')}
        placeholder="1"
        margin="normal"
        onChange={props.onFieldChange}
        value={props.numberOfWinners}
        type="number"
      />
      {/* </Grid> */}
    </div>
  );
};

RaffleDrawForm.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  participants: PropTypes.arrayOf(PropTypes.string).isRequired,
  numberOfWinners: PropTypes.number.isRequired,
  onFieldChange: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

export default translate('RaffleDrawForm')(RaffleDrawForm);
