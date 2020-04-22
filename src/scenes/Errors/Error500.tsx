import React, { FC } from 'react';
import { Error } from 'umgc_ui_library/lib/components/error';
import images from './../../images/images';

const Error500: FC = () => {
  return (
    <div className="mb-5">
      <Error backgroundImage={images.faceHeart} title="Error 500"
        message="Server error. It's not you - It's me." isShowBrowsers={false} />
    </div>
  );
};

export default Error500;
