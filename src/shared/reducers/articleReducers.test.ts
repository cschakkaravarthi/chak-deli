import {
  LOAD_ARTICLE_BY_ID,
  FETCH_MORE_ARTICLES
} from './../types/articleTypes';
import articleReducers, { initialState } from './articleReducers';
import { LOAD_ARTICLES } from '../types/articleTypes';
import { dummyArticles, dummyArticle } from '../models/Article.model';
import { mockedFacets } from '../models/Facet.model';

describe('articleReducers', () => {
  it('Handles default case', () => {
    const state = articleReducers(undefined, {});
    expect(state).toEqual(initialState);
  });

  it('Handles loadArticles action', () => {
    const action = { type: LOAD_ARTICLES, articleList: dummyArticles };
    const state = articleReducers(undefined, action);
    expect(state).toMatchSnapshot();
  });

  it('Handles loadArticleById action', () => {
    const action = { type: LOAD_ARTICLE_BY_ID, article: dummyArticle };
    const state = articleReducers(undefined, action);
    expect(state).toMatchSnapshot();
  });

  it('Handles loadMoreArticles action', () => {
    const action = {
      type: FETCH_MORE_ARTICLES,
      articleList: dummyArticles.concat(dummyArticles),
      facets: mockedFacets
    };
    const state = articleReducers(undefined, action);
    expect(state).toMatchSnapshot();
  });
});
