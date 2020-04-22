import {
  FETCH_DEPARTMENT_BY_ID,
  FETCH_DEPARTMENTS,
  LOAD_DEPARTMENT_BY_ID,
  LOAD_DEPARTMENTS,
  LoadDepartmentByIdAction,
  LoadDepartmentsAction
} from '../types/departmentTypes';

import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import ApiService from '../services/apiService';
import { Department } from '../models/Department.model';

export const loadDepartmentById = (
  department: Department
): LoadDepartmentByIdAction => ({ department, type: LOAD_DEPARTMENT_BY_ID });

export const fetchDepartmentById = (departmentId: number) => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    dispatch(() => ({ type: FETCH_DEPARTMENT_BY_ID }));
    return ApiService.getDepartment(
      department => dispatch(loadDepartmentById(department)),
      departmentId
    );
  };
};

export const loadDepartments = (
  departments: Department[]
): LoadDepartmentsAction => ({ departments, type: LOAD_DEPARTMENTS });

export const fetchDepartments = () => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    dispatch(() => ({ type: FETCH_DEPARTMENTS }));
    return ApiService.getDepartments(
      departments => dispatch(loadDepartments(departments))
    );
  };
};
