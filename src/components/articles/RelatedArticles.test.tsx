import React from 'react';
import { dummyArticles } from '../../shared/models/Article.model';
import { shallowRender } from '../../shared/services/testHelper';
import RelatedArticles from './RelatedArticles';

describe('RelatedArticles', () => {
  it('renders null without article', () => {
    const tree = shallowRender(<RelatedArticles />);
    expect(tree).toBe(null);
  });
  it('renders correctly with article', () => {
    const tree = shallowRender(<RelatedArticles articles={dummyArticles} />);
    expect(tree).toMatchSnapshot();
  });
});
