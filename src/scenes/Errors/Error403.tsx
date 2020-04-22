import React, { FC } from 'react';
import { Error } from 'umgc_ui_library/lib/components/error';
import images from './../../images/images';

export const Error403: FC = () => {
  return (
    <div className="mb-5">
      <Error backgroundImage={images.faceStop} title="Error 403"
        message="Forbidden content." isShowBrowsers={false} />
    </div>
  );
};
