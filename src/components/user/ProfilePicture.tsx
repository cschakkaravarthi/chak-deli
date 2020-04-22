import React, { FC } from 'react';
import { UserPhoto } from '../../shared/models/UserInfo.model';

type Props = {
  profilePictureSrc?: UserPhoto | any;
};

const ProfilePicture: FC<Props> = props => {
  const { profilePictureSrc } = props;

  return (
    <div className='user__picture'>
      <img src={profilePictureSrc} alt='user profile picture' />
    </div>
  );
};

export default ProfilePicture;
