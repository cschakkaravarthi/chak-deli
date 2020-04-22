import React, { FC, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import get from 'lodash.get';
import UserContainer from '../../components/user/UserContainer';
import { fetchUserDetails } from '../../shared/actions/usersActions';
import UserInfoModel from '../../shared/models/UserInfo.model';
import { AppState } from '../../shared/types/genericTypes';

type Props = {
  match?: any;
  history?: any;
  location?: any;
  withRouter?: any;
  fetchUserDetails?: any;
  userDetails?: UserInfoModel;
};

const mapState = (state: AppState, props: Props): Props => ({
  ...props,
  userDetails: state.usersReducers.userDetails
});

const actionCreators = {
  fetchUserDetails
};

export const User: FC<Props> = props => {
  const { userDetails, fetchUserDetails, history, match, location } = props;

  const networkID = get(match, 'params.id');

  useEffect(() => {
    !networkID && fetchUserDetails(get(userDetails, 'networkID'));
  }, []);

  useEffect(() => {
    if (get(match, 'params.id')) {
      fetchUserDetails(networkID);
    }
  }, [get(location, 'pathname'), get(match, 'params.id')]);

  return <UserContainer history={history} userDetails={userDetails} />;
};

export default connect(
  mapState,
  actionCreators
)(withRouter(User));
