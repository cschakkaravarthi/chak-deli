import Bookmark from '../models/Bookmark.model';
export declare const LOAD_BOOKMARKS = "LOAD_BOOKMARKS";
export declare const FETCH_BOOKMARKS = "FETCH_BOOKMARKS";
export declare const SET_BOOKMARK = "SET_BOOKMARK";
export declare const SAVE_BOOKMARK = "SAVE_BOOKMARK";
export declare const DELETE_BOOKMARK = "DELETE_BOOKMARK";
export declare const REMOVE_BOOKMARK = "REMOVE_BOOKMARK";
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
//# sourceMappingURL=bookmarkTypes.d.ts.map