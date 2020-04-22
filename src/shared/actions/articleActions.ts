import { LoadArticlesAction, LOAD_ARTICLES } from './../types/articleTypes';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

import {
  LOAD_ARTICLE_BY_ID,
  FETCH_MORE_ARTICLES,
  LoadMoreArticlesAction,
  SET_ARTICLE_FILTER_FACET,
  SetFilterFacetAction,
  LoadArticleByIdAction,
  ClearArticlesListAction,
  CLEAR_ARTICLES_LIST,
  LIKE_ARTICLE_TOGGLE
} from '../types/articleTypes';

import Article from '../models/Article.model';
import { ContentWithFacet } from '../types/contentWithFacets';
import { ApplicationState } from '../reducers';
import { FacetProperty } from '../../shared/models/Facet.model';

import ApiService from '../services/apiService';
import { eventGA } from '../../utils/googleAnalytics';

const DEFAULT_FACET = '0';

type ThunkResult<R> = ThunkAction<R, ApplicationState, undefined, AnyAction>;

export const loadMoreArticles = (
  response: ContentWithFacet
): LoadMoreArticlesAction => ({
  articleList: response.articleList,
  facets: response.facets,
  type: FETCH_MORE_ARTICLES
});

export const fetchArticles = (
  limit?: number,
  sort?: string,
  facet?: string
): ThunkResult<void> => {
  return async (
    dispatch: ThunkDispatch<{}, {}, AnyAction>,
    getState: () => ApplicationState
  ): Promise<void> => {
    const {
      articleReducers: { selectedFacet, pageCount }
    } = getState();

    const articleCategory =
      selectedFacet !== DEFAULT_FACET ? selectedFacet : undefined;

    dispatch(() => ({ type: FETCH_MORE_ARTICLES }));

    return ApiService.getArticles(
      res => dispatch(loadMoreArticles(res)),
      pageCount,
      limit,
      sort,
      facet,
      articleCategory
    );
  };
};

export const loadArticles = (articleList: Article[]): LoadArticlesAction => ({
  articleList,
  type: LOAD_ARTICLES
});

export const fetchHomeArticles = (
  limit = '0',
  sort = 'latest',
  owner = ''
): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    dispatch(() => ({ type: LOAD_ARTICLES }));
    return ApiService.getHomeArticles(
      ({ articleList }) => dispatch(loadArticles(articleList)),
      limit,
      sort,
      owner
    );
  };
};

export const setFilterFacet = (
  selectedFacet: FacetProperty
): SetFilterFacetAction => ({
  selectedFacet,
  type: SET_ARTICLE_FILTER_FACET
});

export const loadArticleById = (article: Article): LoadArticleByIdAction => ({
  article,
  type: LOAD_ARTICLE_BY_ID
});

export const fetchArticleById = (
  id: string
): ThunkAction<Promise<void>, {}, {}, AnyAction> => async (
  dispatch: ThunkDispatch<{}, {}, AnyAction>
): Promise<void> => {
  dispatch(() => ({ type: LOAD_ARTICLE_BY_ID }));
  return ApiService.getArticleById(
    article => dispatch(loadArticleById(article[0])),
    id
  );
};

export const clearArticlesList = (): ClearArticlesListAction => ({
  type: CLEAR_ARTICLES_LIST
});

export const likeArticleToggle = (
  contentId: number,
  likedByUser: boolean
): ThunkResult<void> => {
  return async (
    dispatch: ThunkDispatch<{}, {}, AnyAction>,
    getState: () => ApplicationState
  ): Promise<void> => {
    dispatch(() => ({ type: LIKE_ARTICLE_TOGGLE }));

    const {
      articleReducers: { articleList }
    } = getState();

    const sucessCallBack = (): void => {
      const articles = articleList.map(article => {
        if (article.drupal_id === contentId) {
          const likes = article.likesCount || 0;
          const isLikeText = likedByUser ? 'Like' : 'Dislike';
          eventGA({
            category: 'Article & News',
            action: `${isLikeText} the Article & News`
          });
          return { ...article, likedByUser, likesCount: likedByUser ? likes + 1 : likes - 1 };
        } else {
          return article;
        }
      });
      dispatch(loadArticles(articles));
    };

    return ApiService.toggleContentLike(
      sucessCallBack,
      'article',
      contentId,
      likedByUser
    );
  };
};
