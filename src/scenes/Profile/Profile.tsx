import React, { FC, useEffect } from 'react';
import { connect } from 'react-redux';
import UserContainer from '../../components/user/UserContainer';
import { fetchProfileDetails } from '../../shared/actions/profileActions';
import UserInfoModel from '../../shared/models/UserInfo.model';
import { AppState } from '../../shared/types/genericTypes';

type Props = {
  history?: any;
  fetchProfileDetails?: any;
  profileDetails?: UserInfoModel;
};

const mapState = (state: AppState, props: Props): Props => ({
  ...props,
  profileDetails: state.profileReducers.profileDetails
});

const actionCreators = {
  fetchProfileDetails
};

export const Profile: FC<Props> = props => {
  const { profileDetails, fetchProfileDetails, history } = props;

  useEffect(() => {
    !profileDetails && fetchProfileDetails();
  }, []);

  return <UserContainer history={history} userDetails={profileDetails} />;
};

export default connect(
  mapState,
  actionCreators
)(Profile);
