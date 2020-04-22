import React from 'react';
import { shallowRender } from '../../shared/services/testHelper';
import { LastArticles } from './LastArticles';
import { dummyArticleList } from '../../shared/models/Article.model';

// This doesn't need to test when articles are null since that logic is present on another component
describe('Las articles render properly', () => {
  it('renders correctly', () => {
    const tree = shallowRender(
      <LastArticles articleList={dummyArticleList} />
    );
    expect(tree).toMatchSnapshot();
  });
});
