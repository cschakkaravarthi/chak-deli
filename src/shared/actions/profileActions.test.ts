import { dummyUserInfo } from '../models/UserInfo.model';
import moxios from 'moxios';
import { fetchProfileDetails, setProfileDetails } from './profileActions';
import getStore from '../services/mockGlobalStore';

describe('profileActions', () => {
  let store: any;
  beforeEach(() => {
    store = getStore();
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('creates a setProfileDetails action', () => {
    expect(setProfileDetails(dummyUserInfo)).toMatchSnapshot();
  });

  it.skip('fetchProfileDetails makes API call', done => {
    const expectedActions = ['SET_PROFILE_DETAILS'];

    moxios.stubRequest('profile', {
      status: 200,
      responseText: 'OK'
    });

    store
      .dispatch(fetchProfileDetails())
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
