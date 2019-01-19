import React, { Fragment } from 'react';
import { translate, Trans } from 'react-i18next';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { GroupsResult } from 'echaloasuerte-js-sdk';
import SubmitButton from '../../SubmitButton/SubmitButton.jsx';
// import ErrorFeedback from '../../ErrorFeedback/ErrorFeedback.jsx';
import ShareDrawModal from '../../ShareDrawModal/ShareDrawModal.jsx';
import withFormValidation from '../../withValidation/withFormValidation.jsx';
import Page from '../../Page/Page.jsx';
import QuickDrawLayout from '../../QuickDrawLayout/QuickDrawLayout.jsx';
import GroupsGeneratorConfigurationSection from './GroupsGeneratorConfigurationSection.jsx';
import GroupsGeneratorResult from './GroupsGeneratorResult.jsx';
import MakeCertifiedDrawPanel from '../../MakeCertifiedDrawPanel/MakeCertifiedDrawPanel.jsx';

const ValidatedForm = withFormValidation(props => <form {...props} />);

const GroupsGeneratorQuickPage = props => {
  const {
    // apiError,
    values,
    quickResult,
    handleToss,
    onFieldChange,
    handleCheckErrorsInConfiguration,
    t,
  } = props;
  return (
    <Page htmlTitle={t('html_title')} htmlDescription={t('html_description')}>
      <QuickDrawLayout
        sidePanel={
          <MakeCertifiedDrawPanel buttonLabel={t('create_certificated_draw')}>
            <span>
              <Trans i18nKey="certified_draw_description">
                Si quieres hacer un sorteo público para asegurar a los participantes una eleccion
                imparcial del resultado, te recomendamos que hagas un sorteo certificado
              </Trans>
            </span>
          </MakeCertifiedDrawPanel>
        }
      >
        <Typography variant="h1" align="center">
          {t('page_title')}
        </Typography>
        <Typography variant="body1" align="center" color="textSecondary">
          {t('draw_subheading')}
        </Typography>
        <ValidatedForm
          onSubmit={e => {
            e.preventDefault();
            handleToss();
          }}
          checkErrors={() => handleCheckErrorsInConfiguration(t)}
        >
          <GroupsGeneratorConfigurationSection
            values={values}
            onFieldChange={onFieldChange}
            t={t}
          />
          {/* {apiError && <ErrorFeedback error={t('ApiError:api_error')} />} */}
          <SubmitButton label={t('generate_groups')} />
        </ValidatedForm>
        {quickResult && (
          <Fragment>
            <GroupsGeneratorResult result={quickResult} />
            <ShareDrawModal />
          </Fragment>
        )}
      </QuickDrawLayout>
    </Page>
  );
};

GroupsGeneratorQuickPage.propTypes = {
  // apiError: PropTypes.bool,
  values: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    participants: PropTypes.arrayOf(PropTypes.string).isRequired,
    numberOfGroups: PropTypes.string.isRequired,
  }).isRequired,
  onFieldChange: PropTypes.func.isRequired,
  handleToss: PropTypes.func.isRequired,
  handleCheckErrorsInConfiguration: PropTypes.func.isRequired,
  quickResult: PropTypes.instanceOf(GroupsResult),
  t: PropTypes.func.isRequired,
};

GroupsGeneratorQuickPage.defaultProps = {
  quickResult: null,
  // apiError: false,
};

export default translate('GroupsGenerator')(GroupsGeneratorQuickPage);
