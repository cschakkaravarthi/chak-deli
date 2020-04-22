import React from 'react';
import { UserEdit } from './UserEdit';
import { shallowRender } from '../../shared/services/testHelper';
import { MemoryRouter } from 'react-router';

describe('User Profile Scene', () => {
  it('renders without data', () => {
    const tree = shallowRender(
      <MemoryRouter keyLength={0}>
        <UserEdit userProfileUpdateErrorMessage="" isUserProfileUpdateError={true} />
      </MemoryRouter>);
    expect(tree).toMatchSnapshot();
  });
});
