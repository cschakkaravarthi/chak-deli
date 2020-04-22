import { dummyProfileInfo } from '../models/UserInfo.model';
import { dummyUsers } from '../models/OrgChart.model';
import moxios from 'moxios';
import {
  fetchOrgChart,
  fetchUserProfileDetails,
  loadOrgChart,
  setUserProfileDetails
} from './userProfileActions';
import getStore from '../services/mockGlobalStore';

describe('UserProfileActions', () => {
  let store: any;
  beforeEach(() => {
    store = getStore();
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('creates a setUserProfileDetails action', () => {
    expect(setUserProfileDetails(dummyProfileInfo)).toMatchSnapshot();
  });

  it('creates a loadOrgChartDetails action', () => {
    expect(loadOrgChart(dummyUsers)).toMatchSnapshot();
  });

  it.skip('fetchUserProfileDetails makes API call', done => {
    const expectedActions = ['SET_USER_PROFILE_DETAILS'];

    moxios.stubRequest('user?=email=luz.lacson@umusic.com', {
      status: 200,
      responseText: 'OK'
    });

    store
      .dispatch(fetchUserProfileDetails('luz.lacson@umusic.com'))
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

  it.skip('fetchOrgChartDetails makes API call', done => {
    const expectedActions = ['SET_ORG_CHART'];

    moxios.stubRequest('chart?email=luz.lacson@umusic.com', {
      status: 200,
      responseText: 'OK'
    });

    store
      .dispatch(fetchOrgChart('luz.lacson@umusic.com'))
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
