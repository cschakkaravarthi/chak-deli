import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import {
  SEARCH_REQUEST,
  SEARCH_RESPONSE_SUCCESS,
  SEARCH_RESPONSE_ERROR,
  SET_SELECTED_TYPE,
  CLEAR_SEARCH_SCROLL_LIST,
  SEARCH_SCROLL_REQUEST,
  SEARCH_SUGGESTION_SUCCESS,
  CLEAR_SEARCH_SUGGESTION_LIST,
  SearchRequest,
  SearchResponseSuccess,
  SearchResponseError,
  SearchResultState,
  SetSelectedType,
  ClearSearchScrollList,
  SearchScrollRequest,
  SearchSuggestionSuccess,
  ClearSearchSuggestionList,
  ClearSearchResults,
  CLEAR_SEARCH_RESULTS
} from '../types/searchResultTypes';
import ApiService from '../services/apiService';
import { ApplicationState } from '../reducers';
import { eventGA } from '../../utils/googleAnalytics';

type ThunkResult<R> = ThunkAction<R, ApplicationState, undefined, AnyAction>;

export const loadSearchResponse = (
  response: SearchResultState
): SearchResponseSuccess => {
  return ({
    articles: response.articles,
    events: response.events,
    people: response.people,
    departments: response.departments,
    links: response.links,
    pages: response.pages,
    office: response.office,
    documents: response.documents,
    knowledgeBase: response.knowledgeBase,
    catalog: response.catalog,
    articlesCount: response.articlesCount,
    eventsCount: response.eventsCount,
    peopleCount: response.peopleCount,
    linksCount: response.linksCount,
    pagesCount: response.pagesCount,
    departmentsCount: response.departmentsCount,
    officeCount: response.officeCount,
    documentsCount: response.documentsCount,
    knowledgeBaseCount: response.knowledgeBaseCount,
    catalogCount: response.catalogCount,
    totalCount: response.totalCount,
    isFetch: false,
    type: SEARCH_RESPONSE_SUCCESS
  });
};

export const loadSearchError = (
  error: object
): SearchResponseError => {
  let isFetchStatus;
  if (error) {
    isFetchStatus = false;
  }
  return ({
    isFetch: isFetchStatus,
    type: SEARCH_RESPONSE_ERROR
  });
};

export const loadSearchRequest = (): SearchRequest => {
  return ({
    isFetch: true,
    type: SEARCH_REQUEST
  });
};

export const loadSearchScrollRequest = (): SearchScrollRequest => {
  return ({
    type: SEARCH_SCROLL_REQUEST
  });
};

export const fetchSearchResults = (
  scroll = false,
  page?: number,
  query?: string,
  limit?: number,
  type?: string,
  facet?: string
): ThunkResult<void> => {
  return async (
    dispatch: ThunkDispatch<{}, {}, AnyAction>
  ): Promise<void> => {
    if (scroll) {
      dispatch(loadSearchScrollRequest());
    }
    dispatch(loadSearchRequest());
    return ApiService.getSearchResults(
      res => {
        eventGA({
          category: 'Search',
          action: `Search Terms : ${query} , Total Results Count : ${res.totalCount}`
        });
        dispatch(loadSearchResponse(res));
      },
      error => dispatch(loadSearchError(error)),
      (scroll && page ? page + 1 : page),
      encodeURIComponent(query || ''),
      limit,
      type,
      facet
    );
  };
};

export const loadSearchSuggestionsResponse = (
  response: SearchResultState
): SearchSuggestionSuccess => {
  return ({
    searchSuggestions: response.searchSuggestions ? response.searchSuggestions : [],
    type: SEARCH_SUGGESTION_SUCCESS
  });
};

export const fetchSearchSuggestion = (
  query?: string,
  limit?: string,
  category?: string
): ThunkResult<void> => {
  return async (
    dispatch: ThunkDispatch<{}, {}, AnyAction>
  ): Promise<void> => {
    return ApiService.getSearchSuggestions(
      res => { dispatch(loadSearchSuggestionsResponse(res)); },
      encodeURIComponent(query || ''),
      limit,
      category
    );
  };
};

export const setSelectedType = (
  selectedType: string
): SetSelectedType => ({
  selectedType,
  type: SET_SELECTED_TYPE
});

export const clearSearchScrollList = (): ClearSearchScrollList => ({
  type: CLEAR_SEARCH_SCROLL_LIST
});

export const clearSearchSuggestionList = (): ClearSearchSuggestionList => ({
  type: CLEAR_SEARCH_SUGGESTION_LIST
});

export const clearSearchResults = (): ClearSearchResults => ({
  type: CLEAR_SEARCH_RESULTS
});
