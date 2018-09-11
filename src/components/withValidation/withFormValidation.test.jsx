import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import withFormValidation from './withFormValidation';
import withFieldValidation from './withFieldValidation';
import ValidationFeedback from './ValidationFeedback';

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

const updateFieldValue = (wrapper, value) =>
  wrapper.setProps({
    children: React.cloneElement(wrapper.props().children, { value }),
  });

// eslint-disable-next-line
const Field = ({ valid, FormHelperTextProps, helperText, error, ...props }) => <input type="text" {...props} />;

const FormWithValidation = withFormValidation(Form);
const FieldwithValidation = withFieldValidation(Field);

describe('withFormValidation', () => {
  it('should render correctly', () => {
    const wrapper = mount(<FormWithValidation onSubmit={jest.fn()} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  describe('Registering fields', () => {
    it('empty fields should register as "unchanged"', () => {
      const wrapper = mount(
        <FormWithValidation onSubmit={jest.fn()}>
          <FieldwithValidation name="field1" id="field" />
        </FormWithValidation>,
      );
      const instance = wrapper.instance();

      expect(instance.state.changedFields).not.toContain('field1');
    });

    it('fields with initial values should register as "changed"', () => {
      const wrapper = mount(
        <FormWithValidation onSubmit={jest.fn()}>
          <FieldwithValidation name="field1" id="field" value="A value" />
        </FormWithValidation>,
      );
      const instance = wrapper.instance();

      expect(instance.state.changedFields).toContain('field1');
    });
  });

  describe('onChange', () => {
    it('should call the parent onChange function on changes', () => {
      const onChange = jest.fn();
      const wrapper = mount(
        <FormWithValidation onSubmit={jest.fn()}>
          <FieldwithValidation name="field1" id="field" onChange={onChange} />
        </FormWithValidation>,
      );

      const fieldDomElement = wrapper.find('#field').last();
      const event = { target: { name: 'field1', value: 'asd' } };
      fieldDomElement.simulate('change', event);
      wrapper.update();

      expect(onChange).toHaveBeenCalled();
    });
  });

  describe('Errors', () => {
    describe('Required field', () => {
      it('A required registered filled field is valid', () => {
        const wrapper = mount(
          <FormWithValidation onSubmit={jest.fn()}>
            <FieldwithValidation
              name="field1"
              id="field"
              value="asd"
              validators={[{ rule: 'required' }]}
            />
          </FormWithValidation>,
        );
        const instance = wrapper.instance();
        expect(instance.state.fieldErrors).toEqual({});
        expect(instance.getErrorsToRenderInField('field1')).toBeUndefined();
        expect(instance.isFormValid()).toBe(true);
        wrapper.update();
        expect(toJson(wrapper)).toMatchSnapshot();
      });

      it('A required field registered with empty value should be invalid but still do not show the error', () => {
        const wrapper = mount(
          <FormWithValidation onSubmit={jest.fn()}>
            <FieldwithValidation name="field1" id="field" validators={[{ rule: 'required' }]} />
          </FormWithValidation>,
        );

        const instance = wrapper.instance();
        expect(instance.state.fieldErrors).toEqual({ field1: { rule: 'required' } });
        expect(instance.getErrorsToRenderInField('field1')).toBeUndefined();
        expect(instance.isFormValid()).toBe(false);
        wrapper.update();
        expect(toJson(wrapper)).toMatchSnapshot();
      });

      it('Should have errors when cleared', () => {
        const wrapper = mount(
          <FormWithValidation onSubmit={jest.fn()}>
            <FieldwithValidation
              name="field1"
              id="field"
              value="a value"
              validators={[{ rule: 'required' }]}
            />
          </FormWithValidation>,
        );
        updateFieldValue(wrapper, '');

        const instance = wrapper.instance();
        expect(instance.state.fieldErrors).toEqual({ field1: { rule: 'required' } });
        expect(instance.getErrorsToRenderInField('field1')).toEqual({ rule: 'required' });
        expect(instance.isFormValid()).toBe(false);
        wrapper.update();
        expect(toJson(wrapper)).toMatchSnapshot();
      });

      it('Should recover from errors when filled', () => {
        const wrapper = mount(
          <FormWithValidation onSubmit={jest.fn()}>
            <FieldwithValidation
              name="field1"
              id="field"
              value="a value"
              validators={[{ rule: 'required' }]}
            />
          </FormWithValidation>,
        );
        updateFieldValue(wrapper, '');

        const instance = wrapper.instance();
        expect(instance.state.fieldErrors).toEqual({ field1: { rule: 'required' } });
        expect(instance.getErrorsToRenderInField('field1')).toEqual({ rule: 'required' });
        expect(instance.isFormValid()).toBe(false);

        updateFieldValue(wrapper, 'Im not empty');
        expect(instance.state.fieldErrors).toEqual({});
        expect(instance.getErrorsToRenderInField('field1')).toBeUndefined();
        expect(instance.isFormValid()).toBe(true);
        wrapper.update();
        expect(toJson(wrapper)).toMatchSnapshot();
      });
    });

    describe('Integer with minimum value', () => {
      it('Register field with a valid initial value should not have errors', () => {
        const wrapper = mount(
          <FormWithValidation onSubmit={jest.fn()}>
            <FieldwithValidation
              name="field1"
              id="field"
              value="10"
              validators={[{ rule: 'min', value: 5 }]}
            />
          </FormWithValidation>,
        );

        const instance = wrapper.instance();
        expect(instance.state.fieldErrors).toEqual({});
        expect(instance.getErrorsToRenderInField('field1')).toBeUndefined();
        expect(instance.isFormValid()).toBe(true);
        wrapper.update();
        expect(toJson(wrapper)).toMatchSnapshot();
      });

      it('Register field with an invalid initial value should have errors', () => {
        const wrapper = mount(
          <FormWithValidation onSubmit={jest.fn()}>
            <FieldwithValidation
              name="field1"
              id="field"
              value="2"
              validators={[{ rule: 'min', value: 5 }]}
            />
          </FormWithValidation>,
        );

        const instance = wrapper.instance();
        expect(instance.state.fieldErrors).toEqual({ field1: { rule: 'min', value: 5 } });
        expect(instance.getErrorsToRenderInField('field1')).toEqual({ rule: 'min', value: 5 });
        expect(instance.isFormValid()).toBe(false);
        wrapper.update();
        expect(toJson(wrapper)).toMatchSnapshot();
      });

      it('Update a field from valid to invalid should have errors', () => {
        const wrapper = mount(
          <FormWithValidation onSubmit={jest.fn()}>
            <FieldwithValidation
              name="field1"
              id="field"
              value="10"
              validators={[{ rule: 'min', value: 1 }]}
            />
          </FormWithValidation>,
        );

        const instance = wrapper.instance();
        expect(instance.state.fieldErrors).toEqual({});
        expect(instance.getErrorsToRenderInField('field1')).toBeUndefined();
        expect(instance.isFormValid()).toBe(true);

        updateFieldValue(wrapper, '0');
        expect(instance.state.fieldErrors).toEqual({ field1: { rule: 'min', value: 1 } });
        expect(instance.getErrorsToRenderInField('field1')).toEqual({ rule: 'min', value: 1 });
        expect(instance.isFormValid()).toBe(false);
        wrapper.update();
        expect(toJson(wrapper)).toMatchSnapshot();
      });

      it('Update a field from invalid to valid should recover from the error', () => {
        const wrapper = mount(
          <FormWithValidation onSubmit={jest.fn()}>
            <FieldwithValidation
              name="field1"
              id="field"
              value="0"
              validators={[{ rule: 'min', value: 1 }]}
            />
          </FormWithValidation>,
        );

        const instance = wrapper.instance();
        expect(instance.state.fieldErrors).toEqual({ field1: { rule: 'min', value: 1 } });

        updateFieldValue(wrapper, '5');
        expect(instance.state.fieldErrors).toEqual({});
        expect(instance.getErrorsToRenderInField('field1')).toBeUndefined();
        expect(instance.isFormValid()).toBe(true);
        wrapper.update();
        expect(toJson(wrapper)).toMatchSnapshot();
      });
    });
    describe('Global errors', () => {
      it('Should show global form errors', () => {
        const wrapper = mount(
          <FormWithValidation onSubmit={jest.fn()} checkErrors={() => 'There are errors'}>
            <FieldwithValidation name="field1" id="field" value="1" />
            <ValidationFeedback />
          </FormWithValidation>,
        );
        const instance = wrapper.instance();
        expect(instance.isFormValid()).toBe(false);
        expect(toJson(wrapper)).toMatchSnapshot();
      });

      it('Global errors are not shown if there are not errors', () => {
        const wrapper = mount(
          <FormWithValidation onSubmit={jest.fn()} checkErrors={() => undefined}>
            <FieldwithValidation name="field1" id="field" value="1" />
            <ValidationFeedback />
          </FormWithValidation>,
        );
        const instance = wrapper.instance();
        expect(instance.isFormValid()).toBe(true);
        expect(toJson(wrapper)).toMatchSnapshot();
      });
    });
  });
  describe('Submit', () => {
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

    it('Should show errors', () => {
      const wrapper = mount(
        <FormWithValidation onSubmit={jest.fn()}>
          <FieldwithValidation name="field1" id="field" validators={[{ rule: 'required' }]} />
        </FormWithValidation>,
      );

      const instance = wrapper.instance();
      expect(instance.state.fieldErrors).toEqual({ field1: { rule: 'required' } });
      expect(instance.getErrorsToRenderInField('field1')).toBeUndefined();
      expect(instance.isFormValid()).toBe(false);

      wrapper.find('form').simulate('submit');
      expect(instance.getErrorsToRenderInField('field1')).toEqual({ rule: 'required' });

      wrapper.update();
      expect(toJson(wrapper)).toMatchSnapshot();
    });
  });
});
