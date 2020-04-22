import React from 'react';
import { ArticlesScene } from './ArticlesScene';
import { MemoryRouter } from 'react-router-dom';
import { shallowRender } from '../../shared/services/testHelper';
import { dummyArticle } from '../../shared/models/Article.model';

describe('Feed', () => {
  it.skip('renders without articles', () => {
    const tree = shallowRender(
      <MemoryRouter>
        <ArticlesScene fetchContent={jest.fn()} />
      </MemoryRouter>
    );
    expect(tree).toMatchSnapshot();
  });

  it('renders with articles', () => {
    const tree = shallowRender(
      <MemoryRouter keyLength={0}>
        <ArticlesScene
          fetchContent={jest.fn()}
          content={[dummyArticle]}
        />
      </MemoryRouter>
    );
    expect(tree).toMatchSnapshot();
  });
});
