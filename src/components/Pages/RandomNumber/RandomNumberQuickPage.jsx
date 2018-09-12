import React from 'react';
import { translate } from 'react-i18next';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import Typography from '@material-ui/core/Typography';
import SubmitButton from '../../SubmitButton/SubmitButton';
import withFormValidation from '../../withValidation/withFormValidation';
import Page from '../../Page/Page';
import RandomNumberConfigurationSection from './RandomNumberConfigurationSection';

import STYLES from './RandomNumberQuickPage.scss';

const c = classNames.bind(STYLES);

const ValidatedForm = withFormValidation(props => <form {...props} />);

const RandomNumberQuickPage = props => {
  const { values, handleToss, onFieldChange, checkErrorsInConfiguration, t, quickResult } = props;
  return (
    <Page htmlTitle={t('random_number_html_title')}>
      <div className={c('RandomNumberQuickPage__container')}>
        <Typography color="primary" variant="display1">
          {t('random_number_default_title')}
        </Typography>
        <ValidatedForm
          onSubmit={e => {
            e.preventDefault();
            handleToss();
          }}
          checkErrors={() => checkErrorsInConfiguration(t)}
        >
          <RandomNumberConfigurationSection values={values} onFieldChange={onFieldChange} t={t} />
          <SubmitButton label={t('generate_numbers')} />
        </ValidatedForm>
        <div
          className={c('RandomNumberQuickPage__results')}
          data-component={'RandomNumberQuick__result'}
        >
          {quickResult.join(', ')}
        </div>
      </div>
    </Page>
  );
};

RandomNumberQuickPage.propTypes = {
  values: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    rangeMax: PropTypes.string.isRequired,
    rangeMin: PropTypes.string.isRequired,
    numberOfResults: PropTypes.string.isRequired,
    allowRepeated: PropTypes.bool.isRequired,
  }).isRequired,
  onFieldChange: PropTypes.func.isRequired,
  handleToss: PropTypes.func.isRequired,
  checkErrorsInConfiguration: PropTypes.func.isRequired,
  quickResult: PropTypes.arrayOf(PropTypes.number),
  t: PropTypes.func.isRequired,
};

RandomNumberQuickPage.defaultProps = {
  quickResult: [],
};

export default translate('RandomNumberQuickPage')(RandomNumberQuickPage);
