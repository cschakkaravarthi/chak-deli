import moxios from 'moxios';
import { loadEmployees, fetchEmployee } from './employeeActions';
import { LOAD_EMPLOYEE_SERVICES } from '../types/employeeTypes';
import getStore from '../services/mockGlobalStore';
import { dummyFacetedContentModel } from '../types/contentTypes';

describe('employeeActions', () => {
  let store: any;
  beforeEach(() => {
    store = getStore();
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('creates a loadEmployees action', () => {
    expect(loadEmployees(dummyFacetedContentModel)).toMatchSnapshot();
  });

  it.skip('fetchEmployee makes API call', done => {
    // Skipping this test until response is working
    const expectedActions = [LOAD_EMPLOYEE_SERVICES];

    moxios.stubRequest('content?type=page,link&category=116&sort=alphabetic', {
      status: 200,
      responseText: 'OK'
    });

    store
      .dispatch(fetchEmployee())
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
