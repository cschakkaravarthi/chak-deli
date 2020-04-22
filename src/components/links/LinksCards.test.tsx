import React from 'react';
import { shallowRender } from '../../shared/services/testHelper';
import { LinksCards } from './LinksCards';
import { dummyFacetedContentGroupModel } from '../../shared/types/contentTypes';

describe('LinksCards', () => {
  it('renders correctly', () => {
    const tree = shallowRender(
      <LinksCards content={dummyFacetedContentGroupModel} category="type=article&category=12,13&group=category" />
    );
    expect(tree).toMatchSnapshot();
  });
});
