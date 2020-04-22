import React from 'react';
import ArticleList from './ArticleList';
import { dummyArticles } from '../../shared/models/Article.model';
import { shallowRender } from '../../shared/services/testHelper';

describe('ArticleList', () => {
  it('renders null without articles', () => {
    const tree = shallowRender(<ArticleList />);
    expect(tree).toBe(null);
  });

  it('renders correctly with articles', () => {
    const tree = shallowRender(<ArticleList articles={dummyArticles} />);
    expect(tree).toMatchSnapshot();
  });
});
