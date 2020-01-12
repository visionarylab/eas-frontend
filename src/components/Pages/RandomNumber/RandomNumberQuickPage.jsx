import React, { Fragment } from 'react';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { RandomNumberResult as RandomNumberResultClass } from 'echaloasuerte-js-sdk';
import SubmitFormButton from '../../SubmitFormButton/SubmitFormButton.jsx';
import withValidationProvider from '../../FormValidation/withValidationProvider.jsx';
import Page from '../../Page/Page.jsx';
import RandomNumberConfigurationSection from './RandomNumberConfigurationSection.jsx';
import RandomNumberResult from './RandomNumberResult.jsx';
import ErrorFeedback from '../../ErrorFeedback/ErrorFeedback.jsx';
import MakeCertifiedDrawPanel from '../../MakeCertifiedDrawPanel/MakeCertifiedDrawPanel.jsx';
import ShareDrawModal from '../../ShareDrawModal/ShareDrawModal.jsx';

const ValidatedForm = withValidationProvider(props => <form {...props} />);

const RandomNumberQuickPage = props => {
  const {
    apiError,
    values,
    quickResult,
    handleToss,
    onFieldChange,
    handleCheckErrorsInConfiguration,
    t,
  } = props;
  return (
    <Page
      htmlTitle={t('html_title')}
      htmlDescription={t('html_description')}
      sidePanel={
        <MakeCertifiedDrawPanel
          buttonLabel={t('create_certificated_draw')}
          // analyticsDrawType={analyticsDrawType} add this
        >
          Si quieres hacer un sorteo público para asegurar a los participantes una eleccion
          imparcial del resultado, te recomendamos que hagas un sorteo certificado
        </MakeCertifiedDrawPanel>
      }
    >
      <Typography variant="h1" align="center">
        {t('page_title_quick')}
      </Typography>
      <Typography variant="subtitle1" align="center">
        {t('draw_subheading')}
      </Typography>
      <ValidatedForm
        onSubmit={e => {
          e.preventDefault();
          handleToss();
        }}
        onFormErrorsCheck={() => handleCheckErrorsInConfiguration(t)}
      >
        <RandomNumberConfigurationSection values={values} onFieldChange={onFieldChange} t={t} />
        {apiError && <ErrorFeedback error={t('ApiError:api_error')} />}
        <SubmitFormButton label={t('generate_numbers')} />
      </ValidatedForm>

      {quickResult && (
        <Fragment>
          <RandomNumberResult result={quickResult} />
          <ShareDrawModal
          // analyticsDrawType={analyticsDrawType} add this
          />
        </Fragment>
      )}
    </Page>
  );
};

RandomNumberQuickPage.propTypes = {
  apiError: PropTypes.bool,
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
  handleCheckErrorsInConfiguration: PropTypes.func.isRequired,
  quickResult: PropTypes.instanceOf(RandomNumberResultClass),
  t: PropTypes.func.isRequired,
};

RandomNumberQuickPage.defaultProps = {
  apiError: false,
  quickResult: null,
};

export default withTranslation('RandomNumber')(RandomNumberQuickPage);
