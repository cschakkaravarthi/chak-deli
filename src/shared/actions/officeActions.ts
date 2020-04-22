import { ThunkDispatch } from 'redux-thunk';

import { AnyAction } from 'redux';

import {
  FETCH_OFFICE_BY_ID,
  LOAD_OFFICE_BY_ID,
  LOAD_OFFICE_BY_ID_ERROR,
  LoadOfficeAction,
  ClearOfficeAction,
  OfficeError,
  CLEAR_OFFICE_REDUCER
} from '../types/officeTypes';

import { Office } from '../models/Office.model';

import ApiService from '../services/apiService';

export const clearOfficeAction = (): ClearOfficeAction => ({
  type: CLEAR_OFFICE_REDUCER
});

export const loadOfficeAction = (office: Office): LoadOfficeAction => ({
  office,
  type: LOAD_OFFICE_BY_ID
});

export const loadOfficeError = (error: object): OfficeError => {
  let officeError;

  if (error) {
    officeError = true;
  }

  return {
    type: LOAD_OFFICE_BY_ID_ERROR,
    officeError
  };
};

export const fetchOffice = (officeId: string) => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    dispatch(() => ({ type: FETCH_OFFICE_BY_ID }));
    return ApiService.getOffice(
      office => dispatch(loadOfficeAction(office)),
      error => dispatch(loadOfficeError(error)),
      officeId
    );
  };
};
