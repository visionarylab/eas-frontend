import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withTranslation } from 'react-i18next';

import MuiPickersUtilsProvider from 'material-ui-pickers/MuiPickersUtilsProvider';
import MomentUtils from '@date-io/moment';
import { default as MuiDateTimePicker } from 'material-ui-pickers/DateTimePicker'; // eslint-disable-line import/no-named-default
import moment from 'moment';
import 'moment/locale/es';

const DateTimePicker = ({ t, i18n, ...props }) => {
  const { id, label, defaultNS, reportNS, i18nOptions, tReady, ...rest } = props; // eslint-disable-line react/prop-types
  const locale = i18n.language;

  const localeMap = {
    'en-GB': 'en',
    'es-ES': 'es',
  };
  const currentLocale = localeMap[locale];
  moment.locale(currentLocale);

  return (
    <MuiPickersUtilsProvider utils={MomentUtils} locale={currentLocale} moment={moment}>
      <Typography htmlFor={id} component="label" variant="h3">
        {label}
      </Typography>
      <MuiDateTimePicker
        id={id}
        minDateMessage={t('only_future_date_valid')}
        cancelLabel={t('cancel')}
        okLabel={t('ok')}
        todayLabel={t('today')}
        ampm={false}
        format="LLL"
        margin="normal"
        fullWidth
        {...rest}
      />
    </MuiPickersUtilsProvider>
  );
};

DateTimePicker.propTypes = {
  i18n: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  t: PropTypes.func.isRequired,
};

export default withTranslation('DateTimePicker')(DateTimePicker);
