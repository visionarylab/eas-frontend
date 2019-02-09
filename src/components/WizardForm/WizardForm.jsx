import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import { isMobile } from 'react-device-detect';
import config from '../../config/config';
import DesktopWizardForm from './DesktopWizardForm.jsx';
import MobileWizardForm from './MobileWizardForm.jsx';

class WizardForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStep: props.initialStep,
      stepValidations: props.steps.map(() => undefined),
      submittedSteps: props.steps.map(() => false),
      isSmallScreen: this.isSmallScreen(),
    };

    this.stepRefs = props.steps.map(() => React.createRef());
  }

  componentWillMount() {
    if (!config.isServer) {
      window.addEventListener('resize', this.handleWindowSizeChange);
    }
  }

  isSmallScreen = () => {
    if (config.isServer) {
      return isMobile;
    }
    return window.innerWidth <= 600;
  };

  handleWindowSizeChange = () => {
    this.setState({ isSmallScreen: this.isSmallScreen() });
  };

  onStepSubmit = e => {
    const { requestedStep } = this.state;
    this.setStep(requestedStep, e);
  };

  onValidationChange = valid => {
    this.setState(previousState => {
      const stepValidations = previousState.stepValidations.slice();
      stepValidations[previousState.activeStep] = valid;
      return {
        stepValidations,
      };
    });
  };

  setStep = (stepIndex, e) => {
    const { steps, onSubmit } = this.props;
    const isLastStep = stepIndex === steps.length;
    if (isLastStep && onSubmit) {
      onSubmit(e);
    } else {
      this.setState({ activeStep: stepIndex, requestedStep: -1 });
    }
  };

  handleNext = () => {
    const { activeStep } = this.state;
    this.requestStep(activeStep + 1);
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
    const { steps } = this.props;
    const { activeStep } = this.state;
    const activeStepDefinition = steps[activeStep];
    const shouldValidateActiveStep =
      !('validate' in activeStepDefinition) || activeStepDefinition.validate;
    if (shouldValidateActiveStep) {
      this.setState(
        {
          requestedStep: nextStepIndex,
        },
        () => this.submitStepForm(activeStep),
      );
    } else {
      this.setStep(nextStepIndex);
    }
  }

  submitStepForm(stepIndex) {
    this.stepRefs[stepIndex].current.onSubmit(new Event('submit'));
  }

  render() {
    const { steps, apiError, submitButtonLabel, t } = this.props;
    const stepLabels = steps.map(step => step.label);
    const { activeStep, stepValidations, submittedSteps, isSmallScreen } = this.state;

    const content = (
      <div>
        <div>
          {steps[activeStep].render({
            ref: this.stepRefs[activeStep],
            onValidationChange: this.onValidationChange,
            onSubmit: this.onStepSubmit,
          })}
        </div>
      </div>
    );

    const commonWizardProps = {
      activeStep,
      stepLabels,
      submitButtonLabel,
      apiError,
      handleNext: this.handleNext,
      handleBack: this.handleBack,
      t,
    };
    return (
      <Fragment>
        {isSmallScreen ? (
          <MobileWizardForm {...commonWizardProps}>{content}</MobileWizardForm>
        ) : (
          <DesktopWizardForm
            stepValidations={stepValidations}
            submittedSteps={submittedSteps}
            {...commonWizardProps}
          >
            {content}
          </DesktopWizardForm>
        )}
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
  apiError: PropTypes.bool,
  initialStep: PropTypes.number,
  submitButtonLabel: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

WizardForm.defaultProps = {
  initialStep: 0,
  apiError: false,
};

export default translate('WizardForm')(WizardForm);
