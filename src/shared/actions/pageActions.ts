import {
  FETCH_PAGE_BY_ID, FETCH_PAGES, LOAD_PAGE_BY_ID, LOAD_PAGES, LoadPageByIdAction, LoadPagesAction
} from '../types/pageTypes';
import { Page } from '../models/Page.model';
import ApiService from '../services/apiService';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

export const loadPageById = (page: Page): LoadPageByIdAction => ({
  page, type: LOAD_PAGE_BY_ID
});

export const fetchPageById = (pageId: number) => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    dispatch(() => ({ type: FETCH_PAGE_BY_ID }));
    return ApiService.getPage(page => dispatch(loadPageById(page)), pageId);
  };
};

export const loadPages = (pages: Page[]): LoadPagesAction => ({
  pages, type: LOAD_PAGES
});

export const fetchPages = (categoryId: (string | null) = null) => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    dispatch(() => ({ type: FETCH_PAGES }));
    return ApiService.getPages(pages => dispatch(loadPages(pages)), categoryId);
  };
};
