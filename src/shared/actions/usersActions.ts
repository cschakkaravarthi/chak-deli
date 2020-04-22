import { ThunkAction, ThunkDispatch } from 'redux-thunk';

import { AnyAction } from 'redux';

import {
  LoadUsersAction,
  LoadUserDetailsAction,
  LOAD_USERS,
  FETCH_USERS,
  SET_USER_DETAILS
} from '../types/userTypes';

import ApiService from '../services/apiService';
import UserInfoModel from '../models/UserInfo.model';

export const loadUsers = (users: UserInfoModel[]): LoadUsersAction => ({
  users,
  type: LOAD_USERS
});

export const setUserDetails = (user: UserInfoModel): LoadUserDetailsAction => ({
  user,
  type: SET_USER_DETAILS
});

export const fetchUserDetails = (
  userID: string
): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    dispatch(() => ({ type: FETCH_USERS }));
    return ApiService.getUserByNetworkId(
      user => dispatch(setUserDetails(user[0])),
      userID
    );
  };
};

export const fetchUsersByEmail = (
  email: string
): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    dispatch(() => ({ type: FETCH_USERS }));
    return ApiService.getUserByEmail(
      user => dispatch(loadUsers(user)),
      email
    );
  };
};
