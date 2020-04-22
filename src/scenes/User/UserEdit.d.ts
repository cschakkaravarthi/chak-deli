import React, { FC } from 'react';
import { UserProfileModel, UserProfileUpdateResponse } from '../../shared/models/UserInfo.model';
import * as H from 'history';
declare type Props = {
    userDetails?: UserProfileModel;
    location?: H.Location;
    fetchUserProfileDetails?: <T>(email: string) => T;
    setUserProfileData?: <T>(userInput: Omit<UserProfileModel, 'title'>) => T;
    updateUserProfileData?: (validationError: UserProfileUpdateResponse) => void;
    clearUserProfileUpdateError?: () => void;
    isUserProfileUpdate?: boolean;
    userProfileUpdateErrorMessage: string;
    isUserProfileUpdateError: boolean;
};
export declare const UserEdit: FC<Props>;
declare const _default: import("react-redux").ConnectedComponent<React.FC<Props>, Pick<Props, never> & Props>;
export default _default;
//# sourceMappingURL=UserEdit.d.ts.map