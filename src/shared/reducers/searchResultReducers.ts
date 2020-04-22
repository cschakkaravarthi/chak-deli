import { Reducer } from 'redux';
import {
  CLEAR_SEARCH_SCROLL_LIST,
  CLEAR_SEARCH_SUGGESTION_LIST,
  SEARCH_REQUEST,
  SEARCH_RESPONSE_ERROR,
  SEARCH_RESPONSE_SUCCESS,
  SEARCH_SCROLL_REQUEST,
  SEARCH_SCROLL_SUCCESS,
  SEARCH_SUGGESTION_SUCCESS,
  SearchResultState,
  SET_SELECTED_TYPE,
  CLEAR_SEARCH_RESULTS
} from '../types/searchResultTypes';

export const initialState = {
  articles: [],
  events: [],
  people: [],
  departments: [],
  links: [],
  pages: [],
  office: [],
  documents: [],
  knowledgeBase: [],
  catalog: [],
  searchSuggestions: [],
  articlesCount: 0,
  eventsCount: 0,
  peopleCount: 0,
  linksCount: 0,
  departmentsCount: 0,
  pagesCount: 0,
  officeCount: 0,
  documentsCount: 0,
  knowledgeBaseCount: 0,
  catalogCount: 0,
  totalCount: 0,
  isFetch: true,
  selectedType: 'all',
  selectedFacet: 'all',
  isLastPage: false,
  pageCount: 1,
  spellingSuggestion: ''
};

const searchResultReducers: Reducer<SearchResultState, any> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case SEARCH_REQUEST:
      return {
        ...state,
        isFetch: action.isFetch
      };
    case SEARCH_RESPONSE_SUCCESS:
      return {
        ...state,
        articles: state.articles && state.articles.concat(action.articles),
        events: state.events && state.events.concat(action.events),
        people: state.people && state.people.concat(action.people),
        departments: state.departments && state.departments.concat(action.departments),
        links: state.links && state.links.concat(action.links),
        pages: state.pages && state.pages.concat(action.pages),
        office: state.office && state.office.concat(action.office),
        documents: state.documents && state.documents.concat(action.documents),
        knowledgeBase: state.knowledgeBase && state.knowledgeBase.concat(action.knowledgeBase),
        catalog: state.catalog && state.catalog.concat(action.catalog),
        articlesCount: action.articlesCount,
        eventsCount: action.eventsCount,
        peopleCount: action.peopleCount,
        linksCount: action.linksCount,
        pagesCount: action.pagesCount,
        departmentsCount: action.departmentsCount,
        officeCount: action.officeCount,
        documentsCount: action.documentsCount,
        knowledgeBaseCount: action.knowledgeBaseCount,
        catalogCount: action.catalogCount,
        isFetch: action.isFetch,
        totalCount: action.totalCount,
        isLastPage: !action.articles.length && !action.events.length && !action.people.length && !action.departments.length && !action.links.length && !action.pages.length && !action.office.length && !action.documents.length && action.knowledgeBase.length && action.catalog.length,
        spellingSuggestion: action.spellingSuggestion
      };
    case SEARCH_RESPONSE_ERROR:
      return {
        ...state,
        isFetch: action.isFetch
      };
    case SEARCH_SCROLL_REQUEST:
      return {
        ...state,
        pageCount: state.pageCount && state.pageCount + 1
      };
    case SEARCH_SCROLL_SUCCESS:
      return {
        ...state,
        articles: state.articles && state.articles.concat(action.articles),
        events: state.events && state.events.concat(action.events),
        people: state.people && state.people.concat(action.people),
        departments: state.departments && state.departments.concat(action.departments),
        links: state.links && state.links.concat(action.links),
        pages: state.pages && state.pages.concat(action.page),
        office: state.office && state.office.concat(action.office),
        documents: state.documents && state.documents.concat(action.documents),
        knowledgeBase: state.knowledgeBase && state.knowledgeBase.concat(action.knowledgeBase),
        catalog: state.catalog && state.catalog.concat(action.catalog),
        articlesCount: action.articlesCount,
        eventsCount: action.eventsCount,
        peopleCount: action.peopleCount,
        linksCount: action.linksCount,
        pagesCount: action.pagesCount,
        departmentsCount: action.departmentsCount,
        officeCount: action.officeCount,
        documentsCount: action.documentsCount,
        knowledgeBaseCount: action.knowledgeBaseCount,
        catalogCount: action.catalogCount,
        isFetch: action.isFetch,
        totalCount: action.totalCount,
        isLastPage: !action.articles.length && !action.events.length && !action.people.length && !action.departments.length && !action.links.length && !action.pages.length && !action.office.length && !action.documents.length && action.knowledgeBase.length && action.catalog.length,
        spellingSuggestion: action.spellingSuggestion
      };
    case SET_SELECTED_TYPE:
      return {
        ...state,
        selectedType: action.selectedType,
        articles: [],
        events: [],
        people: [],
        departments: [],
        links: [],
        pages: [],
        office: [],
        documents: [],
        knowledgeBase: [],
        catalog: [],
        pageCount: 1,
        isFetch: true,
        isLastPage: false,
        articlesCount: 0,
        eventsCount: 0,
        peopleCount: 0,
        departmentsCount: 0,
        linksCount: 0,
        pagesCount: 0,
        officeCount: 0,
        documentsCount: 0,
        knowledgeBaseCount: 0,
        catalogCount: 0,
        totalCount: 0
      };
    case CLEAR_SEARCH_SCROLL_LIST:
      return {
        ...state,
        articles: [],
        events: [],
        people: [],
        departments: [],
        links: [],
        pages: [],
        office: [],
        documents: [],
        knowledgeBase: [],
        catalog: [],
        pageCount: 1,
        isFetch: true,
        isLastPage: false,
        articlesCount: 0,
        eventsCount: 0,
        peopleCount: 0,
        departmentsCount: 0,
        linksCount: 0,
        pagesCount: 0,
        officeCount: 0,
        documentsCount: 0,
        knowledgeBaseCount: 0,
        catalogCount: 0,
        totalCount: 0
      };
    case SEARCH_SUGGESTION_SUCCESS:
      return {
        ...state,
        searchSuggestions: action.searchSuggestions
      };
    case CLEAR_SEARCH_SUGGESTION_LIST:
      return {
        ...state,
        searchSuggestions: []
      };
    case CLEAR_SEARCH_RESULTS:
      return {
        ...state,
        ...initialState
      };
    default:
      return state;
  }
};

export default searchResultReducers;
