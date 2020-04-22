import React from 'react';
import TestRenderer from 'react-test-renderer';
import UserInfo from './UserInfo';

import { dummyUserInfo } from '../../shared/models/UserInfo.model';

describe('UserInfo', () => {
  it('renders correctly without info', () => {
    const tree = TestRenderer.create(<UserInfo />).toJSON();
    expect(tree).toBe(null);
  });

  it('renders correctly with info', () => {
    const tree = TestRenderer.create(<UserInfo usersInfo={dummyUserInfo} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
