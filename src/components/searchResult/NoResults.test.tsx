import React from 'react';
import { NoResultCard } from './NoResults';
import { shallowRender } from '../../shared/services/testHelper';

describe('NoResults for search result', () => {
  it('renders correctly', () => {
    const tree = shallowRender(<NoResultCard />);
    expect(tree).toMatchSnapshot();
  });
});
