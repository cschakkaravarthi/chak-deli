import React from 'react';
import Error404 from './Error404';
import { shallowRender } from '../../shared/services/testHelper';

describe('Error404', () => {
  it('renders Error404', () => {
    const tree = shallowRender(<Error404 />);
    expect(tree).toMatchSnapshot();
  });
});
