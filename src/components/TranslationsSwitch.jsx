import React from 'react';
import { translate } from 'react-translate';
import PropTypes from 'prop-types';


const createOnChangeHandler = (available, onChange) => ({ currentTarget }) =>
  onChange(available[currentTarget.selectedIndex]);

const TranslationsSwitch = ({ available, onChange, t }) => (
  <div>
    <span>
      {t('change_language')}
    </span>
    <select onChange={createOnChangeHandler(available, onChange)}>
      {available.map(item =>
        <option key={item}>
          {item}
        </option>,
      )}
    </select>
  </div>
);

TranslationsSwitch.propTypes = {
  available: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default translate('TranslationsSwitch')(TranslationsSwitch);
