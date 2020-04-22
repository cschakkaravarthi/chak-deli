import React, { FC, useEffect } from 'react';
import { connect } from 'react-redux';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Container } from 'react-bootstrap';
import * as H from 'history';
import AppreciationCardTableContainer from '../../components/appreciationCards/AppreciationCardsTableContainer';
import { fetchUserProfileDetails } from '../../shared/actions/userProfileActions';
import { UserProfileModel } from '../../shared/models/UserInfo.model';
import { AppState } from '../../shared/types/genericTypes';
import { useQuery } from '../../utils/customHooks';
import { getUserInfo } from '../../reactAuthProvider';

type Props = {
  userProfileDetails?: UserProfileModel;
  fetchUserProfileDetails?: <T>(email: string) => T;
  location: H.Location;
};

const mapState = (state: AppState, props: Props): Props => ({
  ...props,
  userProfileDetails: state.userProfileReducers.userProfileDetails
});

const actionCreators = {
  fetchUserProfileDetails
};

export const AppreciationCardsScene: FC<Props> = props => {
  const { fetchUserProfileDetails, location } = props;

  const query = useQuery();
  const user = getUserInfo();

  let upn = query.get('upn');

  useEffect(() => {
    if (!upn) {
      upn = user.userName;
    }
    fetchUserProfileDetails && fetchUserProfileDetails(upn);
  }, [upn]);

  return (
    <Container className="user-profile-cards">
      <Row>
        <Col className="d-flex justify-content-between">
          <h3 className="font-weight-bold top-gap mb-5">Appreciation Cards</h3>
        </Col>
      </Row>
      <AppreciationCardTableContainer pathName={location.pathname} />
    </Container>
  );
};

export default connect(mapState, actionCreators)(AppreciationCardsScene);
