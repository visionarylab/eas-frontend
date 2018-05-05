import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';

const PublicNumberDrawDetails = props => (
  <div>
    {props.t('setup_description', {
      numberOfResults: props.numberOfResults,
      from: props.from,
      to: props.to,
    })}
    {props.allowRepeated
      ? props.t('repeated_results_allowed')
      : props.t('repeated_results_not_allowed')}
  </div>
);

PublicNumberDrawDetails.propTypes = {
  from: PropTypes.number.isRequired,
  to: PropTypes.number.isRequired,
  numberOfResults: PropTypes.number.isRequired,
  allowRepeated: PropTypes.bool.isRequired,
  t: PropTypes.func.isRequired,
};

export default translate('PublicNumberDrawDetails')(PublicNumberDrawDetails);
