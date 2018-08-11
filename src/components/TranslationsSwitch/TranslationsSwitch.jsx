import React, { Fragment } from 'react';
import { translate } from 'react-i18next';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import classnames from 'classnames/bind';
import STYLES from './TranslationsSwitch.scss';

const c = classnames.bind(STYLES);

import i18n from '../../i18n/i18n';

const localeMap = {
  'en-GB': 'English',
  'es-ES': 'Español',
};

const TranslationsSwitch = ({ available, onChange, t }) => (
  <div className={c('TranslationsSwitch')}>
    <Typography className={c('TranslationsSwitch__label')} display="body2" component="span">
      {t('change_language')}
    </Typography>
    <FormControl>
      <Select value={i18n.language} onChange={event => onChange(event.target.value)}>
        {available.map(item => (
          <MenuItem key={item} value={item}>
            {localeMap[item]}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  </div>
);

TranslationsSwitch.propTypes = {
  available: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

export default translate('TranslationsSwitch')(TranslationsSwitch);
