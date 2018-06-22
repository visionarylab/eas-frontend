import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { translate } from 'react-i18next';

import STYLES from './ResultsNotGeneratedYet.scss';

const c = classNames.bind(STYLES);

const ResultsNotGeneratedYet = props => {
  const { dateScheduled, t } = props;
  const messageManualToss = props.messageManualToss || t('message_manual_toss');
  const messageScheduledToss = props.messageScheduledToss || t('message_scheduled_toss');
  return (
    <div className={c('ResultsNotGeneratedYet')}>
      {/* {dateScheduled ? { messageScheduledToss } : { messageManualToss }} */}
      {dateScheduled ? messageScheduledToss : messageManualToss}
    </div>
  );
};

ResultsNotGeneratedYet.propTypes = {
  dateScheduled: PropTypes.string,
  messageManualToss: PropTypes.string,
  messageScheduledToss: PropTypes.string,
  t: PropTypes.func.isRequired,
};

ResultsNotGeneratedYet.defaultProps = {
  dateScheduled: null,
  messageManualToss: '',
  messageScheduledToss: '',
};

export default translate('ResultsNotGeneratedYet')(ResultsNotGeneratedYet);
