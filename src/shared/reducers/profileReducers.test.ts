import profileReducers, { initialState } from './profileReducers';
import { SET_PROFILE_DETAILS } from '../types/profileTypes';
import { dummyUserInfo } from '../models/UserInfo.model';

describe('profileReducers', () => {
  it('Handles default case', () => {
    const state = profileReducers(undefined, {});
    expect(state).toEqual(initialState);
  });

  it('Handles setProfileDetails action', () => {
    const action = { type: SET_PROFILE_DETAILS, profile: dummyUserInfo };
    const state = profileReducers(undefined, action);
    expect(state).toMatchSnapshot();
  });
});
