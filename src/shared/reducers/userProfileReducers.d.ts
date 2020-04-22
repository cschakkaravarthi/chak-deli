import { Reducer } from 'redux';
import { UserProfileState } from '../types/userProfileTypes';
import { Users } from 'umgc_ui_library/lib/seeds/OrgChart.model';
import { UserProfileModel, UserProfilePicture, ContactList } from '../models/UserInfo.model';
export declare const initialState: {
    userProfileDetails: UserProfileModel;
    userOrgChart: Users;
    profileDataError: boolean;
    chartDataError: boolean;
    userProfilePicture: UserProfilePicture;
    isUserProfileUpdate: boolean;
    isFetchUserProfile: boolean;
    userProfileUpdateErrorMessage: string;
    isUserProfileUpdateError: boolean;
    isFetchingMyContacts: boolean;
    userContactList: ContactList[];
    removeContactSucess: boolean;
    isUploading: boolean;
    uploadSuccess: boolean;
    uploadError: boolean;
    removeProfilePicSucess: boolean;
};
declare const userProfileReducers: Reducer<UserProfileState, any>;
export default userProfileReducers;
//# sourceMappingURL=userProfileReducers.d.ts.map