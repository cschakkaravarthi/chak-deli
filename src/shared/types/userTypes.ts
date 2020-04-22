import UserInfoModel from '../models/UserInfo.model';

export const LOAD_USERS = 'LOAD_USERS';
export const FETCH_USERS = 'FETCH_USERS';
export const SET_USER_DETAILS = 'SET_USER_DETAILS';

export interface UsersState {
  users: UserInfoModel[];
  userDetails: UserInfoModel;
}

export interface LoadUsersAction {
  type: typeof LOAD_USERS;
  users: UserInfoModel[];
}

export interface LoadUserDetailsAction {
  type: typeof SET_USER_DETAILS;
  user: UserInfoModel;
}
