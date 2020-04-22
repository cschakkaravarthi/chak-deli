import React from 'react';
import { dummyProfileInfo } from '../../shared/models/UserInfo.model';
import { dummyUsers } from '../../shared/models/OrgChart.model';
import { UserProfile } from './UserProfile';
import { shallowRender } from '../../shared/services/testHelper';
import { MemoryRouter } from 'react-router';

describe('User Profile Scene', () => {
  it('renders without data', () => {
    const tree = shallowRender(
      <MemoryRouter keyLength={0}>
        <UserProfile />
      </MemoryRouter>);
    expect(tree).toMatchSnapshot();
  });

  it('renders with data', () => {
    const tree = shallowRender(
      <MemoryRouter keyLength={0}>
        <UserProfile userProfileDetails={dummyProfileInfo} userOrgChart={dummyUsers} />
      </MemoryRouter>);
    expect(tree).toMatchSnapshot();
  });
});
