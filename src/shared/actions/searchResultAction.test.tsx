import moxios from 'moxios';
import {
  loadSearchResponse,
  fetchSearchResults
} from './searchResultAction';
import { dummyArticles } from '../models/Article.model';
import getStore from '../services/mockGlobalStore';
import { dummyEvents } from '../models/Event.model';
import { dummyPeoples } from '../models/People.model';

describe('searchResultActions', () => {
  let store: any;
  beforeEach(() => {
    store = getStore();
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('creates a loadSearchResults action', () => {
    const SearchResultState = {
      articles: dummyArticles,
      events: dummyEvents,
      people: dummyPeoples,
      isFetch: true,
      selectedType: 'all',
      selectedFacet: 'all',
      isLastPage: false,
      pageCount: 1
    };
    expect(loadSearchResponse(SearchResultState)).toMatchSnapshot();
  });

  // @TODO: we should a find a way to avoid calling the api directly
  it.skip('fetchSearchResults makes API call', done => {
    const expectedActions = ['LOAD_SEARCH_RESULTS'];

    moxios.stubRequest('/search?query=test&limit=5', {
      status: 200,
      responseText: 'OK'
    });

    store
      .dispatch(fetchSearchResults())
      .then(() => {
        const actionsCalled = store
          .getActions()
          .map((action: any) => action.type);
        expect(actionsCalled).toEqual(expectedActions);
        done();
      })
      .catch((error: any) => {
        done(error);
      });
  });
});
