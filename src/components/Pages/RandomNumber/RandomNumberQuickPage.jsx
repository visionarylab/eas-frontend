import React from 'react';
import { translate } from 'react-i18next';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import SubmitButton from '../../SubmitButton/SubmitButton';
import withFormValidation from '../../withValidation/withFormValidation';
import Page from '../../Page/Page';
import RandomNumberConfigurationSection from './RandomNumberConfigurationSection';

import STYLES from './RandomNumberQuickPage.scss';

const c = classNames.bind(STYLES);

const ValidatedForm = withFormValidation(props => <form {...props} />);

const RandomNumberQuickPage = props => {
  const {
    values,
    quickResult,
    shareResultLink,
    handleToss,
    onFieldChange,
    handleCheckErrorsInConfiguration,
    handleMakePublic,
    t,
  } = props;
  return (
    <Page htmlTitle={t('html_title')}>
      <div className={c('RandomNumberQuickPage__container')}>
        <Typography color="primary" variant="display1" align="center">
          {t('page_title')}
        </Typography>
        <ValidatedForm
          onSubmit={e => {
            e.preventDefault();
            handleToss();
          }}
          checkErrors={() => handleCheckErrorsInConfiguration(t)}
        >
          <RandomNumberConfigurationSection values={values} onFieldChange={onFieldChange} t={t} />
          <SubmitButton label={t('generate_numbers')} />
        </ValidatedForm>
        {quickResult.length > 0 && (
          <div
            className={c('RandomNumberQuickPage__results')}
            data-component={'RandomNumberQuick__result'}
          >
            {quickResult.join(', ')}
            <Button variant="raised" color="primary" href={shareResultLink}>
              {t('share_result')}
            </Button>
          </div>
        )}
      </div>

      <div>
        <Button variant="raised" color="primary" onClick={handleMakePublic}>
          {t('make_public')}
        </Button>
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
  shareResultLink: PropTypes.string,
  onFieldChange: PropTypes.func.isRequired,
  handleToss: PropTypes.func.isRequired,
  handleCheckErrorsInConfiguration: PropTypes.func.isRequired,
  quickResult: PropTypes.arrayOf(PropTypes.number),
  handleMakePublic: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

RandomNumberQuickPage.defaultProps = {
  quickResult: [],
  shareResultLink: '',
};

export default translate('RandomNumber')(RandomNumberQuickPage);
