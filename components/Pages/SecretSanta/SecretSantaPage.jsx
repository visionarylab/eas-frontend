import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { isMobile } from 'react-device-detect';
import useTranslation from 'next-translate/useTranslation';

import WizardForm from '../../WizardForm/WizardForm.jsx';
import Page from '../../Page/Page.jsx';
import DrawHeading from '../../DrawHeading/DrawHeading.jsx';
import ParticipantsWithEmailSection from './ParticipantsWithEmailSection.jsx';

import withValidationProvider from '../../FormValidation/withValidationProvider.jsx';

const ParticipantsWithEmailSectionForm = withValidationProvider(ParticipantsWithEmailSection);

const SecretSantaPage = props => {
  const [values, setValues] = useState({ participants: [] });
  const { t } = useTranslation('DrawFacebook');
  const onFieldChange = (fieldName, value) => {
    setValues(previousState => ({
      ...previousState,
      [fieldName]: value,
    }));
  };
  const steps = [
    {
      label: t('step_label_participants'),
      render: wizardProps => (
        <ParticipantsWithEmailSectionForm
          onFieldChange={onFieldChange}
          participants={values.participants}
          {...wizardProps}
        />
      ),
    },
    {
      label: t('step_label_exclusions'),
      render: wizardProps => <ParticipantsWithEmailSectionForm {...wizardProps} />,
    },
    {
      label: t('step_label_send'),
      render: wizardProps => <ParticipantsWithEmailSectionForm {...wizardProps} />,
    },
  ];

  const handlePublish = () => {}; // TODO implement
  const apiError = false; // TODO need to handle that

  return (
    <Page
      htmlTitle={t('html_title')}
      htmlDescription={t('html_description')}
      htmlKeywords={t('html_keywords')}
      pageType="Facebook Raffle"
      showAdvert={!isMobile}
      // ogImage={facebookRaffleOgImage} // TODO implement
    >
      <DrawHeading title={t('page_title')} subtitle={t('draw_subheading')} />
      <WizardForm
        steps={steps}
        onSubmit={handlePublish}
        submitButtonLabel={t('publish_draw')}
        apiError={apiError}
        isMobile={isMobile}
      />
    </Page>
  );
};

SecretSantaPage.propTypes = {};

export default SecretSantaPage;
