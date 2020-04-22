import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

import {
  LoadEmployeeAction,
  LOAD_EMPLOYEE_SERVICES,
  FETCH_EMPLOYEE_SERVICES
} from '../types/employeeTypes';

import ApiService from '../services/apiService';
import { FacetedContentModel } from '../types/contentTypes';

export const loadEmployees = (
  employees: FacetedContentModel
): LoadEmployeeAction => {
  return {
    employees: employees.content,
    type: LOAD_EMPLOYEE_SERVICES
  };
};

export const fetchEmployee = () => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    dispatch(() => ({ type: FETCH_EMPLOYEE_SERVICES }));
    return ApiService.getEmployeeServices(employees =>
      dispatch(loadEmployees(employees))
    );
  };
};
