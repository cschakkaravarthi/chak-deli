import React from 'react';
import {
  dummyArticle,
  dummyArticleList
} from '../../shared/models/Article.model';
import { ArticleScene } from './ArticleScene';
import { shallowRender } from '../../shared/services/testHelper';

const mockMatch = { params: { id: 1 }, isExact: true, path: '', url: '' };

describe('ArticleScene', () => {
  it('renders null without article', () => {
    const tree = shallowRender(<ArticleScene/>);
    expect(tree).toEqual(null);
  });

  it('renders with article', () => {
    const tree = shallowRender(
      <ArticleScene content={dummyArticle} match={mockMatch}/>
    );
    expect(tree).toMatchSnapshot();
  });

  it('renders null when no url param is present', () => {
    const tree = shallowRender(
      <ArticleScene
        content={dummyArticle}
        match={{ ...mockMatch, params: { id: null } }}/>
    );
    expect(tree).toEqual(null);
  });

  it('compares ids', () => {
    const tree = shallowRender(
      <ArticleScene
        match={mockMatch}
        content={dummyArticleList[0]}
      />
    );
    expect(tree).toMatchSnapshot();
  });
});
