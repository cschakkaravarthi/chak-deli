import { ThunkAction } from 'redux-thunk';
import { AnyAction } from 'redux';
import { SearchRequest, SearchResponseSuccess, SearchResponseError, SearchResultState, SetSelectedType, ClearSearchScrollList, SearchScrollRequest, SearchSuggestionSuccess, ClearSearchSuggestionList } from '../types/searchResultTypes';
import { ApplicationState } from '../reducers';
export declare const loadSearchResponse: (response: SearchResultState) => SearchResponseSuccess;
export declare const loadSearchError: (error: string) => SearchResponseError;
export declare const loadSearchRequest: () => SearchRequest;
export declare const loadSearchScrollRequest: () => SearchScrollRequest;
export declare const fetchSearchResults: (scroll?: boolean, page?: number | undefined, query?: string | undefined, limit?: number | undefined, type?: string | undefined, facet?: string | undefined) => ThunkAction<void, ApplicationState, undefined, AnyAction>;
export declare const loadSearchSuggestionsResponse: (response: SearchResultState) => SearchSuggestionSuccess;
export declare const fetchSearchSuggestion: (query?: string | undefined, limit?: number | undefined) => ThunkAction<void, ApplicationState, undefined, AnyAction>;
export declare const setSelectedType: (selectedType: string) => SetSelectedType;
export declare const clearSearchScrollList: () => ClearSearchScrollList;
export declare const clearSearchSuggestionList: () => ClearSearchSuggestionList;
//# sourceMappingURL=searchResultAction.d.ts.map