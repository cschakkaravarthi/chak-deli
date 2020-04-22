import React, { FC } from 'react';
import { withRouter } from 'react-router-dom';
import * as H from 'history';

type Props = {
  location: H.Location;
};

const RedirectPage: FC<Props> = () => {
  return (
    <div></div>
  );
};

export default withRouter(RedirectPage);
