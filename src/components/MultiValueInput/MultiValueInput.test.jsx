import React from 'react';
import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import MultiValueInput from './MultiValueInput';

describe('MultiValueInput', () => {
  it.only('Should render correctly without values', () => {
    const wrapper = shallow(
      <MultiValueInput
        label="Input label"
        labelDisplayList="Selected Items"
        messageEmpty="No items selected"
        onChange={() => {}}
      />,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it.only('Should render correctly with values', () => {
    const wrapper = shallow(
      <MultiValueInput
        label="Input label"
        name="coolInput"
        labelDisplayList="Selected Items"
        messageEmpty="No items selected"
        value={['value 1', 'value 2']}
        onChange={() => {}}
      />,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
