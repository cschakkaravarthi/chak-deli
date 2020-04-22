import React, { FC } from 'react';
import { Error } from 'umgc_ui_library/lib/components/error';
import images from './../../images/images';

const ProfileDeactivated: FC = () => {
  return (
    <div className="mb-5">
      <Error backgroundImage={images.faceHeart} title="Sorry, we can’t find that person."
        message="This user is not found." isShowBrowsers={false} />
    </div>
  );
};

export default ProfileDeactivated;
