import React from 'react';
import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import MultiValueDisplay from './MultiValueDisplay.jsx';

describe('MultiValueDisplay', () => {
  beforeEach(() => {
    Math.random = jest.fn(() => 1);
  });

  it('Should render correctly without values', () => {
    const wrapper = shallow(
      <MultiValueDisplay label="Input label" name="coolInput" messageEmpty="No items selected" />,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('Should render correctly with values', () => {
    const wrapper = shallow(
      <MultiValueDisplay
        label="Input label"
        name="coolInput"
        messageEmpty="No items selected"
        values={['value 1', 'value 2']}
      />,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('Chip.onDelete should be null if onDelete is not supplied', () => {
    const wrapper = shallow(
      <MultiValueDisplay
        label="Input label"
        name="coolInput"
        messageEmpty="No items selected"
        values={['value 2']}
      />,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('Chip.onDelete should be onDelete when supplied', () => {
    const wrapper = shallow(
      <MultiValueDisplay
        label="Input label"
        name="coolInput"
        messageEmpty="No items selected"
        values={['value 2']}
        onDelete={() => {}}
      />,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('Deleting an item should call onDelete prop', () => {
    const onDeleteMock = jest.fn();
    const wrapper = mount(
      <MultiValueDisplay
        label="Input label"
        name="coolInput"
        messageEmpty="No items selected"
        values={['value 6']}
        onDelete={onDeleteMock}
      />,
    );
    wrapper.find('svg').simulate('click');
    expect(onDeleteMock).toHaveBeenCalledWith('value 6');
  });
});
