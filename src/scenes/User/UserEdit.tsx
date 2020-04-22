import React, { FC, useEffect } from 'react';
import { connect } from 'react-redux';
import UserEditContainer from '../../components/user/UserEditContainer';
import { UserProfileModel, UserProfileUpdateResponse } from '../../shared/models/UserInfo.model';
import { AppState } from '../../shared/types/genericTypes';
import {
  fetchUserProfileDetails,
  setUserProfileData,
  updateUserProfileData,
  clearUserProfileUpdateError
} from '../../shared/actions/userProfileActions';
import * as H from 'history';
import { getUserInfo } from '../../reactAuthProvider';
import get from 'lodash.get';

type Props = {
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

const mapState = (state: AppState, props: Props): Props => ({
  ...props,
  userDetails: state.userProfileReducers.userProfileDetails,
  isUserProfileUpdate: state.userProfileReducers.isUserProfileUpdate,
  userProfileUpdateErrorMessage: state.userProfileReducers.userProfileUpdateErrorMessage,
  isUserProfileUpdateError: state.userProfileReducers.isUserProfileUpdateError
});

const actionCreators = {
  fetchUserProfileDetails,
  setUserProfileData,
  updateUserProfileData,
  clearUserProfileUpdateError
};

export const UserEdit: FC<Props> = props => {
  const {
    fetchUserProfileDetails,
    setUserProfileData,
    userDetails,
    isUserProfileUpdate,
    userProfileUpdateErrorMessage,
    isUserProfileUpdateError,
    updateUserProfileData,
    clearUserProfileUpdateError
  } = props;

  let userEmail: string = get(props.location, 'state.userEmail');

  if (!userEmail) {
    const user = getUserInfo();
    if (user && user.userName) {
      userEmail = user.userName;
    }
  }

  useEffect(() => {
    clearUserProfileUpdateError && clearUserProfileUpdateError();
    fetchUserProfileDetails && fetchUserProfileDetails(userEmail);
  }, [userEmail]);

  return (
    <div className="notifications-column">
      {
        userDetails &&
          <UserEditContainer
            userProfileUpdateErrorMessage={userProfileUpdateErrorMessage}
            isUserProfileUpdateError={isUserProfileUpdateError}
            isUserProfileUpdate={isUserProfileUpdate}
            userDetails={userDetails}
            setUserProfileData={setUserProfileData}
            updateUserProfileData={updateUserProfileData}
          />
      }
    </div>
  );
};

export default connect(
  mapState,
  actionCreators
)(UserEdit);
