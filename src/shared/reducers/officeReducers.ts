import { Reducer } from 'redux';

import {
  LOAD_OFFICE_BY_ID,
  LOAD_OFFICE_BY_ID_ERROR,
  CLEAR_OFFICE_REDUCER,
  OfficeState
} from '../types/officeTypes';

export const initialState = {
  office: undefined,
  officeError: false
};

const officeReducers: Reducer<OfficeState, any> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case LOAD_OFFICE_BY_ID:
      return {
        ...state,
        office: action.office,
        officeError: false
      };
    case LOAD_OFFICE_BY_ID_ERROR:
      return {
        ...state,
        officeError: true
      };
    case CLEAR_OFFICE_REDUCER:
      return {
        ...state,
        office: initialState.office
      };
    default:
      return state;
  }
};

export default officeReducers;
