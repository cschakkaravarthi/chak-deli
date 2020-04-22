import Bookmark from '../models/Bookmark.model';

export const LOAD_BOOKMARKS = 'LOAD_BOOKMARKS';
export const FETCH_BOOKMARKS = 'FETCH_BOOKMARKS';
export const SET_BOOKMARK = 'SET_BOOKMARK';
export const SAVE_BOOKMARK = 'SAVE_BOOKMARK';
export const DELETE_BOOKMARK = 'DELETE_BOOKMARK';
export const REMOVE_BOOKMARK = 'REMOVE_BOOKMARK';

export interface LoadBookmarksAction {
  type: typeof LOAD_BOOKMARKS;
  bookmarks: Bookmark[];
}

export interface SetBookmarkAction {
  type: typeof SET_BOOKMARK;
  success: boolean;
}

export interface DeleteBookmarkAction {
  type: typeof DELETE_BOOKMARK;
  success: boolean;
}

export interface BookmarkState {
  bookmarks: Bookmark[];
  success: boolean;
}
