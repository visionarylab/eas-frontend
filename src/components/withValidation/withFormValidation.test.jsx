import React from 'react';
import PropTypes from 'prop-types';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import withFormValidation from './withFormValidation';

jest.mock('react-i18next', () => ({
  // this mock makes sure any components using the translate HoC receive the t function as a prop
  translate: () => Component => {
    // eslint-disable-next-line no-param-reassign
    Component.defaultProps = { ...Component.defaultProps, t: () => 'some translated stuff' };
    return Component;
  },
}));

// eslint-disable-next-line
const Form = ({ onFieldRegister, onFieldDeregister, onFieldChange, ...props }) => (
  <form {...props} />
);

const ValidationFeedbackMock = (props, context) => <div>{context.getFormError()}</div>;

ValidationFeedbackMock.contextTypes = {
  getFormError: PropTypes.func.isRequired,
};

// eslint-disable-next-line
const Field = ({ valid, FormHelperTextProps, helperText, error, ...props }) => <input type="text" {...props} />;

const FormWithValidation = withFormValidation(Form);

describe('withFormValidation', () => {
  it('should render correctly', () => {
    const wrapper = mount(<FormWithValidation onSubmit={jest.fn()} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  describe('Registering fields', () => {
    it('should register validated fields', () => {
      const wrapper = shallow(<FormWithValidation onSubmit={jest.fn()} />);
      const instance = wrapper.instance();

      instance.registerValidatedField('field1', true);
      instance.registerValidatedField('field2', false);

      wrapper.update();

      const { state } = instance;

      expect('field1' in state.validations).toBe(true);
      expect('field2' in state.validations).toBe(true);
      expect(state.validations.field1).toBe(true);
      expect(state.validations.field2).toBe(false);
    });

    it('should deregister validated fields', () => {
      const wrapper = shallow(<FormWithValidation onSubmit={jest.fn()} />);
      const instance = wrapper.instance();

      instance.registerValidatedField('field1', false);
      instance.registerValidatedField('field2', true);

      instance.deregisterValidatedField('field2');
      wrapper.update();

      const { state } = instance;

      expect('field1' in state.validations).toBe(true);
      expect('field2' in state.validations).toBe(false);
    });
  });

  describe('Form errors', () => {
    it('are not shown when there are not', () => {
      const wrapper = mount(
        <FormWithValidation onSubmit={jest.fn()} checkErrors={() => undefined}>
          <ValidationFeedbackMock />
        </FormWithValidation>,
      );
      expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('are not shown if the form is not submitted', () => {
      const wrapper = mount(
        <FormWithValidation onSubmit={jest.fn()} checkErrors={() => 'There are errors'}>
          <ValidationFeedbackMock />
        </FormWithValidation>,
      );
      expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('are not shown when fields change', () => {
      const wrapper = mount(
        <FormWithValidation onSubmit={jest.fn()} checkErrors={() => 'There are errors'}>
          <ValidationFeedbackMock />
        </FormWithValidation>,
      );
      const instance = wrapper.instance();
      instance.updateFieldValidationState('afield', false);
      wrapper.update();
      expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('are shown when the form is submitted', () => {
      const wrapper = mount(
        <FormWithValidation onSubmit={jest.fn()} checkErrors={() => 'There are errors'}>
          <ValidationFeedbackMock />
        </FormWithValidation>,
      );
      const instance = wrapper.instance();
      instance.setState({ formSubmitted: true });
      wrapper.update();
      expect(toJson(wrapper)).toMatchSnapshot();
    });
  });
});
describe('Submit', () => {
  it('Should store submitted state when submitted', () => {
    const wrapper = mount(<FormWithValidation onSubmit={jest.fn()} />);
    const instance = wrapper.instance();
    expect(instance.state.formSubmitted).toBe(false);
    wrapper.find('form').simulate('submit');
    expect(instance.state.formSubmitted).toBe(true);
  });

  it('Should call the main onSubmit function if the form is valid', () => {
    const onSubmitMock = jest.fn();
    const wrapper = mount(<FormWithValidation onSubmit={onSubmitMock} />);

    const instance = wrapper.instance();
    instance.isFormValid = jest.fn(() => true);

    wrapper.find('form').simulate('submit');
    expect(onSubmitMock).toHaveBeenCalled();
  });

  it('Should not call the main onSubmit function if the form is invalid', () => {
    const onSubmitMock = jest.fn();
    const wrapper = mount(<FormWithValidation onSubmit={onSubmitMock} />);

    const instance = wrapper.instance();
    instance.isFormValid = jest.fn(() => false);

    wrapper.find('form').simulate('submit');
    expect(onSubmitMock).not.toHaveBeenCalled();
  });
});
