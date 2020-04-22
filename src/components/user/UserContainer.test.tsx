import React from 'react';
import TestRenderer from 'react-test-renderer';
import UserContainer from './UserContainer';

import { dummyUserInfo } from '../../shared/models/UserInfo.model';

describe('UserContainer', () => {
  it('renders correctly without info', () => {
    const tree = TestRenderer.create(<UserContainer />).toJSON();
    expect(tree).toBe(null);
  });

  it('renders correctly with info', () => {
    const tree = TestRenderer.create(<UserContainer userDetails={dummyUserInfo} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
