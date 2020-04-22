import { VariousContentModel } from './contentTypes';

export const LOAD_EMPLOYEE_SERVICES = 'LOAD_EMPLOYEE_SERVICES';
export const FETCH_EMPLOYEE_SERVICES = 'FETCH_EMPLOYEE_SERVICES';

export interface EmployeeState {
  employees: VariousContentModel[];
}

export interface LoadEmployeeAction {
  type: typeof LOAD_EMPLOYEE_SERVICES;
  employees: VariousContentModel[];
}
