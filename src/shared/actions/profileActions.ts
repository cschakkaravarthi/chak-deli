import { ThunkAction, ThunkDispatch } from 'redux-thunk';

import { AnyAction } from 'redux';

import {
  LoadProfileDetailsAction,
  FETCH_PROFILE,
  SET_PROFILE_DETAILS
} from '../types/profileTypes';

import ApiService from '../services/apiService';
import UserInfoModel from '../models/UserInfo.model';

export const setProfileDetails = (
  profile: UserInfoModel
): LoadProfileDetailsAction => ({
  profile,
  type: SET_PROFILE_DETAILS
});

export const fetchProfileDetails = (): ThunkAction<
  Promise<void>,
  {},
  {},
  AnyAction
> => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    dispatch(() => ({ type: FETCH_PROFILE }));
    return ApiService.getProfile(profile =>
      dispatch(setProfileDetails(profile))
    );
  };
};
