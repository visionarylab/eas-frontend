import React from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import { translate } from "react-i18next";
import { FormControl, FormControlLabel } from 'material-ui/Form';
import Radio, { RadioGroup } from 'material-ui/Radio';
import DateFnsUtils from 'material-ui-pickers/utils/date-fns-utils';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
import DateTimePicker from 'material-ui-pickers/DateTimePicker';

const PublishDrawOptions = props => {
  const onScheduleChange = e => {
    const { value } = e.target;
    props.onFieldChange({
      target: { name: 'dateScheduled', value: value === 'schedule' ? Date() : null },
    });
  };

  const onDateScheduledChange = date => {
    props.onFieldChange({
      target: { name: 'dateScheduled', value: date },
    });
  };

  const { dateScheduled, labelPublish, handlePublish, t } = props;
  return (
    <div>
      <div>
        <Typography variant="title">{t('when_show_winners')}</Typography>
        <FormControl component="fieldset" required>
          <RadioGroup
            aria-label="schedule"
            name="schedule"
            value={dateScheduled ? 'schedule' : 'now'}
            onChange={onScheduleChange}
          >
            <FormControlLabel
              value="now"
              control={<Radio color="primary" />}
              label={t('show_now')}
            />
            <FormControlLabel
              value="schedule"
              control={<Radio color="primary" />}
              label={t('choose_date')}
            />
          </RadioGroup>

          {dateScheduled ? (
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <DateTimePicker
                name="dateScheduled"
                value={dateScheduled}
                onChange={onDateScheduledChange}
                autoOk
                ampm={false}
                disableFuture
                label="24h clock"
                // showTodayButton
              />
            </MuiPickersUtilsProvider>
          ) : (
            ''
          )}
        </FormControl>
      </div>
      <div>
        {/* TODO do stuff here about inmediate publish or scheduled draw */}
        <Button variant="raised" color="primary" onClick={handlePublish}>
          {labelPublish}
        </Button>
      </div>
    </div>
  );
};

PublishDrawOptions.propTypes = {
  labelPublish: PropTypes.string.isRequired,
  dateScheduled: PropTypes.string,
  onFieldChange: PropTypes.func.isRequired,
  handlePublish: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

PublishDrawOptions.defaultProps = {
  dateScheduled: Date(),
};

export default translate('PublishDrawOptions')(PublishDrawOptions);
