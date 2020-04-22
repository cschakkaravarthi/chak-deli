import { LoadTodosAction, SetTodoAction, DeleteTodoAction } from '../types/todoTypes';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import Todo from '../../shared/models/Todo.model';
export declare const loadTodos: (todos: Todo[]) => LoadTodosAction;
export declare const fetchTodos: () => (dispatch: ThunkDispatch<{}, {}, AnyAction>) => Promise<void>;
export declare const setTodo: (success: boolean) => SetTodoAction;
export declare const saveTodo: (text: string) => (dispatch: ThunkDispatch<{}, {}, AnyAction>) => Promise<void>;
export declare const deleteTodo: (success: boolean) => DeleteTodoAction;
export declare const removeTodo: (identifier: string) => (dispatch: ThunkDispatch<{}, {}, AnyAction>) => Promise<void>;
//# sourceMappingURL=todoActions.d.ts.map