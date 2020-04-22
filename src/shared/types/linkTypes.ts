import { ContentGroupedCategorizedStorageModel, VariousContentGroupModel, VariousContentModel } from './contentTypes';
import Link, { LinkGroupItems } from './../models/Link.model';

export const LOAD_LINKS = 'LOAD_LINKS';
export const FETCH_LINKS = 'FETCH_LINKS';
export const FETCH_MINISITE_LINKS = 'FETCH_MINISITE_LINKS';
export const LOAD_USER_LINKS = 'LOAD_USER_LINKS';
export const FETCH_USER_LINKS = 'FETCH_USER_LINKS';
export const SET_USER_LINKS = 'SET_USER_LINKS';
export const SAVE_USER_LINKS = 'SAVE_USER_LINKS';
export const LOAD_MINISITE_LINKS = 'LOAD_MINISITE_LINKS';
export const FETCH_QUICK_TOOLS = 'FETCH_QUICK_TOOLS';
export const LOAD_QUICK_TOOLS = 'LOAD_QUICK_TOOLS';

export const FETCH_FACILITIES = 'FETCH_FACILITIES';
export const LOAD_FACILITIES = 'LOAD_FACILITIES';
export const FACILITIES_ERROR = 'FACILITIES_ERROR';
export const CLEAR_FACILITILES = 'CLEAR_FACILITILES';

export interface ClearLinksAction {
  type: typeof CLEAR_FACILITILES;
}

export interface LinkState {
  links: Link[];
  quickTools: VariousContentModel[];
  facilities: Link[];
  facilitiesError: boolean;
  groups: LinkGroupItems[];
  minisiteLinks: ContentGroupedCategorizedStorageModel;
}

export interface LoadFacilitiesError {
  type: typeof FACILITIES_ERROR;
  facilitiesError?: boolean;
}

export interface LoadFacilitiesAction {
  type: typeof LOAD_FACILITIES;
  facilities: Link[];
}

export interface LoadLinksAction {
  type: typeof LOAD_LINKS;
  groups: LinkGroupItems[];
}

export interface LoadUserLinksAction {
  type: typeof LOAD_USER_LINKS;
  links: Link[];
}

export interface LoadMinisiteLinksAction {
  type: typeof LOAD_MINISITE_LINKS;
  minisiteLinks: VariousContentGroupModel[];
  cat: string;
}

export interface SetUserLinksAction {
  type: typeof SET_USER_LINKS;
  success: boolean;
}

export interface LoadQuickToolsAction {
  type: typeof LOAD_QUICK_TOOLS;
  quickTools: VariousContentModel[];
}
