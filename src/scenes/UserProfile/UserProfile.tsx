import React, { FC, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import UserProfileContainer from '../../components/user/UserProfileContainer';
import {
  fetchOrgChart,
  fetchUserProfileDetails,
  updateUserProfileRequest,
  fetchMyContactsData,
  fetchUserProfilePicture,
  updateRemoveProfilePic
} from '../../shared/actions/userProfileActions';
import { UserInfo, UserProfileModel, ContactList } from '../../shared/models/UserInfo.model';
import { Users } from '../../shared/models/OrgChart.model';
import { AppState } from '../../shared/types/genericTypes';
import { useQuery } from '../../utils/customHooks';
import { getUserInfo } from '../../reactAuthProvider';
import OnError from '../../components/error/Error';
import isEmpty from 'lodash.isempty';
// import Loader from '../../components/common/loader';
import ProfileDeactivated from '../Errors/ProfileDeactivated';

type Props = {
  user?: UserInfo;
  userOrgChart?: Users;
  profileDataError?: boolean;
  userProfileDetails?: UserProfileModel;
  userContactList?: ContactList[];
  isFetchUserProfile?: boolean;
  fetchOrgChart?: <T>(email: string) => T;
  fetchUserProfileDetails?: <T>(email: string) => T;
  updateUserProfileRequest?: <T>() => T;
  fetchMyContactsData?: <T>() => T;
  fetchUserProfilePicture?: <T>(email: string) => T;
  updateRemoveProfilePic?: () => void;
  removeContactSucess?: boolean;
  uploadSuccess?: boolean;
  removeProfilePicSucess?: boolean;
};

const mapState = (state: AppState, props: Props): Props => ({
  ...props,
  userOrgChart: state.userProfileReducers.userOrgChart,
  profileDataError: state.userProfileReducers.profileDataError,
  userProfileDetails: state.userProfileReducers.userProfileDetails,
  isFetchUserProfile: state.userProfileReducers.isFetchUserProfile,
  userContactList: state.userProfileReducers.userContactList,
  removeContactSucess: state.userProfileReducers.removeContactSucess,
  uploadSuccess: state.userProfileReducers.uploadSuccess,
  removeProfilePicSucess: state.userProfileReducers.removeProfilePicSucess
});

const actionCreators = {
  fetchOrgChart,
  fetchUserProfileDetails,
  updateUserProfileRequest,
  fetchMyContactsData,
  fetchUserProfilePicture,
  updateRemoveProfilePic
};

export const UserProfile: FC<Props> = props => {
  const {
    userOrgChart,
    fetchOrgChart,
    profileDataError,
    userProfileDetails,
    fetchUserProfileDetails,
    updateUserProfileRequest,
    isFetchUserProfile,
    fetchMyContactsData,
    userContactList = [],
    removeContactSucess,
    uploadSuccess,
    fetchUserProfilePicture,
    removeProfilePicSucess,
    updateRemoveProfilePic
  } = props;

  const [isFetching, setIsFetching] = useState<boolean>(false);

  const query = useQuery();
  const user = getUserInfo();

  let upn = query.get('upn');
  let isCurrentUser = false;

  if (user && user.userName) {
    isCurrentUser = !upn || upn.toLowerCase() === user.userName.toLowerCase();
  }

  useEffect(() => {
    if (!upn) {
      upn = user.userName;
    }

    async function asyncRequests (): Promise<void> {
      setIsFetching(true);
      await fetchOrgChart!(upn);
      await updateUserProfileRequest!();
      await fetchUserProfileDetails!(upn);
      await fetchMyContactsData!();
      setIsFetching(false);
    }

    asyncRequests();
  }, [upn]);

  useEffect(() => {
    fetchMyContactsData && fetchMyContactsData();
  }, [removeContactSucess]);

  useEffect(() => {
    if (user && user.userName && (uploadSuccess || removeProfilePicSucess)) {
      /// To stop user can click mulitple times for remove photo button accidently
      updateRemoveProfilePic && updateRemoveProfilePic();
      fetchUserProfileDetails && fetchUserProfileDetails(user.userName);
      fetchUserProfilePicture && fetchUserProfilePicture(user.userName);
    }
  }, [uploadSuccess, removeProfilePicSucess]);

  if (profileDataError) {
    return <OnError />;
  }

  if (!isFetching && !isFetchUserProfile && isEmpty(userProfileDetails)) {
    return <ProfileDeactivated />;
  }

  return (
    <UserProfileContainer
      isFetching={isFetching}
      isCurrentUser={isCurrentUser}
      orgChartDetails={userOrgChart}
      userContactList={userContactList}
      userProfileDetails={userProfileDetails}
    />
  );
};

export default connect(mapState, actionCreators)(UserProfile);
