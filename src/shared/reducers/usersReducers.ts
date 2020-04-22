import { Reducer } from 'redux';
import { UsersState, LOAD_USERS, SET_USER_DETAILS } from '../types/userTypes';

export const initialState = {
  userDetails: {},
  users: []
};

const usersReducers: Reducer<UsersState, any> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case SET_USER_DETAILS:
      return {
        ...state,
        userDetails: action.user
      };
    case LOAD_USERS:
      return {
        ...state,
        users: action.users
      };
    default:
      return state;
  }
};

export default usersReducers;
