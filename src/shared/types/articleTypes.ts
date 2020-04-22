import Article from '../models/Article.model';
import Facet, { FacetProperty } from '../models/Facet.model';
import { VariousContentModel } from './contentTypes';

export const LOAD_ARTICLES = 'LOAD_ARTICLES';
export const LOAD_ARTICLE_BY_ID = 'LOAD_ARTICLE_BY_ID';
export const FETCH_MORE_ARTICLES = 'LOAD_MORE_ARTICLES';
export const SET_ARTICLE_FILTER_FACET = 'SET_ARTICLE_FILTER_FACET';
export const CLEAR_ARTICLES_LIST = 'CLEAR_ARTICLES_LIST';
export const LIKE_ARTICLE_TOGGLE = 'LIKE_ARTICLE_TOGGLE';

export interface ArticleState {
  article?: Article;
  isLastPage: boolean;
  articleList: Article[];
  facets: Facet;
  selectedFacet: string;
  pageCount: number;
}

export interface LoadArticlesAction {
  type: typeof LOAD_ARTICLES;
  articleList: Article[];
}

export interface LoadArticleByIdAction {
  type: typeof LOAD_ARTICLE_BY_ID;
  article: VariousContentModel;
}
export interface LoadMoreArticlesAction {
  type: typeof FETCH_MORE_ARTICLES;
  articleList?: Article[];
  facets?: Facet;
}
export interface SetFilterFacetAction {
  type: typeof SET_ARTICLE_FILTER_FACET;
  selectedFacet: FacetProperty;
}

export interface ClearArticlesListAction {
  type: typeof CLEAR_ARTICLES_LIST;
}

export interface LikeArticleToggleAction {
  type: typeof LIKE_ARTICLE_TOGGLE;
  articleId: number;
  likedByUser: boolean;
}
