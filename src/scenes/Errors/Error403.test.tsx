import React from 'react';
import { Error403 } from './Error403';
import { shallowRender } from '../../shared/services/testHelper';

describe('Error403', () => {
  it('renders Error403', () => {
    const tree = shallowRender(<Error403 />);
    expect(tree).toMatchSnapshot();
  });
});
