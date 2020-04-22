import { Reducer } from 'redux';
import {
  LOAD_DEPARTMENT_BY_ID,
  LOAD_DEPARTMENTS,
  DepartmentsState
} from '../types/departmentTypes';

export const initialState: DepartmentsState = {
  departments: {
    content: [],
    totalRecords: 0
  }
};

const departmentReducers: Reducer<DepartmentsState, any> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case LOAD_DEPARTMENT_BY_ID:
      return {
        ...state,
        departments: {
          ...state.departments,
          content: [
            ...state.departments.content.filter(d => d.drupal_id !== action.department.drupal_id),
            action.department
          ]
        }
      };
    case LOAD_DEPARTMENTS: {
      return {
        ...state,
        departments: action.departments
      };
    }
    default:
      return state;
  }
};

export default departmentReducers;
