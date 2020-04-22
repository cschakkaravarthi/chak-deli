import { Reducer } from 'redux';
import {
  ArticleState,
  CLEAR_ARTICLES_LIST,
  FETCH_MORE_ARTICLES,
  LOAD_ARTICLE_BY_ID,
  LOAD_ARTICLES,
  SET_ARTICLE_FILTER_FACET
} from '../types/articleTypes';

export const initialState = {
  articleList: [],
  isLastPage: false,
  facets: {},
  selectedFacet: '0',
  pageCount: 1
};

const articleReducers: Reducer<ArticleState, any> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case FETCH_MORE_ARTICLES:
      return {
        ...state,
        isLastPage: action.articleList.length === 0,
        articleList: state.articleList.concat(action.articleList),
        facets: action.facets,
        pageCount: state.pageCount + 1
      };
    case LOAD_ARTICLES:
      return {
        ...state,
        articleList: action.articleList
      };
    case LOAD_ARTICLE_BY_ID:
      return {
        ...state,
        articleList: [
          ...state.articleList.filter(article => article.drupal_id !== action.article.drupal_id),
          action.article
        ]
      };
    case SET_ARTICLE_FILTER_FACET:
      return {
        ...state,
        selectedFacet: action.selectedFacet,
        isLastPage: false,
        articleList: [],
        pageCount: 1
      };
    case CLEAR_ARTICLES_LIST:
      return {
        ...state,
        articleList: [],
        pageCount: 1,
        isLastPage: false
      };
    default:
      return state;
  }
};

export default articleReducers;
