import React from 'react';
import ProfileDeactivated from './ProfileDeactivated';
import { shallowRender } from '../../shared/services/testHelper';

describe('ProfileDeactivated', () => {
  it('renders ProfileDeactivated', () => {
    const tree = shallowRender(<ProfileDeactivated />);
    expect(tree).toMatchSnapshot();
  });
});
