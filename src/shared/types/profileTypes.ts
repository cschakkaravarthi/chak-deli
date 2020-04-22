import UserInfoModel from '../models/UserInfo.model';

export const FETCH_PROFILE = 'FETCH_PROFILE';
export const SET_PROFILE_DETAILS = 'SET_PROFILE_DETAILS';

export interface ProfileState {
  profileDetails: UserInfoModel;
}

export interface LoadProfileDetailsAction {
  type: typeof SET_PROFILE_DETAILS;
  profile: UserInfoModel;
}
