import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

import {
  LoadOfficesPeopleAction,
  LOAD_OFFICES_PEOPLE,
  FETCH_OFFICES_PEOPLE,
  FILTER_OFFICES_PEOPLE
} from '../types/officesPeopleType';

import ApiService from '../services/apiService';
import OfficesPeople from '../models/OfficesPeople.model';

export const loadOfficesPeople = (
  officesPeople: OfficesPeople[]
): LoadOfficesPeopleAction => ({
  officesPeople,
  type: LOAD_OFFICES_PEOPLE
});

export const fetchOfficesPeople = () => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    dispatch(() => ({ type: FETCH_OFFICES_PEOPLE }));
    return ApiService.getOfficesPeople(officesPeople =>
      dispatch(loadOfficesPeople(officesPeople))
    );
  };
};

export const filterOfficesPeople = (filterId: string) => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>): void => {
    dispatch({
      type: FILTER_OFFICES_PEOPLE,
      filterId
    });
  };
};
