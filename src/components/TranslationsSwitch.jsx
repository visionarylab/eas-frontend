import React, { Fragment } from 'react';
import { translate } from 'react-i18next';
import PropTypes from 'prop-types';

import i18n from '../i18n/i18n';

const createOnChangeHandler = (available, onChange) => ({ currentTarget }) =>
  onChange(available[currentTarget.selectedIndex]);

const TranslationsSwitch = ({ available, onChange, t }) => (
  <Fragment>
    <span>{t('change_language')}</span>
    <select value={i18n.language} onChange={createOnChangeHandler(available, onChange)}>
      {available.map(item => <option key={item}>{item}</option>)}
    </select>
  </Fragment>
);

TranslationsSwitch.propTypes = {
  available: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

export default translate('TranslationsSwitch')(TranslationsSwitch);
