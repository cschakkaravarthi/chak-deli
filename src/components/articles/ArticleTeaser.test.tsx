import React from 'react';
import ArticleTeaser from './ArticleTeaser';
import { dummyArticle } from '../../shared/models/Article.model';
import { shallowRender } from '../../shared/services/testHelper';

describe('ArticleTeaser', () => {
  it('renders null without article', () => {
    const tree = shallowRender(<ArticleTeaser />);
    expect(tree).toBe(null);
  });

  it('renders correctly with article', () => {
    const tree = shallowRender(<ArticleTeaser article={dummyArticle} />);
    expect(tree).toMatchSnapshot();
  });

  it.todo('is clickable');
});
