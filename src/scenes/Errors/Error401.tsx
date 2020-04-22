import React, { FC } from 'react';
import { Error } from 'umgc_ui_library/lib/components/error';
import images from './../../images/images';

export const Error401: FC = () => {
  return (
    <div className="mb-5">
      <Error backgroundImage={images.faceLock} title="Error 401"
        message="User is not logged in." isShowBrowsers={false} />
    </div>
  );
};
