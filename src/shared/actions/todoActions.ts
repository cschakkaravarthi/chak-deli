import {
  FETCH_TODOS,
  LOAD_TODOS,
  SAVE_TODO,
  SET_TODO,
  REMOVE_TODO,
  DELETE_TODO,
  LoadTodosAction,
  SetTodoAction,
  DeleteTodoAction
} from '../types/todoTypes';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import Todo from '../../shared/models/Todo.model';
import ApiService from '../services/apiService';
import { eventGA } from '../../utils/googleAnalytics';

export const loadTodos = (todos: Todo[]): LoadTodosAction => ({
  todos,
  type: LOAD_TODOS
});

export const fetchTodos = () => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    dispatch(() => ({ type: FETCH_TODOS }));
    return ApiService.getTodos(todos => dispatch(loadTodos(todos)));
  };
};

export const setTodo = (success: boolean): SetTodoAction => ({
  success,
  type: SET_TODO
});

export const saveTodo = (text: string) => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    dispatch(() => ({ type: SAVE_TODO }));
    return ApiService.setTodo(success => {
      eventGA({
        category: 'To Do List',
        action: `Save the To Do : ${text}`
      });
      dispatch(setTodo(success));
    }, text);
  };
};

export const deleteTodo = (success: boolean): DeleteTodoAction => ({
  success,
  type: DELETE_TODO
});

export const removeTodo = (identifier: string) => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    dispatch(() => ({ type: REMOVE_TODO }));
    return ApiService.deleteTodo(
      success => dispatch(deleteTodo(success)),
      identifier
    );
  };
};
