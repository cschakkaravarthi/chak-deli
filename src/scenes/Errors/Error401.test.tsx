import React from 'react';
import { Error401 } from './Error401';
import { shallowRender } from '../../shared/services/testHelper';

describe('Error401', () => {
  it('renders Error401', () => {
    const tree = shallowRender(<Error401 />);
    expect(tree).toMatchSnapshot();
  });
});
