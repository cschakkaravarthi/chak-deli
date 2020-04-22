import React from 'react';
import { dummyArticleList } from '../../shared/models/Article.model';
import { dummyEvents } from '../../shared/models/Event.model';
import { dummyPeoples } from '../../shared/models/People.model';
import { SearchResultsScene } from './SearchResultsScene';
import { MemoryRouter } from 'react-router-dom';
import { shallowRender } from '../../shared/services/testHelper';

describe('SearchResultScene', () => {
  it('renders null without Search Result', () => {
    const tree = shallowRender(
      <MemoryRouter keyLength={0}>
        <SearchResultsScene/>
      </MemoryRouter>
    );
    expect(tree).toMatchSnapshot();
  });

  it('renders with search result', () => {
    const tree = shallowRender(
      <MemoryRouter keyLength={0}>
        <SearchResultsScene articles={dummyArticleList} events={dummyEvents}
          people={dummyPeoples}/>
      </MemoryRouter>
    );
    expect(tree).toMatchSnapshot();
  });
});
