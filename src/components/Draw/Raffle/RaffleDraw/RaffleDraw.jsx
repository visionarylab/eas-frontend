import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-translate';

import RaffleDrawForm from '../RaffleDrawForm/RaffleDrawForm';
import PublishDrawOptions from '../../../PublishDrawOptions/PublishDrawOptions';

const RaffleDraw = props => (
  <div>
    <RaffleDrawForm
      title={props.title}
      description={props.description}
      participants={props.participants}
      numberOfWinners={props.numberOfWinners}
      handleTitleChange={props.handleTitleChange}
      handleDescriptionChange={props.handleDescriptionChange}
      handleParticipantsChange={props.handleParticipantsChange}
      handleNumberOfWinnersChange={props.handleNumberOfWinnersChange}
    />
    <PublishDrawOptions
      whenResultShown={props.whenResultShown}
      labelPublish={props.t('publish_draw')}
      dateScheduled={props.dateScheduled}
      handleScheduleDateChange={props.handleScheduleDateChange}
      handlePublish={props.handlePublish}
      handleWhenResultShown={props.handleWhenResultShown}
    />
  </div>
);

RaffleDraw.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  participants: PropTypes.arrayOf(PropTypes.string).isRequired,
  numberOfWinners: PropTypes.number.isRequired,
  whenResultShown: PropTypes.string.isRequired,
  dateScheduled: PropTypes.instanceOf(Date),
  handleWhenResultShown: PropTypes.func.isRequired,
  handleTitleChange: PropTypes.func.isRequired,
  handleDescriptionChange: PropTypes.func.isRequired,
  handleParticipantsChange: PropTypes.func.isRequired,
  handleNumberOfWinnersChange: PropTypes.func.isRequired,
  handlePublish: PropTypes.func.isRequired,
  handleScheduleDateChange: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

RaffleDraw.defaultPropTypes = {
  dateScheduled: Date(),
}

export default translate('RaffleDraw')(RaffleDraw);
