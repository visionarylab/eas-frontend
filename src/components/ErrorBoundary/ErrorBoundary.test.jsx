import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import ErrorBoundary from './ErrorBoundary.jsx';

const ErrorChild = () => {
  throw Error('Exception stuff');
};

const swallowErrors = codeToRun => {
  const { error } = console; // eslint-disable-line no-console
  console.error = () => {}; // eslint-disable-line no-console
  codeToRun();
  console.error = error; // eslint-disable-line no-console
};

describe('ErrorBoundary', () => {
  beforeAll(() => {
    window.Raven = { captureException: jest.fn(() => {}) };
  });
  it('Should catch errors', () => {
    swallowErrors(() => {
      const wrapper = mount(
        <ErrorBoundary render={() => 'Fire, this is fine'}>
          <ErrorChild />
        </ErrorBoundary>,
      );
      expect(toJson(wrapper)).toMatchSnapshot();
    });
  });
  it('Should try to send the error to Sentry', () => {
    swallowErrors(() => {
      shallow(
        <ErrorBoundary render={() => 'Fire, this is fine'}>
          <ErrorChild />
        </ErrorBoundary>,
      );
      expect(window.Raven.captureException).toHaveBeenCalled();
    });
  });
});
