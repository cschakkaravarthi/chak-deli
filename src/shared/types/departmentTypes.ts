import { Department } from '../models/Department.model';
import { FacetedContentModel } from './contentTypes';

export const LOAD_DEPARTMENT_BY_ID = 'LOAD_DEPARTMENT_BY_ID';
export const FETCH_DEPARTMENT_BY_ID = 'FETCH_DEPARTMENT_BY_ID';
export const LOAD_DEPARTMENTS = 'LOAD_DEPARTMENTS';
export const FETCH_DEPARTMENTS = 'FETCH_DEPARTMENTS';
export const FETCH_CONTACTS = 'FETCH_CONTACTS';

export interface DepartmentsState {
  departments: FacetedContentModel;
}

export interface LoadDepartmentByIdAction {
  type: typeof LOAD_DEPARTMENT_BY_ID;
  department: Department;
}

export interface LoadDepartmentsAction {
  type: typeof LOAD_DEPARTMENTS;
  departments: Department[];
}
