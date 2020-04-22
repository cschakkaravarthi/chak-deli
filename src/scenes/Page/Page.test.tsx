import React from 'react';
import { Page } from './Page';
import { shallowRender } from '../../shared/services/testHelper';

const mockMatch = { params: { id: 1 }, isExact: true, path: '', url: '' };

describe('Page', () => {
  it('renders Page', () => {
    const tree = shallowRender(<Page pages={[]} match={mockMatch}/>);
    expect(tree).toMatchSnapshot();
  });

  it('renders null without page', () => {
    const tree = shallowRender(<Page pages={[]} />);
    expect(tree).toEqual(null);
  });
});
