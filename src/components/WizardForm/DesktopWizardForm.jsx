import React from 'react';
import Stepper from '@material-ui/core/Stepper';
import PropTypes from 'prop-types';

import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import classnames from 'classnames/bind';
import ErrorFeedback from '../ErrorFeedback/ErrorFeedback.jsx';
import STYLES from './WizardForm.scss';

const c = classnames.bind(STYLES);

const DesktopWizard = ({
  stepLabels,
  activeStep,
  handleNext,
  handleBack,
  submittedSteps,
  stepValidations,
  apiError,
  submitButtonLabel,
  t,
  children,
}) => (
  <div>
    <Stepper className={c('WizardForm__stepper')} activeStep={activeStep}>
      {stepLabels.map((label, index) => {
        const props = {};
        const labelProps = {};
        if (submittedSteps[index] && !stepValidations[index]) {
          labelProps.error = true;
        }
        return (
          <Step key={label} {...props}>
            <StepLabel {...labelProps}>{label}</StepLabel>
          </Step>
        );
      })}
    </Stepper>
    {children}
    {apiError && <ErrorFeedback error={t('ApiError:api_error')} />}
    <div className={c('WizardForm__buttons-row')}>
      <Button
        className={c('WizardForm__step-button')}
        disabled={activeStep === 0}
        onClick={handleBack}
      >
        {t('back')}
      </Button>
      <Button
        variant="contained"
        color="primary"
        className={c('WizardForm__step-button')}
        data-component="WizardForm__next-button"
        onClick={handleNext}
      >
        {activeStep === stepLabels.length - 1 ? submitButtonLabel : t('next')}
      </Button>
    </div>
  </div>
);

DesktopWizard.propTypes = {
  stepLabels: PropTypes.arrayOf(PropTypes.string).isRequired,
  activeStep: PropTypes.number.isRequired,
  apiError: PropTypes.bool,
  submittedSteps: PropTypes.arrayOf(PropTypes.bool).isRequired,
  submitButtonLabel: PropTypes.string.isRequired,
  stepValidations: PropTypes.arrayOf(PropTypes.bool).isRequired,
  handleNext: PropTypes.func.isRequired,
  handleBack: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  t: PropTypes.func.isRequired,
};

DesktopWizard.defaultProps = {
  apiError: false,
};

export default DesktopWizard;
