import userProfileReducers, { initialState } from './userProfileReducers';
import { SET_USER_PROFILE_DETAILS, SET_ORG_CHART, USER_PROFILE_RESPONSE_ERROR, ORG_CHART_RESPONSE_ERROR, CLEAR_PROFILE_DATA } from '../types/userProfileTypes';
import { dummyProfileInfo } from '../../shared/models/UserInfo.model';
import { dummyUsers } from '../../shared/models/OrgChart.model';

describe('userProfileReducers', () => {
  it('Handles default case', () => {
    const state = userProfileReducers(undefined, {});
    expect(state).toEqual(initialState);
  });

  it('Handles setProfileDetails action', () => {
    const action = { type: SET_USER_PROFILE_DETAILS, userProfileDetails: dummyProfileInfo };
    const state = userProfileReducers(initialState, action);
    expect(state).toMatchSnapshot();
  });

  it('Handles setUserOrgChart action', () => {
    const action = { type: SET_ORG_CHART, userOrgChart: dummyUsers };
    const state = userProfileReducers(initialState, action);
    expect(state).toMatchSnapshot();
  });

  it('Handles UserProfileResponseError action', () => {
    const action = { type: USER_PROFILE_RESPONSE_ERROR, profileDataError: true };
    const state = userProfileReducers(initialState, action);
    expect(state).toMatchSnapshot();
  });

  it('Handles OrgChartResponseError action', () => {
    const action = { type: ORG_CHART_RESPONSE_ERROR, profileDataError: true };
    const state = userProfileReducers(initialState, action);
    expect(state).toMatchSnapshot();
  });

  it('Handles clearProfileData action', () => {
    const action = { type: CLEAR_PROFILE_DATA, userProfileDetails: { title: '' }, userOrgChart: {}, profileDataError: false, chartDataError: false };
    const state = userProfileReducers(initialState, action);
    expect(state).toMatchSnapshot();
  });
});
