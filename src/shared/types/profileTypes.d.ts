import UserInfoModel from '../models/UserInfo.model';
export declare const FETCH_PROFILE = "FETCH_PROFILE";
export declare const SET_PROFILE_DETAILS = "SET_PROFILE_DETAILS";
export interface ProfileState {
    profileDetails: UserInfoModel;
}
export interface LoadProfileDetailsAction {
    type: typeof SET_PROFILE_DETAILS;
    profile: UserInfoModel;
}
//# sourceMappingURL=profileTypes.d.ts.map