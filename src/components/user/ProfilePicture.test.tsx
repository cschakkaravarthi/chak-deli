import React from 'react';
import TestRenderer from 'react-test-renderer';
import ProfilePicture from './ProfilePicture';

import get from 'lodash.get';

import { dummyUserInfo } from '../../shared/models/UserInfo.model';
import images from '../../images/images';

describe('ProfilePicture', () => {
  it('renders correctly with info', () => {
    const tree = TestRenderer.create(
      <ProfilePicture
        profilePictureSrc={get(
          dummyUserInfo,
          'photo.medium',
          images.defaultAvatar
        )}/>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
