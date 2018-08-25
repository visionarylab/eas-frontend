import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
import MomentUtils from 'material-ui-pickers/utils/moment-utils';
import DateTimePicker from '../../DateTimePicker/DateTimePicker';

class LetterDrawPage extends React.Component {
  state = {
    selectedDate: new Date(),
  };

  handleDateChange = date => {
    this.setState({ selectedDate: date });
  };

  render() {
    return (
      <MuiPickersUtilsProvider utils={MomentUtils}>
        {/* <DateTimePicker
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
    /> */}
        <DateTimePicker
          autoOk
          ampm={false}
          disableFuture
          value={new Date('2018-01-01T00:00:00.000Z')}
          onChange={this.handleDateChange}
          label="24h clock"
        />
      </MuiPickersUtilsProvider>
    );
  }
}

LetterDrawPage.propTypes = {
  values: PropTypes.shape({
    numberOfLetters: PropTypes.number.isRequired,
    isPublic: PropTypes.bool.isRequired,
  }).isRequired,
  handleToss: PropTypes.func.isRequired,
  handlePublish: PropTypes.func.isRequired,
  handleMakeDrawPublic: PropTypes.func.isRequired,
  onFieldChange: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

export default translate('LetterDrawPage')(LetterDrawPage);
