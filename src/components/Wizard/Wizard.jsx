import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

class WizardForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStep: 1,
      stepValidations: props.steps.map(() => false), // eslint-disable-line react/no-unused-state
    };

    this.stepRefs = props.steps.map(() => React.createRef());
  }
  onStepSubmit = e => {
    console.log('onStepSubmit');
    this.setStep(this.state.requestedStep, e);
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
    // const { activeStep } = this.state;
    // this.setState({
    //   activeStep: activeStep + 1,
    // });
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

  onValidationChange = valid => {
    console.log('onValidationChange', valid);
    this.setState(previousState => {
      const stepValidations = previousState.stepValidations.slice();
      stepValidations[this.state.step] = valid;
      return {
        stepValidations,
        // isValid: this.areAllFormsValid(stepValidations),
      };
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
    const { steps } = this.props;
    const stepLabels = steps.map(step => step.label);
    const { activeStep } = this.state;

    return (
      <Fragment>
        <Stepper activeStep={activeStep}>
          {stepLabels.map(label => {
            const props = {};
            const labelProps = {};
            return (
              <Step key={label} {...props}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        <div>
          {activeStep === stepLabels.length ? (
            <div>
              <Typography>All steps completed - you&quot;re finished</Typography>
              <Button onClick={this.handleReset}>Reset</Button>
            </div>
          ) : (
            <div>
              <Typography component="div">
                {steps[activeStep].render({
                  ref: this.stepRefs[this.state.activeStep],
                  onValidationChange: this.onValidationChange,
                  onSubmit: this.onStepSubmit,
                })}
              </Typography>
              <div>
                <Button disabled={activeStep === 0} onClick={this.handleBack}>
                  Back
                </Button>
                <Button variant="contained" color="primary" onClick={this.handleNext}>
                  {activeStep === stepLabels.length - 1 ? 'Finish' : 'Next'}
                </Button>
              </div>
            </div>
          )}
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
  onSubmit: PropTypes.func.isRequired,
};

export default WizardForm;
