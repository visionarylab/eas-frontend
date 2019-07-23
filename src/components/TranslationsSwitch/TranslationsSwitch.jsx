import React from 'react';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import classnames from 'classnames/bind';
import TranslateIcon from '@material-ui/icons/Translate';
// import { useSelector } from 'react-redux';
import STYLES from './TranslationsSwitch.scss';

const c = classnames.bind(STYLES);
const localeMap = {
  'en-GB': 'English',
  'es-ES': 'Español',
};

const TranslationsSwitch = ({ available, onChange, t, i18n }) => 
  // const isMobile = useSelector(state => state.userRequest.isMobile);
  // console.log('isMobile', isMobile);
   (
    <span className={c('TranslationsSwitch')}>
      <Typography className={c('TranslationsSwitch__label')} variant="body1" component="span">
        {t('change_language')}
        <TranslateIcon />
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
    </span>
  )
;

TranslationsSwitch.propTypes = {
  available: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  i18n: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default withTranslation('TranslationsSwitch')(TranslationsSwitch);
