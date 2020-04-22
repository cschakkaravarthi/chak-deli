import React, { FC } from 'react';
import { Error } from 'umgc_ui_library/lib/components/error';
import images from './../../images/images';

const Error404: FC = () => {
  return (
    <div className="mb-5">
      <Error backgroundImage={images.faceDocument} title="Error 404"
        message="Page or resource not found at this URL." isShowBrowsers={false} />
    </div>
  );
};

export default Error404;
