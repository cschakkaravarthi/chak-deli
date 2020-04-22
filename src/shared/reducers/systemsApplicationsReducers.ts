import { Reducer } from 'redux';
import {
  FETCH_SYSTEMS_APPLICATIONS,
  LOAD_SYSTEMS_APPLICATIONS,
  SystemsApplicationsState
} from '../types/systemsApplicationsTypes';

export const initialState = {
  applications: [],
  success: false,
  isFetching: true
};

const systemsApplicationsReducers: Reducer<SystemsApplicationsState, any> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case FETCH_SYSTEMS_APPLICATIONS:
      return {
        ...state,
        isFetching: action.isFetching,
        applications: action.applications
      };
    case LOAD_SYSTEMS_APPLICATIONS:
      return {
        ...state,
        applications: action.applications,
        isFetching: action.isFetching
      };
    default:
      return state;
  }
};

export default systemsApplicationsReducers;
