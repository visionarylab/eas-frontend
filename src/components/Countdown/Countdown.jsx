import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import classnames from 'classnames/bind';
import CountdownHandler from 'react-countdown-now';
import Typography from '@material-ui/core/Typography';
import { getDate, getTime } from '../../services/datetime';
import BannerAlert, { ALERT_TYPES } from '../BannerAlert/BannerAlert';
import STYLES from './Countdown.scss';

const c = classnames.bind(STYLES);

const Countdown = ({ date, t }) => (
  <CountdownHandler
    date={date}
    zeroPadLength={0}
    renderer={({ days, hours, minutes, seconds, completed }) => {
      if (completed) {
        return 'done';
      }

      let message = '';
      if (days) {
        message = `${days}d`;
      }
      if (hours) {
        message = `${message} ${hours}d`;
      }
      if (minutes) {
        message = `${message} ${minutes}m`;
      }
      if (seconds) {
        message = `${message} ${seconds}s`;
      }
      return (
        <div className={c('Countdown')}>
          {t('time_remaining')}
          <Typography variant="subheading" align={'center'}>
            {message}
          </Typography>
        </div>
      );
    }}
  />
);

Countdown.propTypes = {
  t: PropTypes.bool.isRequired,
  date: PropTypes.number.isRequired,
};

export default translate('Countdown')(Countdown);
