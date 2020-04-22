import moxios from 'moxios';
import { dummyUserInfo } from '../models/UserInfo.model';
import { loadUsers, fetchUserDetails } from './usersActions';
import getStore from '../services/mockGlobalStore';

describe('userActions', () => {
  let store: any;
  beforeEach(() => {
    store = getStore();
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('creates a loadUsers action', () => {
    expect(loadUsers([dummyUserInfo])).toMatchSnapshot();
  });

  it.skip('fetchUserDetails makes API call', done => {
    const expectedActions = ['SET_USER_DETAILS'];

    moxios.stubRequest('user', {
      status: 200,
      responseText: 'OK'
    });

    store
      .dispatch(fetchUserDetails('AbedA'))
      .then(() => {
        const actionsCalled = store
          .getActions()
          .map((action: any) => action.type);
        expect(actionsCalled).toEqual(expectedActions);
        done();
      })
      .catch((error: any) => {
        done(error);
      });
  });
});
