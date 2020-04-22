import { Reducer } from 'redux';
import {
  LOAD_BOOKMARKS,
  SET_BOOKMARK,
  DELETE_BOOKMARK,
  BookmarkState
} from '../types/bookmarkTypes';

export const initialState = {
  bookmarks: [],
  success: true
};

const bookmarkReducers: Reducer<BookmarkState, any> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case LOAD_BOOKMARKS:
      return {
        ...state,
        bookmarks: action.bookmarks
      };
    case SET_BOOKMARK:
      return state;
    case DELETE_BOOKMARK:
      return state;
    default:
      return state;
  }
};

export default bookmarkReducers;
