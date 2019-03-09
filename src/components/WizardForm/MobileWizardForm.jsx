import React from 'react';
import PropTypes from 'prop-types';
import MobileStepper from '@material-ui/core/MobileStepper';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import Button from '@material-ui/core/Button';
import ErrorFeedback from '../ErrorFeedback/ErrorFeedback.jsx';

const MobileWizardForm = ({
  numSteps,
  submitButtonLabel,
  activeStep,
  apiError,
  handleNext,
  handleBack,
  children,
  t,
}) => (
  <div>
    {children}
    {apiError && <ErrorFeedback error={t('ApiError:api_error')} />}
    <MobileStepper
      steps={numSteps}
      position="static"
      activeStep={activeStep}
      nextButton={
        <Button size="small" onClick={handleNext}>
          {activeStep === numSteps - 1 ? submitButtonLabel : t('next')}
          <KeyboardArrowRight />
        </Button>
      }
      backButton={
        <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
          <KeyboardArrowLeft />
          Back
        </Button>
      }
    />
  </div>
);

MobileWizardForm.propTypes = {
  numSteps: PropTypes.number.isRequired,
  activeStep: PropTypes.number.isRequired,
  apiError: PropTypes.bool,
  submitButtonLabel: PropTypes.string.isRequired,
  handleNext: PropTypes.func.isRequired,
  handleBack: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  t: PropTypes.func.isRequired,
};

MobileWizardForm.defaultProps = {
  apiError: false,
};

export default MobileWizardForm;
