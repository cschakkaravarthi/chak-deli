import Article from '../models/Article.model';
import Event from '../models/Event.model';
import People from '../models/People.model';
import { Department } from '../models/Department.model';
import Link from '../models/Link.model';
import { PageSearch } from '../models/Page.model';
import { OfficeSearch } from '../models/Office.model';
import { DocumentSearch } from '../models/Document.model';
import { KnowledgeSearch } from '../models/KnowledgeBase.model';
import { CatalogSearch } from '../models/Catalog.model';

export const SEARCH_REQUEST = 'SEARCH_REQUEST';
export const SEARCH_RESPONSE_ERROR = 'SEARCH_RESPONSE_ERROR';
export const SEARCH_RESPONSE_SUCCESS = 'SEARCH_RESPONSE_SUCCESS';
export const SET_SELECTED_TYPE = 'SET_SELECTED_TYPE';
export const CLEAR_SEARCH_SCROLL_LIST = 'CLEAR_SEARCH_SCROLL_LIST';
export const SEARCH_SCROLL_REQUEST = 'SEARCH_SCROLL_REQUEST';
export const SEARCH_SCROLL_SUCCESS = 'SEARCH_SCROLL_SUCCESS';
export const SEARCH_SUGGESTION_SUCCESS = 'SEARCH_SUGGESTION_SUCCESS';
export const CLEAR_SEARCH_SUGGESTION_LIST = 'CLEAR_SEARCH_SUGGESTION_LIST';
export const CLEAR_SEARCH_RESULTS = 'CLEAR_SEARCH_RESULTS';

export interface SearchSuggest {
  value: string;
  label: string;
}

export interface SearchResultState {
  articles?: Article[];
  events?: Event[];
  people?: People[];
  departments?: Department[];
  links?: Link[];
  pages?: PageSearch[];
  office?: OfficeSearch[];
  documents?: DocumentSearch[];
  knowledgeBase?: KnowledgeSearch[];
  catalog?: CatalogSearch[];
  articlesCount?: number;
  eventsCount?: number;
  peopleCount?: number;
  linksCount?: number;
  departmentsCount?: number;
  pagesCount?: number;
  officeCount?: number;
  documentsCount?: number;
  knowledgeBaseCount?: number;
  catalogCount?: number;
  totalCount?: number;
  isFetch?: boolean;
  selectedType?: string;
  selectedFacet?: string;
  isLastPage?: boolean;
  pageCount?: number;
  searchSuggestions?: SearchSuggest[];
  spellingSuggestion?: string;
}

export interface SearchRequest {
  type: typeof SEARCH_REQUEST;
  articles?: Article[];
  events?: Event[];
  people?: People[];
  departments?: Department[];
  links?: Link[];
  pages?: PageSearch[];
  office?: OfficeSearch[];
  documents?: DocumentSearch[];
  knowledgeBase?: KnowledgeSearch[];
  catalog?: CatalogSearch[];
  isFetch?: boolean;
}

export interface SearchResponseError {
  type: typeof SEARCH_RESPONSE_ERROR;
  articles?: Article[];
  events?: Event[];
  people?: People[];
  departments?: Department[];
  links?: Link[];
  pages?: PageSearch[];
  office?: OfficeSearch[];
  documents?: DocumentSearch[];
  knowledgeBase?: KnowledgeSearch[];
  catalog?: CatalogSearch[];
  isFetch?: boolean;
}

export interface SearchResponseSuccess {
  type: typeof SEARCH_RESPONSE_SUCCESS;
  articles?: Article[];
  events?: Event[];
  people?: People[];
  departments?: Department[];
  links?: Link[];
  pages?: PageSearch[];
  office?: OfficeSearch[];
  documents?: DocumentSearch[];
  knowledgeBase?: KnowledgeSearch[];
  catalog?: CatalogSearch[];
  isFetch?: boolean;
  articlesCount?: number;
  eventsCount?: number;
  peopleCount?: number;
  linksCount?: number;
  departmentsCount?: number;
  pagesCount?: number;
  officeCount?: number;
  documentsCount?: number;
  knowledgeBaseCount?: number;
  catalogCount?: number;
  totalCount?: number;
  spellingSuggestion?: string;
}

export interface SetSelectedType {
  type: typeof SET_SELECTED_TYPE;
  selectedType?: string;
}

export interface SearchScrollRequest {
  type: typeof SEARCH_SCROLL_REQUEST;
  articles?: Article[];
  events?: Event[];
  people?: People[];
  departments?: Department[];
  links?: Link[];
  pages?: PageSearch[];
  office?: OfficeSearch[];
  documents?: DocumentSearch[];
  knowledgeBase?: KnowledgeSearch[];
  catalog?: CatalogSearch[];
  isFetch?: boolean;
}

export interface SearchScrollSuccess {
  type: typeof SEARCH_SCROLL_SUCCESS;
  articles?: Article[];
  events?: Event[];
  people?: People[];
  departments?: Department[];
  links?: Link[];
  pages?: PageSearch[];
  office?: OfficeSearch[];
  documents?: DocumentSearch[];
  knowledgeBase?: KnowledgeSearch[];
  catalog?: CatalogSearch[];
  isFetch?: boolean;
  articlesCount?: number;
  eventsCount?: number;
  peopleCount?: number;
  linkCount?: number;
  departmentCount?: number;
  pagesCount?: number;
  officeCount?: number;
  documentsCount?: number;
  knowledgebaseCount?: number;
  catalogCount?: number;
  totalCount?: number;
  spellingSuggestion?: string;
}

export interface ClearSearchScrollList {
  type: typeof CLEAR_SEARCH_SCROLL_LIST;
}

export interface ClearSearchSuggestionList {
  type: typeof CLEAR_SEARCH_SUGGESTION_LIST;
}

export interface SearchSuggestionSuccess {
  type: typeof SEARCH_SUGGESTION_SUCCESS;
  searchSuggestions?: object[];
}

export interface ClearSearchResults {
  type: typeof CLEAR_SEARCH_RESULTS;
}
