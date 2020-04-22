import React, { FC } from 'react';
import { UserInfo, UserProfileModel, ContactList } from '../../shared/models/UserInfo.model';
import { Users } from '../../shared/models/OrgChart.model';
declare type Props = {
    user?: UserInfo;
    userOrgChart?: Users;
    chartDataError?: boolean;
    profileDataError?: boolean;
    userProfileDetails?: UserProfileModel;
    userContactList?: ContactList[];
    isFetchUserProfile?: boolean;
    isFetchingMyContacts?: boolean;
    clearProfileData?: <T>() => T;
    fetchOrgChart?: <T>(email: string) => T;
    fetchUserProfileDetails?: <T>(email: string) => T;
    updateUserProfileRequest?: () => void;
    fetchMyContactsData?: <T>() => T;
    fetchUserProfilePicture?: <T>(email: string) => T;
    removeContactSucess?: boolean;
    uploadSuccess?: boolean;
    removeProfilePicSucess?: boolean;
};
export declare const UserProfile: FC<Props>;
declare const _default: import("react-redux").ConnectedComponent<React.FC<Props>, Pick<Props, never> & Props>;
export default _default;
//# sourceMappingURL=UserProfile.d.ts.map