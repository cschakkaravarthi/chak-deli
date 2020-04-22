import {
  SEARCH_RESPONSE_SUCCESS
} from './../types/searchResultTypes';
import searchResultReducers, { initialState } from './searchResultReducers';
import { dummyArticleList } from '../models/Article.model';
import { dummyEvents } from '../models/Event.model';
import { dummyPeoples } from '../models/People.model';

describe('searchResultReducers', () => {
  it('Handles default case', () => {
    const state = searchResultReducers(undefined, {});
    expect(state).toEqual(initialState);
  });

  it('Handles load search results action', () => {
    const action = { type: SEARCH_RESPONSE_SUCCESS, articles: dummyArticleList, events: dummyEvents, people: dummyPeoples };
    const state = searchResultReducers(undefined, action);
    expect(state).toMatchSnapshot();
  });
});
