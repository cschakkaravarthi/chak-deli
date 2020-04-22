import React from 'react';
import SearchResults from './searchResults';
import { dummyArticleList } from '../../shared/models/Article.model';
import { dummyEvents } from '../../shared/models/Event.model';
import { dummyPeoples } from '../../shared/models/People.model';
import { shallowRender } from '../../shared/services/testHelper';
import { MemoryRouter } from 'react-router-dom';

describe('SearchResultPage', () => {
  it.skip('renders null without search result', () => {
    const tree = shallowRender(
      <MemoryRouter>
        <SearchResults searchKeyword="test" articles={dummyArticleList} events={dummyEvents} people={dummyPeoples} />
      </MemoryRouter>
    );
    expect(tree).toEqual(null);
  });

  it('renders correctly with props', () => {
    const tree = shallowRender(
      <MemoryRouter keyLength={0}>
        <SearchResults searchKeyword="test" articles={dummyArticleList} events={dummyEvents} people={dummyPeoples} />
      </MemoryRouter>
    );
    expect(tree).toMatchSnapshot();
  });
});
