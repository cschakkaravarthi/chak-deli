import React, { FC } from 'react';
import { Error } from 'umgc_ui_library/lib/components/error';
import images from './../../images/images';

export const Error400: FC = () => {
  return (
    <div className="mb-5">
      <Error
        backgroundImage={images.faceBrowser}
        title="Please upgrade your browser."
        message="UMG Central has detected that you are using an unsupported browser. Please use links below to download and install a supported browser."
        isShowBrowsers={true}
        chromeImage={images.chromeIcon}
        safariImage={images.safariIcon}
        edgeImage={images.edgeIcon}
      />
    </div>
  );
};
