import { Reducer } from 'redux';
import {
  LOAD_TODOS,
  SET_TODO,
  DELETE_TODO,
  TodoState
} from '../types/todoTypes';

export const initialState = {
  todos: [],
  success: true
};

const todoReducers: Reducer<TodoState, any> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case LOAD_TODOS:
      return {
        ...state,
        todos: action.todos
      };
    case SET_TODO:
      return state;
    case DELETE_TODO:
      return state;
    default:
      return state;
  }
};

export default todoReducers;
