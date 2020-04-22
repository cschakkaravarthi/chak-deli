import React from 'react';
import { BrandsLabels } from './BrandsLabels';
import { shallowRender } from '../../shared/services/testHelper';

describe('BrandsLabels', () => {
  it('renders BrandsLabels', () => {
    const tree = shallowRender(<BrandsLabels/>);
    expect(tree).toMatchSnapshot();
  });
});
