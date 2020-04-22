import React from 'react';
import { GetFilterType } from './filterType';
import { shallowRender } from '../../shared/services/testHelper';

describe('GetFilterType for search result', () => {
  it('renders correctly', () => {
    const tree = shallowRender(<GetFilterType typeInQuery="article" />);
    expect(tree).toMatchSnapshot();
  });
});
