import React from 'react';
import Error500 from './Error500';
import { shallowRender } from '../../shared/services/testHelper';

describe('Error500', () => {
  it('renders Error500', () => {
    const tree = shallowRender(<Error500 />);
    expect(tree).toMatchSnapshot();
  });
});
