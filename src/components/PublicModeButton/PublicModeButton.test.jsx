import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router';
import PublicModeButton from './PublicModeButton.jsx';
// import withTracking from '../withTracking/withTracking.jsx';

// jest.mock('../withTracking/withTracking.jsx', () => () => adssa => props =>
//   console.log('asdadas--') || <div />,
// );

const mockTracking = jest.fn(() => console.log('mocked!!'));
jest.mock('../withTracking/withTracking.jsx', () => Component2 => props => (
  <Component2 {...props} track={mockTracking} />
));

describe('PublicModeButton', () => {
  it('should render all buttons by default', () => {
    const trackingData = { something: 'yes' };
    const wrapper = mount(
      <MemoryRouter>
        <PublicModeButton to="/somewhere" label="click here" trackingData={trackingData} />
      </MemoryRouter>,
    );
    wrapper.find('a').simulate('click');
    expect(mockTracking.mock.calls.length).toEqual(1);
    expect(mockTracking).toBeCalledWith(trackingData);
  });
});
