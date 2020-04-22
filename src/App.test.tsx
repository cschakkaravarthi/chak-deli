import React from 'react';
import { shallowRender } from './shared/services/testHelper';
import App from './App';
import ReactGA from 'react-ga';
jest.mock('react-ga');

describe('App', () => {
  it('renders correctly', () => {
    expect(ReactGA.initialize);
    const tree = shallowRender(<App />);
    expect(tree).toMatchSnapshot();
  });
});

describe('Timezones', () => {
  it('should always be UTC', () => {
    expect(new Date().getTimezoneOffset()).toBe(0);
  });
});
