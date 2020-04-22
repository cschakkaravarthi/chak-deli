import React from 'react';
import UserProfileContainer from './UserProfileContainer';

import { dummyProfileInfo, dummyContactList } from '../../shared/models/UserInfo.model';
import { dummyUsers } from '../../shared/models/OrgChart.model';
import { MemoryRouter } from 'react-router-dom';
import { shallowRender } from '../../shared/services/testHelper';

describe('UserProfileContainer', () => {
  it('renders correctly without info', () => {
    const tree = shallowRender(
      <MemoryRouter keyLength={0}>
        <UserProfileContainer userContactList={[]} />
      </MemoryRouter>
    );
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with info', () => {
    const tree = shallowRender(
      <MemoryRouter keyLength={0}>
        <UserProfileContainer
          isCurrentUser={false}
          orgChartDetails={dummyUsers}
          userContactList={[dummyContactList]}
          userProfileDetails={dummyProfileInfo}
        />
      </MemoryRouter>
    );
    expect(tree).toMatchSnapshot();
  });
});
