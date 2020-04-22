import {
  FETCH_BOOKMARKS,
  LOAD_BOOKMARKS,
  SAVE_BOOKMARK,
  SET_BOOKMARK,
  REMOVE_BOOKMARK,
  DELETE_BOOKMARK,
  LoadBookmarksAction,
  SetBookmarkAction,
  DeleteBookmarkAction
} from '../types/bookmarkTypes';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import Bookmark from '../../shared/models/Bookmark.model';
import ApiService from '../services/apiService';
import { eventGA } from '../../utils/googleAnalytics';
import { triggerToast } from './commonActions';

export const loadBookmarks = (bookmarks: Bookmark[]): LoadBookmarksAction => ({
  bookmarks,
  type: LOAD_BOOKMARKS
});

export const fetchBookmarks = () => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    dispatch(() => ({ type: FETCH_BOOKMARKS }));
    return ApiService.getBookmarks(
      bookmarks => dispatch(loadBookmarks(bookmarks)),
      error => {
        if (error) {
          return dispatch(triggerToast('Bookmarks are not loading. Try again later!', true));
        }
      }
    );
  };
};

export const setBookmark = (success: boolean): SetBookmarkAction => ({
  success,
  type: SET_BOOKMARK
});

export const saveBookmark = (title: string, url: string) => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    dispatch(() => ({ type: SAVE_BOOKMARK }));
    return ApiService.setBookmark(
      success => {
        eventGA({
          category: 'Bookmarks',
          action: `Add the Bookmark title : ${title} and Url : ${url}`
        });
        dispatch(setBookmark(success));
      },
      title,
      url
    );
  };
};

export const deleteBookmark = (success: boolean): DeleteBookmarkAction => ({
  success,
  type: DELETE_BOOKMARK
});

export const removeBookmark = (identifier: string) => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    dispatch(() => ({ type: REMOVE_BOOKMARK }));
    return ApiService.deleteBookmark(success => dispatch(deleteBookmark(success)), identifier);
  };
};
