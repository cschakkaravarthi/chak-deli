import { Reducer } from 'redux';
import { LOAD_PAGES, LOAD_PAGE_BY_ID, PageState } from '../types/pageTypes';

export const initialState = {
  pages: []
};

const pageReducers: Reducer<PageState, any> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case LOAD_PAGES:
      return {
        ...state,
        pages: action.pages
      };
    case LOAD_PAGE_BY_ID:
      return {
        ...state,
        pages: [
          ...state.pages.filter(d => d.drupal_id !== action.page.drupal_id),
          action.page
        ]
      };
    default:
      return state;
  }
};

export default pageReducers;
