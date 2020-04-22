import usersReducers, { initialState } from './usersReducers';
import { SET_USER_DETAILS } from '../types/userTypes';
import { dummyUserInfo } from '../models/UserInfo.model';

describe('usersReducers', () => {
  it('Handles default case', () => {
    const state = usersReducers(undefined, {});
    expect(state).toEqual(initialState);
  });

  it('Handles loadArticles action', () => {
    const action = { type: SET_USER_DETAILS, user: dummyUserInfo };
    const state = usersReducers(undefined, action);
    expect(state).toMatchSnapshot();
  });
});
