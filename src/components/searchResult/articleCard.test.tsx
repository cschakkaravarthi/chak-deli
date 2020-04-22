import React from 'react';
import { ArticleCard } from './articleCard';
import { dummyArticleList } from '../../shared/models/Article.model';
import { shallowRender } from '../../shared/services/testHelper';
import { MemoryRouter } from 'react-router-dom';

describe('ArticleCard for search result', () => {
  it('renders correctly with props', () => {
    const tree = shallowRender(
      <MemoryRouter keyLength={0}>
        <ArticleCard article={dummyArticleList[0]} />
      </MemoryRouter>
    );
    expect(tree).toMatchSnapshot();
  });
});
