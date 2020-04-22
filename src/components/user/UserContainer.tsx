import React, { FC } from 'react';
import get from 'lodash.get';
import UserInfo from './UserInfo';
import ManagerInfo from './ManagerInfo';
import ProfilePicture from './ProfilePicture';
import DirectReportInfo from './DirectReportInfo';

import UserInfoModel from '../../shared/models/UserInfo.model';
import images from '../../images/images';

type Props = {
  history?: any;
  userDetails?: UserInfoModel;
};

const UserContainer: FC<Props> = props => {
  const { history, userDetails = {} } = props;

  if (!userDetails || !userDetails.networkID) return null;

  return (
    <>
      {get(userDetails, 'error') ? (
        <p>{get(userDetails, 'message')}</p>
      ) : (
        <div className='user'>
          <div className='umgc-layout--two-column'>
            <div className='layout-main'>
              <div className='user__content'>
                <div className='user__item'>
                  <div className='user-info__container'>
                    <ProfilePicture profilePictureSrc={get(userDetails, 'photo.medium', images.defaultAvatar)} />
                    <UserInfo usersInfo={userDetails} />
                  </div>
                </div>
                <div className='user__item'>
                  <ManagerInfo history={history} reportsTo={userDetails.reportsTo} />
                  <DirectReportInfo history={history} directReports={userDetails.directReports} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserContainer;
