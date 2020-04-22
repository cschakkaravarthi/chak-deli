import React from 'react';
import { Error400 } from './Error400';
import { shallowRender } from '../../shared/services/testHelper';

describe('Error400', () => {
  it('renders Error400', () => {
    const tree = shallowRender(<Error400 />);
    expect(tree).toMatchSnapshot();
  });
});
