import React from 'react';
import { translate } from 'react-i18next';
import PropTypes from 'prop-types';
import withFormValidation from '../../withValidation/withFormValidation.jsx';
import GeneralDetailsSection from '../../CommonSections/GeneralDetailsSection.jsx';
import WhenToTossSection from '../../CommonSections/WhenToTossSection.jsx';
import WizardForm from '../../WizardForm/WizardForm.jsx';
import Page from '../../Page/Page.jsx';
import DrawHeading from '../../DrawHeading/DrawHeading.jsx';
import DrawLayout from '../../DrawLayout/DrawLayout.jsx';
import SectionPanel from '../../SectionPanel/SectionPanel.jsx';
import MultiValueInput from '../../MultiValueInput/MultiValueInput.jsx';
import withFieldValidation from '../../withValidation/withFieldValidation.jsx';

const ValidatedMultiValueInput = withFieldValidation(MultiValueInput);

const PrizesSection = ({ prizes, onFieldChange, t }) => (
  <SectionPanel title={t('step_title_prizes')}>
    <ValidatedMultiValueInput
      name="prizes"
      label={t('field_label_prizes')}
      labelDisplayList={t('field_label_list_of_prizes')}
      placeholder="PS4"
      messageEmpty={t('message_no_prizes_added')}
      value={prizes}
      fullWidth
      onChange={e => onFieldChange('prizes', e.target.value)}
      data-component="Raffle__prizes-field"
      inputProps={{ 'data-component': 'Raffle__prizes-field-input' }}
      validators={[{ rule: 'required' }]}
    />
  </SectionPanel>
);
PrizesSection.propTypes = {
  prizes: PropTypes.arrayOf(PropTypes.string).isRequired,
  onFieldChange: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

const PrizesForm = withFormValidation(PrizesSection);
const GeneralDetailsForm = withFormValidation(GeneralDetailsSection);
const WhenToTossForm = withFormValidation(WhenToTossSection);

const FacebookLoginRafflePage = props => {
  const { values, apiError, onFieldChange, handlePublish, t } = props;
  const steps = [
    {
      label: t('step_label_prizes'),
      render: wizardProps => (
        <PrizesForm
          numberOfWinners={values.numberOfWinners}
          prizes={values.prizes}
          onFieldChange={onFieldChange}
          t={t}
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
          titleRequired
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
    <Page
      htmlTitle={t('html_title')}
      htmlDescription={t('html_description')}
      htmlKeywords={t('html_description')}
      pageType="groups_public_draw"
    >
      <DrawLayout isPublic>
        <DrawHeading title={t('page_title')} subtitle={t('draw_subheading')} />
        <WizardForm
          steps={steps}
          onSubmit={handlePublish}
          submitButtonLabel={t('publish_draw')}
          apiError={apiError}
        />
      </DrawLayout>
    </Page>
  );
};

FacebookLoginRafflePage.propTypes = {
  values: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    participants: PropTypes.arrayOf(PropTypes.string),
    numberOfGroups: PropTypes.string,
  }).isRequired,
  apiError: PropTypes.bool,
  onFieldChange: PropTypes.func.isRequired,
  handlePublish: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

FacebookLoginRafflePage.defaultProps = {
  apiError: false,
};

export default translate('FacebookLoginRaffle')(FacebookLoginRafflePage);
