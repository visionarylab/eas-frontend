import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import MomentUtils from 'material-ui-pickers/utils/moment-utils';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
import DateTimePicker from '../DateTimePicker/DateTimePicker';

const PublishDrawOptions = props => {
  const { whenToToss, options, dateScheduled, onFieldChange, t } = props;
  return (
    <div>
      <FormControl component="fieldset" required>
        <RadioGroup value={whenToToss} onChange={e => onFieldChange('whenToToss', e.target.value)}>
          {options.includes('now') && (
            <FormControlLabel
              value="now"
              control={
                <Radio color="primary" inputProps={{ 'data-component': 'WhenToToss__now' }} />
              }
              label={t('show_now')}
            />
          )}
          {options.includes('manual') && (
            <FormControlLabel
              value="manual"
              control={
                <Radio color="primary" inputProps={{ 'data-component': 'WhenToToss__manual' }} />
              }
              label={t('manual_toss')}
            />
          )}
          {options.includes('schedule') && (
            <FormControlLabel
              value="schedule"
              control={
                <Radio color="primary" inputProps={{ 'data-component': 'WhenToToss__schedule' }} />
              }
              label={t('schedule_toss')}
            />
          )}
        </RadioGroup>

        {whenToToss === 'schedule' && (
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <DateTimePicker
              value={dateScheduled}
              onChange={datetime => {
                onFieldChange('dateScheduled', datetime);
              }}
              autoOk
              // ampm={false}
              disablePast
              label="24h clock"
              showTodayButton
              minDateMessage={t('past_date_not_valid')}
            />
          </MuiPickersUtilsProvider>
        )}
      </FormControl>
    </div>
  );
};

PublishDrawOptions.propTypes = {
  whenToToss: PropTypes.string.isRequired,
  dateScheduled: PropTypes.string,
  onFieldChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.string),
  t: PropTypes.func.isRequired,
};

PublishDrawOptions.defaultProps = {
  dateScheduled: '',
  options: ['now'],
};

export default translate('PublishDrawOptions')(PublishDrawOptions);
