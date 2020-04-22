import moxios from 'moxios';
import {
  loadArticles,
  fetchArticles,
  loadArticleById,
  loadMoreArticles,
  fetchHomeArticles,
  fetchArticleById
} from './articleActions';
import { dummyArticles, dummyArticle } from '../models/Article.model';
import { mockedFacets } from '../models/Facet.model';
import getStore from '../services/mockGlobalStore';

describe('articleActions', () => {
  let store: any;
  beforeEach(() => {
    store = getStore();
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('creates a loadArticleById action', () => {
    expect(loadArticleById(dummyArticle)).toMatchSnapshot();
  });

  it('creates a loadArticles action', () => {
    expect(loadArticles(dummyArticles)).toMatchSnapshot();
  });

  it('creates a loadMoreArticles action', () => {
    const ContentWithFacets = {
      articleList: dummyArticles,
      facets: mockedFacets
    };
    expect(loadMoreArticles(ContentWithFacets)).toMatchSnapshot();
  });

  // @TODO: we should a find a way to avoid calling the api directly
  it.skip('fetchHomeArticles makes API call', done => {
    const expectedActions = ['LOAD_ARTICLES'];

    moxios.stubRequest('content?type=article&limit=3&sort=latest', {
      status: 200,
      responseText: 'OK'
    });

    store
      .dispatch(fetchHomeArticles())
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

  // @TODO: we should a find a way to avoid calling the api directly
  it.skip('fetchArticles makes API call', done => {
    const expectedActions = ['LOAD_ARTICLES'];

    moxios.stubRequest('/content?type=article&page=1&limit=5', {
      status: 200,
      responseText: 'OK'
    });

    store
      .dispatch(fetchArticles())
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

  // @TODO: we should a find a way to avoid calling the api directly
  it.skip('fetchArticleById makes API call', done => {
    const expectedActions = ['LOAD_ARTICLE_BY_ID'];

    moxios.stubRequest('articles?id=28', {
      status: 200,
      responseText: 'OK'
    });

    store
      .dispatch(fetchArticleById('28'))
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
