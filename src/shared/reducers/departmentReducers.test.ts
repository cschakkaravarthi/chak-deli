import departmentsReducers, { initialState } from './departmentReducers';
import { LOAD_DEPARTMENTS } from '../types/departmentTypes';
import { dummyDepartmentsArray } from '../models/Department.model';

describe('departmentsReducers', () => {
  it('Handles default case', () => {
    const state = departmentsReducers(undefined, {});
    expect(state).toEqual(initialState);
  });

  it('Handles loadDepartments action', () => {
    const action = {
      type: LOAD_DEPARTMENTS,
      departments: dummyDepartmentsArray
    };
    const state = departmentsReducers(initialState, action);
    expect(state).toMatchSnapshot();
  });
});
