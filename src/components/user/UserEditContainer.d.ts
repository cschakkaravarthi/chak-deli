import { FC } from 'react';
import { UserProfileModel, UserProfileUpdateResponse } from '../../shared/models/UserInfo.model';
declare type Props = {
    userDetails: Omit<UserProfileModel, 'title'>;
    setUserProfileData?: <T>(userInput: Omit<UserProfileModel, 'title'>) => T;
    isUserProfileUpdate?: boolean;
    userProfileUpdateErrorMessage: string;
    isUserProfileUpdateError: boolean;
    updateUserProfileData?: (validationError: UserProfileUpdateResponse) => void;
};
declare const UserEditContainer: FC<Props>;
export default UserEditContainer;
//# sourceMappingURL=UserEditContainer.d.ts.map