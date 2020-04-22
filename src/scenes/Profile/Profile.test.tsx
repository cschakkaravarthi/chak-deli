import React from 'react';
import { dummyUserInfo } from '../../shared/models/UserInfo.model';
import { Profile } from './Profile';
import { shallowRender } from '../../shared/services/testHelper';

describe('Profile Scene', () => {
  it('renders without data', () => {
    const tree = shallowRender(<Profile />);
    expect(tree).toMatchSnapshot();
  });

  it('renders with data', () => {
    const tree = shallowRender(<Profile profileDetails={dummyUserInfo} />);
    expect(tree).toMatchSnapshot();
  });
});
