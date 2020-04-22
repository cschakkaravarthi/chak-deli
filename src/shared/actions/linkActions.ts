import {
  FACILITIES_ERROR,
  FETCH_FACILITIES,
  FETCH_LINKS,
  FETCH_MINISITE_LINKS,
  FETCH_QUICK_TOOLS,
  FETCH_USER_LINKS,
  LOAD_FACILITIES,
  LOAD_LINKS,
  LOAD_MINISITE_LINKS,
  LOAD_QUICK_TOOLS,
  LOAD_USER_LINKS,
  LoadFacilitiesAction,
  LoadFacilitiesError,
  LoadLinksAction,
  LoadMinisiteLinksAction,
  LoadQuickToolsAction,
  LoadUserLinksAction,
  SAVE_USER_LINKS,
  SET_USER_LINKS,
  ClearLinksAction,
  CLEAR_FACILITILES,
  SetUserLinksAction
} from '../types/linkTypes';
import { LinkGroupItems } from '../models/Link.model';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import Link from '../../shared/models/Link.model';

import ApiService from '../services/apiService';
import { VariousContentGroupModel, FacetedContentModel } from '../types/contentTypes';
import { eventGA } from '../../utils/googleAnalytics';
import { ApiErrorModel } from '../models/Error.model';

export const clearLinksAction = (): ClearLinksAction => ({
  type: CLEAR_FACILITILES
});

export const loadFacilities = (facilities: Link[]): LoadFacilitiesAction => ({
  facilities,
  type: LOAD_FACILITIES
});

export const loadFacilitiesError = (error: ApiErrorModel): LoadFacilitiesError => {
  let facilitiesError;

  if (error) {
    facilitiesError = true;
  }

  return {
    type: FACILITIES_ERROR,
    facilitiesError
  };
};

export const fetchFacilities = (categoryId?: string) => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    dispatch(() => ({ type: FETCH_FACILITIES }));
    return ApiService.getFacilities(
      facilities => dispatch(loadFacilities(facilities)),
      error => dispatch(loadFacilitiesError(error)),
      categoryId
    );
  };
};

export const loadLinks = (groups: LinkGroupItems[]): LoadLinksAction => ({
  groups,
  type: LOAD_LINKS
});

export const fetchLinks = () => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    dispatch(() => ({ type: FETCH_LINKS }));
    return ApiService.getMenuLinks(groups => dispatch(loadLinks(groups)));
  };
};

export const loadUserLinks = (links: Link[]): LoadUserLinksAction => ({
  links,
  type: LOAD_USER_LINKS
});

export const fetchUserLinks = () => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    dispatch(() => ({ type: FETCH_USER_LINKS }));
    return ApiService.getUserLinks(links => dispatch(loadUserLinks(links)));
  };
};

export const setUserLinks = (success: boolean): SetUserLinksAction => ({
  success,
  type: SET_USER_LINKS
});

export const saveUserLinks = (links: string[]) => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    dispatch(() => ({ type: SAVE_USER_LINKS }));
    return ApiService.setUserLinks(
      success => {
        eventGA({
          category: 'Add to My Links',
          action: 'Added the User Links'
        });
        dispatch(setUserLinks(success));
      },
      links
    );
  };
};

export const loadMinisiteLinks = (
  minisiteLinks: VariousContentGroupModel[],
  cat: string
): LoadMinisiteLinksAction => ({
  minisiteLinks,
  cat,
  type: LOAD_MINISITE_LINKS
});

export const fetchMinisiteLinks = (cat: string) => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    dispatch(() => ({ type: FETCH_MINISITE_LINKS }));
    return ApiService.getMinisiteLinks(
      minisiteLinks => dispatch(loadMinisiteLinks(minisiteLinks, cat)),
      cat
    );
  };
};

export const loadQuickTools = (quickTools: FacetedContentModel): LoadQuickToolsAction => ({
  quickTools: quickTools.content,
  type: LOAD_QUICK_TOOLS
});

export const fetchQuickTools = (): ThunkAction<
  Promise<void>,
  {},
  {},
  AnyAction
> => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    dispatch(() => ({ type: FETCH_QUICK_TOOLS }));
    return ApiService.getQuickTools(quickTools =>
      dispatch(loadQuickTools(quickTools))
    );
  };
};
