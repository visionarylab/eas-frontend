import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MultiValueInput from './MultiValueInput.jsx';

jest.mock('@material-ui/core/IconButton', () => {
  const ActualIcon = jest.requireActual('@material-ui/core/IconButton').default;
  const ActualReact = jest.requireActual('React');
  return ActualReact.forwardRef((props, ref) => (
    <div data-testid="AddValueIcon" {...props} ref={ref}>
      <ActualIcon />
    </div>
  ));
});

jest.mock('@material-ui/core/Input', () => {
  const ActualInput = jest.requireActual('@material-ui/core/Input').default;
  return props => (
    <div data-testid="Input">
      <ActualInput {...props} inputProps={{ 'data-testid': 'Input__input-field' }} />
    </div>
  );
});

const translations = {
  label: 'Input label',
  messageEmpty: 'No items selected',
  placeholder: 'Add items',
};

describe('MultiValueInput', () => {
  it('Should show placeholder when there are no values', () => {
    const { getByPlaceholderText } = render(
      <MultiValueInput name="field1" onChange={() => {}} {...translations} />,
    );
    expect(getByPlaceholderText(translations.placeholder)).toBeTruthy();
  });

  it('Should correctly render values using chips', () => {
    render(
      <MultiValueInput
        name="field1"
        value={['value 1', 'value 2']}
        onChange={() => {}}
        {...translations}
      />,
    );

    const chips = screen.getAllByRole('button');
    expect(chips.length).toEqual(2);

    expect(screen.getByText('value 1')).toBeTruthy();
    expect(screen.getByText('value 2')).toBeTruthy();
  });

  it('Should add value when it contains a comma', async () => {
    const onChangeMock = jest.fn();
    const values = [];
    render(
      <MultiValueInput name="field1" value={values} onChange={onChangeMock} {...translations} />,
    );

    await userEvent.type(screen.getByRole('textbox'), 'Value 1,');

    const expectedEvent = { target: { name: 'field1', value: ['Value 1'] } };
    expect(onChangeMock).toHaveBeenCalledWith(expectedEvent);
  });

  it('Should trim values before adding them', async () => {
    const onChangeMock = jest.fn();
    const values = [];
    render(
      <MultiValueInput name="field1" value={values} onChange={onChangeMock} {...translations} />,
    );

    await userEvent.type(screen.getByRole('textbox'), '    Value 1,');

    const expectedEvent = { target: { name: 'field1', value: ['Value 1'] } };
    expect(onChangeMock).toHaveBeenCalledWith(expectedEvent);
  });

  it('Should add value when the ENTER key is hit', async () => {
    const onChangeMock = jest.fn();
    const values = [];
    render(
      <MultiValueInput name="field1" value={values} onChange={onChangeMock} {...translations} />,
    );

    await userEvent.type(screen.getByRole('textbox'), 'Value 1{enter}');

    const expectedEvent = { target: { name: 'field1', value: ['Value 1'] } };
    expect(onChangeMock).toHaveBeenCalledWith(expectedEvent);
  });

  it('Should add value on input blur', async () => {
    const onChangeMock = jest.fn();
    const values = [];
    render(
      <MultiValueInput name="field1" value={values} onChange={onChangeMock} {...translations} />,
    );
    const input = screen.getByRole('textbox');
    await userEvent.type(input, 'Value 1');

    const expectedEvent = { target: { name: 'field1', value: ['Value 1'] } };
    fireEvent.blur(input);
    expect(onChangeMock).toHaveBeenCalledWith(expectedEvent);
  });

  it('Should not mutate the original value when values are added', async () => {
    const onChangeMock = jest.fn();
    const values = [];
    render(
      <MultiValueInput name="field1" value={values} onChange={onChangeMock} {...translations} />,
    );

    await userEvent.type(screen.getByRole('textbox'), 'Value 1{enter}');

    expect(values).toEqual([]);
  });

  it('Should process the input when a comma-separated list of values is pasted', () => {
    const onChangeMock = jest.fn();
    const { queryByTestId } = render(
      <MultiValueInput name="field1" onChange={onChangeMock} {...translations} />,
    );

    const event = { target: { name: 'field1', value: ' Value ok 1, Value ok 2   ,   ,,' } };
    fireEvent.change(queryByTestId('Input__input-field'), event);

    const expectedEvent = { target: { name: 'field1', value: ['Value ok 1', 'Value ok 2'] } };
    expect(onChangeMock).toHaveBeenCalledWith(expectedEvent);
  });

  it('Should be possible to remove items', () => {
    const onChangeMock = jest.fn();
    const values = ['Value 1', 'Value 2', 'Value 3'];
    const { container } = render(
      <MultiValueInput name="field1" value={values} onChange={onChangeMock} {...translations} />,
    );

    const secondChipDeleteButton = container.querySelector('.MuiChip-deletable:nth-child(2) svg');
    userEvent.click(secondChipDeleteButton);
    const expectedEvent = { target: { name: 'field1', value: ['Value 1', 'Value 3'] } };
    expect(onChangeMock).toHaveBeenCalledWith(expectedEvent);
  });

  it('Should not mutate the original value when values are removed', () => {
    const onChangeMock = jest.fn();
    const values = ['Value 1'];
    const { container } = render(
      <MultiValueInput name="field1" value={values} onChange={onChangeMock} {...translations} />,
    );
    fireEvent.click(container.querySelector('svg'));
    expect(values).toEqual(['Value 1']);
  });
});
