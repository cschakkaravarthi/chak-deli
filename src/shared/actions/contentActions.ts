import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import ApiService from '../services/apiService';
import { findContentInState, toQueryString } from '../../utils/content';
import get from 'lodash.get';
import {
  ContentQueryParamsType,
  FacetedContentGroupModel,
  FacetedContentModel,
  FETCH_CONTENT,
  FETCH_GROUPED_CONTENT,
  LOAD_CONTENT,
  LOAD_GROUPED_CONTENT,
  LoadContentAction,
  LoadGroupedContentAction,
  REPLACE_INDIVIDUAL_CONTENT,
  ReplaceIndividualContentAction,
  VariousContentModel
} from '../types/contentTypes';
import { LIKE_ARTICLE_TOGGLE } from '../types/articleTypes';
import { eventGA } from '../../utils/googleAnalytics';
import { ApplicationState } from '../reducers/index';

export const loadGroupedContent = (
  content: FacetedContentGroupModel,
  params: ContentQueryParamsType
): LoadGroupedContentAction => ({
  content,
  key: toQueryString(params),
  type: LOAD_GROUPED_CONTENT
});

export const loadContent = (
  content: FacetedContentModel,
  params: ContentQueryParamsType
): LoadContentAction => ({
  content,
  key: toQueryString(params),
  type: LOAD_CONTENT
});

export const replaceIndividualContent = (
  content: VariousContentModel
): ReplaceIndividualContentAction => ({
  content,
  type: REPLACE_INDIVIDUAL_CONTENT
});

export type ThunkDispatchType = (dispatch: ThunkDispatch<{}, {}, AnyAction>) => Promise<void>;
export type ThunkDispatchTypeWithState = (dispatch: ThunkDispatch<{}, {}, AnyAction>, getState: () => ApplicationState) => Promise<void>;

// @TODO: Why do fetchContentType and fetchContentTypeThunk have to be different?
// @TODO: Research the best way to handle thunk + typescript.
export type fetchContentType = (
  params: ContentQueryParamsType,
  limit?: number,
  offset?: number,
  callback?: () => void
) => Promise<void>;

type fetchContentTypeThunk = (
  params: ContentQueryParamsType,
  limit?: number,
  offset?: number,
  callback?: () => void
) => ThunkDispatchType;

export const fetchContent: fetchContentTypeThunk = (params, limit, offset, callback) => {
  return async (dispatch) => {
    dispatch(() => ({ type: FETCH_CONTENT }));
    return ApiService.getContent(
      content => dispatch(loadContent(content, params)),
      params,
      limit,
      offset
    ).then((p) => {
      if (callback) {
        callback();
      }
      return (p);
    });
  };
};

export type fetchGroupedContentType = (
  params: ContentQueryParamsType,
  limit?: number,
  offset?: number,
  callback?: () => void
) => Promise<void>;

type fetchGroupedContentTypeThunk = (
  params: ContentQueryParamsType,
  limit?: number,
  offset?: number,
  callback?: () => void
) => ThunkDispatchType;

export const fetchGroupedContent: fetchGroupedContentTypeThunk = (params, limit, offset, callback) => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    dispatch(() => ({ type: FETCH_GROUPED_CONTENT }));
    return ApiService.getGroupedContent(
      content => dispatch(loadGroupedContent(content, params)),
      params,
      limit,
      offset
    ).then((p) => {
      if (callback) {
        callback();
      }
      return (p);
    });
  };
};

export type likeContentToggleType = (
  contentId: number,
  likedByUser: boolean
) => Promise<void>;

type likeContentToggleTypeThunk = (
  contentId: number,
  likedByUser: boolean
) => ThunkDispatchTypeWithState;

export const likeContentToggle: likeContentToggleTypeThunk = (contentId, likedByUser) => {
  return async (
    dispatch: ThunkDispatch<{}, {}, AnyAction>,
    getState: () => ApplicationState
  ): Promise<void> => {
    dispatch(() => ({ type: LIKE_ARTICLE_TOGGLE }));

    const successCallBack = (): void => {
      // If we successfully liked the article, let's do a quick replace in redux, so we don't have to fetch again from
      // API. It's important for the user to get visual feedback as soon as possible.
      const matches: VariousContentModel[] = findContentInState(getState().contentReducers, [contentId]);
      const match = matches.pop();
      if (!match) {
        return;
      }
      const likes = get(match, 'likesCount', 0);
      const isLikeText = likedByUser ? 'Like' : 'Dislike';
      eventGA({
        category: 'Article & News',
        action: `${isLikeText} the Article & News, Drupal ID : ${contentId}`
      });
      const newContent = { ...match, likedByUser, likesCount: likedByUser ? likes + 1 : likes - 1 };

      dispatch(replaceIndividualContent(newContent));
    };

    return ApiService.toggleContentLike(
      successCallBack,
      'article',
      contentId,
      likedByUser
    );
  };
};
