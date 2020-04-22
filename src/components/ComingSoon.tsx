import React, { FC } from 'react';
import images from '../images/images';
import { withRouter } from 'react-router-dom';
import * as H from 'history';

type Props = {
  location: H.Location;
};

const ComingSoon: FC<Props> = (props) => {
  const { location } = props;
  let pageTitle = '';
  let bgImage = '';
  if (location.pathname.includes('artists')) {
    pageTitle = 'Artists';
    bgImage = images.artistBg;
  } else if (location.pathname.includes('brands')) {
    pageTitle = 'Brands & Labels';
    bgImage = images.brandBg;
  } else {
    pageTitle = 'Systems & Applications';
    bgImage = images.systemBg;
  }

  return (
    <div className="coming-soon-page-bg" style={{ backgroundImage: `url(${bgImage})` }}>
      <div className="dark-linear-gradient h-100 d-flex justify-content-end align-items-start">
        <div className="d-flex align-items-end flex-column mt-4 mx-lg-5 mx-sm-5 mx-3">
          <img src={images.logoSrc} className="logo-props rounded" />
          <h1 className="coming-soon-title">
            <div className="text-right">{pageTitle}</div>
            <div>Coming Soon</div>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default withRouter(ComingSoon);
