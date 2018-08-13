import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import { translate } from 'react-i18next';
import classnames from 'classnames/bind';
import STYLES from './WizardForm.scss';

const c = classnames.bind(STYLES);

class WizardForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStep: 0,
      stepValidations: props.steps.map(() => undefined),
      submittedSteps: props.steps.map(() => false),
    };

    this.stepRefs = props.steps.map(() => React.createRef());
  }
  onStepSubmit = e => {
    this.setStep(this.state.requestedStep, e);
  };

  onValidationChange = valid => {
    this.setState(previousState => {
      const stepValidations = previousState.stepValidations.slice();
      stepValidations[this.state.activeStep] = valid;
      return {
        stepValidations,
      };
    });
  };

  setStep = (stepIndex, e) => {
    const isLastStep = stepIndex === this.props.steps.length;
    if (isLastStep && this.props.onSubmit) {
      this.props.onSubmit(e);
    } else {
      this.setState({ activeStep: stepIndex, requestedStep: -1 });
    }
  };

  handleNext = () => {
    this.requestStep(this.state.activeStep + 1);
  };

  handleBack = () => {
    const { activeStep } = this.state;
    this.setState({
      activeStep: activeStep - 1,
    });
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
    });
  };

  requestStep(nextStepIndex) {
    const activeStepDefinition = this.props.steps[this.state.activeStep];
    const shouldValidateActiveStep =
      !('validate' in activeStepDefinition) || activeStepDefinition.validate;
    if (shouldValidateActiveStep) {
      this.setState(
        {
          requestedStep: nextStepIndex,
        },
        () => this.submitStepForm(this.state.activeStep),
      );
    } else {
      this.setStep(nextStepIndex);
    }
  }

  submitStepForm(stepIndex) {
    this.stepRefs[stepIndex].current.onSubmit(new Event('submit'));
  }

  render() {
    const { steps, submitButtonLabel, t } = this.props;
    const stepLabels = steps.map(step => step.label);
    const { activeStep, stepValidations, submittedSteps } = this.state;
    return (
      <Fragment>
        <Stepper activeStep={activeStep}>
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
        <div>
          <div>
            {steps[activeStep].render({
              ref: this.stepRefs[this.state.activeStep],
              onValidationChange: this.onValidationChange,
              onSubmit: this.onStepSubmit,
            })}
          </div>
          <div className={c('WizardForm__buttons-row')}>
            <Button
              className={c('WizardForm__step-button')}
              disabled={activeStep === 0}
              onClick={this.handleBack}
            >
              {t('back')}
            </Button>
            <Button
              variant="contained"
              color="primary"
              className={c('WizardForm__step-button')}
              onClick={this.handleNext}
            >
              {activeStep === stepLabels.length - 1 ? submitButtonLabel : t('next')}
            </Button>
          </div>
        </div>
      </Fragment>
    );
  }
}

WizardForm.propTypes = {
  steps: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      render: PropTypes.func.isRequired,
    }),
  ).isRequired,
  submitButtonLabel: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

export default translate('WizardForm')(WizardForm);
