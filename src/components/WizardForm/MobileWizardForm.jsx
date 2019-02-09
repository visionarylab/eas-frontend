import React from 'react';
import PropTypes from 'prop-types';
import MobileStepper from '@material-ui/core/MobileStepper';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import classnames from 'classnames/bind';
import ErrorFeedback from '../ErrorFeedback/ErrorFeedback.jsx';
import STYLES from './WizardForm.scss';

const c = classnames.bind(STYLES);

const MobileWizardForm = ({
  stepLabels,
  submitButtonLabel,
  activeStep,
  apiError,
  handleNext,
  handleBack,
  children,
  t,
}) => (
  <div className={c('MobileWizardForm')}>
    <div className={c('MobileWizardForm__step-label')}>
      <Typography align="center">{stepLabels[activeStep]}</Typography>
    </div>
    {children}
    {apiError && <ErrorFeedback error={t('ApiError:api_error')} />}
    <MobileStepper
      steps={stepLabels.length}
      position="static"
      activeStep={activeStep}
      nextButton={
        <Button size="small" onClick={handleNext}>
          {activeStep === stepLabels.length - 1 ? submitButtonLabel : t('next')}
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
  stepLabels: PropTypes.arrayOf(PropTypes.string).isRequired,
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
