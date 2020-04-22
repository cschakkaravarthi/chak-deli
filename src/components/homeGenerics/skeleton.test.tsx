import React from 'react';
import { shallowRender } from '../../shared/services/testHelper';
import HomeGenericSkeleton from './skeleton';

describe('HomeGenericSkeleton', () => {
  it('renders properly', () => {
    const tree = shallowRender(<HomeGenericSkeleton />);
    expect(tree).toMatchSnapshot();
  });
});
