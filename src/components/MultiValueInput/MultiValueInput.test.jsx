import React from 'react';
import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { render, fireEvent } from '@testing-library/react';
import MultiValueInput from './MultiValueInput.jsx';

jest.mock('@material-ui/core/IconButton', () => {
  const ActualIcon = jest.requireActual('@material-ui/core/IconButton');
  const ActualReact = jest.requireActual('React');
  return ActualReact.forwardRef((props, ref) => (
    <div data-testid="AddValueIcon" {...props} ref={ref}>
      <ActualIcon.default />
    </div>
  ));
});

const translation = {
  label: 'Input label',
  labelDisplayList: 'Selected Items',
  messageEmpty: 'No items selected',
  tooltipAddValue: 'Add item',
};

describe('MultiValueInput', () => {
  beforeEach(() => {
    Math.random = jest.fn(() => 1);
  });

  it('Should render correctly without values', () => {
    const wrapper = shallow(<MultiValueInput name="field1" onChange={() => {}} {...translation} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('Should render correctly with values', () => {
    const wrapper = shallow(
      <MultiValueInput
        name="field1"
        value={['value 1', 'value 2']}
        onChange={() => {}}
        {...translation}
      />,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('Pasting a comma separated list of values should return trimmed values', () => {
    const onChangeMock = jest.fn();
    const wrapper = mount(
      <MultiValueInput
        name="field1"
        onChange={onChangeMock}
        data-testid="MultiValueInput__field"
        inputProps={{ 'data-testid': 'MultiValueInput__field-input' }}
        {...translation}
      />,
    );
    const input = wrapper.find('input');
    const event = { target: { name: 'field1', value: ' Value 1, Value 2   ,   ,,' } };
    input.simulate('change', event);
    const expectedEvent = { target: { name: 'field1', value: ['Value 1', 'Value 2'] } };
    expect(onChangeMock).toHaveBeenCalledWith(expectedEvent);
  });

  it('Should trim values', () => {
    const onChangeMock = jest.fn();
    const wrapper = mount(
      <MultiValueInput
        name="field1"
        onChange={onChangeMock}
        data-testid="MultiValueInput__field"
        inputProps={{ 'data-testid': 'MultiValueInput__field-input' }}
        {...translation}
      />,
    );
    const input = wrapper.find('input');
    const event = { target: { name: 'field1', value: ' Value 1, Value 2   ,   ,,' } };
    input.simulate('change', event);
    const expectedEvent = { target: { name: 'field1', value: ['Value 1', 'Value 2'] } };
    expect(onChangeMock).toHaveBeenCalledWith(expectedEvent);
  });

  it('Should not mutate the original value when values are added', () => {
    const onChangeMock = jest.fn();
    const initialValue = [];
    const wrapper = mount(
      <MultiValueInput
        name="field1"
        value={initialValue}
        onChange={onChangeMock}
        data-testid="MultiValueInput__field"
        inputProps={{ 'data-testid': 'MultiValueInput__field-input' }}
        {...translation}
      />,
    );
    const input = wrapper.find('input');
    const event = { target: { name: 'field1', value: ' Value 1,' } };
    input.simulate('change', event);
    const expectedEvent = { target: { name: 'field1', value: ['Value 1'] } };
    expect(onChangeMock).toHaveBeenCalledWith(expectedEvent);
    expect(initialValue).toEqual([]);
  });

  it('Should not mutate the original value when values are removed', () => {
    const onChangeMock = jest.fn();
    const initialValue = ['Value 1'];
    const wrapper = mount(
      <MultiValueInput
        name="field1"
        value={initialValue}
        onChange={onChangeMock}
        data-testid="MultiValueInput__field"
        inputProps={{ 'data-testid': 'MultiValueInput__field-input' }}
        {...translation}
      />,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.find('svg').simulate('click');
    const expectedEvent = { target: { name: 'field1', value: [] } };
    expect(onChangeMock).toHaveBeenCalledWith(expectedEvent);
    expect(initialValue).toEqual(['Value 1']);
  });

  it('Should have a button to add the current value', () => {
    const onChangeMock = jest.fn();
    const initialValue = [];
    const { queryByTestId } = render(
      <MultiValueInput
        name="field1"
        value={initialValue}
        onChange={onChangeMock}
        inputProps={{ 'data-testid': 'MultiValueInput__field-input' }}
        {...translation}
      />,
    );

    const event = { target: { name: 'field1', value: 'David' } };
    fireEvent.change(queryByTestId('MultiValueInput__field-input'), event);

    expect(queryByTestId('AddValueIcon')).toBeTruthy();
    fireEvent.click(queryByTestId('AddValueIcon'));
    expect(onChangeMock).toHaveBeenCalledWith({ target: { name: 'field1', value: ['David'] } });
  });
});
