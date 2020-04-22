import { Reducer } from 'redux';
import {
  EmployeeState,
  LOAD_EMPLOYEE_SERVICES
} from '../types/employeeTypes';

export const initialState = {
  employees: []
};

const employeeReducers: Reducer<EmployeeState, any> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case LOAD_EMPLOYEE_SERVICES: {
      return {
        ...state,
        employees: action.employees
      };
    }
    default:
      return state;
  }
};

export default employeeReducers;
