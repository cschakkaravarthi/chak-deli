import employeeReducers, { initialState } from './employeeReducers';
import { LOAD_EMPLOYEE_SERVICES } from '../types/employeeTypes';
import { dummyVariousContent } from '../types/contentTypes';

describe('employeeReducers', () => {
  it('Handles default case', () => {
    const state = employeeReducers(undefined, {});
    expect(state).toEqual(initialState);
  });

  it('Handles loadEmployeeServices action', () => {
    const action = { type: LOAD_EMPLOYEE_SERVICES, employees: dummyVariousContent };
    const state = employeeReducers(undefined, action);
    expect(state).toMatchSnapshot();
  });
});
