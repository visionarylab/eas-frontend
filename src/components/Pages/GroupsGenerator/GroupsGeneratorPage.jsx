import React from 'react';
import { translate } from 'react-i18next';
import PropTypes from 'prop-types';
import withFormValidation from '../../withValidation/withFormValidation.jsx';
import GeneralDetailsSection from '../../CommonSections/GeneralDetailsSection.jsx';
import WhenToTossSection from '../../CommonSections/WhenToTossSection.jsx';
import WizardForm from '../../WizardForm/WizardForm.jsx';
import Page from '../../Page/Page.jsx';
import DrawHeading from '../../DrawHeading/DrawHeading.jsx';
import GroupsGeneratorConfigurationSection from './GroupsGeneratorConfigurationSection.jsx';
import QuickDrawLayout from '../../QuickDrawLayout/QuickDrawLayout.jsx';

const GeneralDetailsForm = withFormValidation(GeneralDetailsSection);
const ConfigurationForm = withFormValidation(GroupsGeneratorConfigurationSection);
const WhenToTossForm = withFormValidation(WhenToTossSection);

const GroupsGeneratorPage = props => {
  const { values, handleCheckErrorsInConfiguration, onFieldChange, handlePublish, t } = props;
  const steps = [
    {
      label: t('step_label_configure'),
      render: wizardProps => (
        <ConfigurationForm
          values={values}
          onFieldChange={onFieldChange}
          t={t}
          checkErrors={() => handleCheckErrorsInConfiguration(t)}
          {...wizardProps}
        />
      ),
    },
    {
      label: t('step_label_general_details'),
      render: wizardProps => (
        <GeneralDetailsForm
          sectionTitle={t('step_title_general_details')}
          title={values.title}
          description={values.description}
          onFieldChange={onFieldChange}
          {...wizardProps}
        />
      ),
    },
    {
      label: t('step_label_when_to_toss'),
      render: wizardProps => (
        <WhenToTossForm
          sectionTitle={t('step_title_when_to_toss')}
          dateScheduled={values.dateScheduled}
          onFieldChange={onFieldChange}
          t={t}
          {...wizardProps}
        />
      ),
    },
  ];
  return (
    <Page htmlTitle={t('html_title')} htmlDescription={t('html_description')}>
      <QuickDrawLayout>
        <DrawHeading title={t('page_title')} subtitle={t('draw_subheading')} />
        <WizardForm steps={steps} onSubmit={handlePublish} submitButtonLabel={t('publish_draw')} />
        <WizardForm
          steps={steps}
          onSubmit={handlePublish}
          submitButtonLabel={t('publish_raffle')}
        />
      </QuickDrawLayout>
    </Page>
  );
};

GroupsGeneratorPage.propTypes = {
  values: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    participants: PropTypes.arrayOf(PropTypes.string),
    numberOfGroups: PropTypes.string,
  }).isRequired,
  onFieldChange: PropTypes.func.isRequired,
  handlePublish: PropTypes.func.isRequired,
  handleCheckErrorsInConfiguration: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

GroupsGeneratorPage.defaultProps = {};

export default translate('GroupsGenerator')(GroupsGeneratorPage);
