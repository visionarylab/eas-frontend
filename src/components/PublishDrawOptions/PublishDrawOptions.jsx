import React from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import { translate } from 'react-translate';
import { FormLabel, FormControl, FormControlLabel, FormHelperText } from 'material-ui/Form';
// import { DateTimePicker, TimePicker } from 'material-ui-pickers';
import Radio, { RadioGroup } from 'material-ui/Radio';
import DateFnsUtils from 'material-ui-pickers/utils/date-fns-utils';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
import TimePicker from 'material-ui-pickers/TimePicker';
import DatePicker from 'material-ui-pickers/DatePicker';
import DateTimePicker from 'material-ui-pickers/DateTimePicker';

const PublishDrawOptions = props => (
  <div>
    <div>
      <Typography variant="title">{props.t('when_show_winners')}</Typography>
      <FormControl component="fieldset" required>
        <RadioGroup
          aria-label="schedule"
          name="schedule"
          value={props.whenResultShown}
          onChange={props.handleWhenResultShown}
        >
          <FormControlLabel
            value="now"
            control={<Radio color="primary" />}
            label={props.t('show_now')}
          />
          <FormControlLabel
            value="schedule"
            control={<Radio color="primary" />}
            label={props.t('choose_date')}
          />
        </RadioGroup>

        {props.whenResultShown === 'schedule' ? (
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DateTimePicker
              value={new Date()}
              onChange={this.handleDateChange}
              autoOk
              ampm={false}
              disableFuture
              label="24h clock"
              showTodayButton
            />
          </MuiPickersUtilsProvider>
        ) : (
          ''
        )}
      </FormControl>
    </div>
    <div>
      {/* TODO do stuff here about inmediate publish or scheduled draw */}
      <Button raised color="primary" onClick={props.handlePublish}>
        {props.labelPublish}
      </Button>
    </div>
  </div>
);

PublishDrawOptions.propTypes = {
  whenResultShown: PropTypes.string.isRequired,
  labelPublish: PropTypes.string.isRequired,
  handlePublish: PropTypes.func.isRequired,
  handleWhenResultShown: PropTypes.func.isRequired,
  handleDateChange: PropTypes.func,
  t: PropTypes.func.isRequired,
};

PublishDrawOptions.defaultProps = {
  handleDateChange: () => {},
};

export default translate('PublishDrawOptions')(PublishDrawOptions);
