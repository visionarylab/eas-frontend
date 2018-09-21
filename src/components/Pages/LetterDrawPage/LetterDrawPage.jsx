import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
import MomentUtils from 'material-ui-pickers/utils/moment-utils';
import classnames from 'classnames/bind';
import STYLES from './LetterDrawPage.scss';

const c = classnames.bind(STYLES);
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
        <div className={c('LetterDrawPage', 'LetterDrawPage__tails')}>
          <div className={c('LetterDrawPage__side', 'LetterDrawPage__side--a')} />
          <div className={c('LetterDrawPage__side', 'LetterDrawPage__side--b')} />
        </div>
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
