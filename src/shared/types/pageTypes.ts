import { Page } from '../models/Page.model';

export const LOAD_PAGE_BY_ID = 'LOAD_PAGE_BY_ID';
export const FETCH_PAGE_BY_ID = 'FETCH_PAGE_BY_ID';
export const LOAD_PAGES = 'LOAD_PAGES';
export const FETCH_PAGES = 'FETCH_PAGES';

export interface PageState {
  pages: Page[];
}

export interface LoadPageByIdAction {
  type: typeof LOAD_PAGE_BY_ID;
  page: Page;
}

export interface LoadPagesAction {
  type: typeof LOAD_PAGES;
  pages: Page[];
}
