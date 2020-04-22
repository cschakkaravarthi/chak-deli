import React from 'react';
import { shallowRender } from '../../shared/services/testHelper';
import { LandingArticlesAndEvents } from './LandingArticlesAndEvents';
import { dummyArticleList } from '../../shared/models/Article.model';
import { dummyEvents } from '../../shared/models/Event.model';

describe('LandingArticlesAndEvents', () => {
  it('null on articles and events components', () => {
    const tree = shallowRender(
      <LandingArticlesAndEvents eventsList={[]} articleList={[]} />
    );
    expect(tree).toMatchSnapshot();
  });

  it('renders articles and events', () => {
    const tree = shallowRender(
      <LandingArticlesAndEvents eventsList={dummyEvents} articleList={dummyArticleList} />
    );
    expect(tree).toMatchSnapshot();
  });
});
