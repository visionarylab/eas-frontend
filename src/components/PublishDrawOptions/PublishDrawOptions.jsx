import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import DateTimePicker from '../DateTimePicker/DateTimePicker';

const PublishDrawOptions = props => {
  const onWhenToTossChange = e => {
    if (e.target.value === 'now') {
      props.onFieldChange('dateScheduled', null);
    } else {
      props.onFieldChange('dateScheduled', new Date());
    }
  };
  const { options, dateScheduled, onFieldChange, t } = props;
  const whenToToss = dateScheduled ? 'schedule' : 'now';
  return (
    <div>
      <FormControl component="fieldset" required>
        <RadioGroup value={whenToToss} onChange={onWhenToTossChange}>
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

        {dateScheduled && (
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
          />
        )}
      </FormControl>
    </div>
  );
};

PublishDrawOptions.propTypes = {
  dateScheduled: PropTypes.instanceOf(Date),
  onFieldChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.string),
  t: PropTypes.func.isRequired,
};

PublishDrawOptions.defaultProps = {
  dateScheduled: null,
  options: ['now'],
};

export default translate('PublishDrawOptions')(PublishDrawOptions);
