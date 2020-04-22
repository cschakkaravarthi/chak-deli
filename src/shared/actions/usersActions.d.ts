import { ThunkAction } from 'redux-thunk';
import { AnyAction } from 'redux';
import { LoadUsersAction, LoadUserDetailsAction } from '../types/userTypes';
import UserInfoModel from '../models/UserInfo.model';
export declare const loadUsers: (users: UserInfoModel[]) => LoadUsersAction;
export declare const setUserDetails: (user: UserInfoModel) => LoadUserDetailsAction;
export declare const fetchUserDetails: (userID: string) => ThunkAction<Promise<void>, {}, {}, AnyAction>;
export declare const fetchUsersByEmail: (email: string) => ThunkAction<Promise<void>, {}, {}, AnyAction>;
//# sourceMappingURL=usersActions.d.ts.map