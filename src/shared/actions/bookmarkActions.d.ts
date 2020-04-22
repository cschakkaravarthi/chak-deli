import { LoadBookmarksAction, SetBookmarkAction, DeleteBookmarkAction } from '../types/bookmarkTypes';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import Bookmark from '../../shared/models/Bookmark.model';
export declare const loadBookmarks: (bookmarks: Bookmark[]) => LoadBookmarksAction;
export declare const fetchBookmarks: () => (dispatch: ThunkDispatch<{}, {}, AnyAction>) => Promise<void>;
export declare const setBookmark: (success: boolean) => SetBookmarkAction;
export declare const saveBookmark: (title: string, url: string) => (dispatch: ThunkDispatch<{}, {}, AnyAction>) => Promise<void>;
export declare const deleteBookmark: (success: boolean) => DeleteBookmarkAction;
export declare const removeBookmark: (identifier: string) => (dispatch: ThunkDispatch<{}, {}, AnyAction>) => Promise<void>;
//# sourceMappingURL=bookmarkActions.d.ts.map