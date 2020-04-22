import React from 'react';
import { shallowRender } from '../../shared/services/testHelper';
import { ArticlesMinimalList } from './ArticlesMinimalList';
import { dummyArticleList } from '../../shared/models/Article.model';

// This doesn't need to test when articles are null since that logic is present on another component
describe('ArticlesMinimalList', () => {
  it('renders correctly', () => {
    const tree = shallowRender(
      <ArticlesMinimalList articleList={dummyArticleList} />
    );
    expect(tree).toMatchSnapshot();
  });
});
