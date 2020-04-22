import Todo from '../models/Todo.model';
export declare const LOAD_TODOS = "LOAD_TODOS";
export declare const FETCH_TODOS = "FETCH_TODOS";
export declare const SET_TODO = "SET_TODO";
export declare const SAVE_TODO = "SAVE_TODO";
export declare const DELETE_TODO = "DELETE_TODO";
export declare const REMOVE_TODO = "DELETE_TODO";
export interface LoadTodosAction {
    type: typeof LOAD_TODOS;
    todos: Todo[];
}
export interface SetTodoAction {
    type: typeof SET_TODO;
    success: boolean;
}
export interface DeleteTodoAction {
    type: typeof DELETE_TODO;
    success: boolean;
}
export interface TodoState {
    todos: Todo[];
    success: boolean;
}
//# sourceMappingURL=todoTypes.d.ts.map