import UserInfoModel from '../models/UserInfo.model';
export declare const LOAD_USERS = "LOAD_USERS";
export declare const FETCH_USERS = "FETCH_USERS";
export declare const SET_USER_DETAILS = "SET_USER_DETAILS";
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
//# sourceMappingURL=userTypes.d.ts.map