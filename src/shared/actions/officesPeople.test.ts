import moxios from 'moxios';
import { dummyOfficesPeople } from '../models/OfficesPeople.model';
import { loadOfficesPeople, fetchOfficesPeople } from './officesPeopleActions';
import { LOAD_OFFICES_PEOPLE } from '../types/officesPeopleType';
import getStore from '../services/mockGlobalStore';

describe('loadOfficesActions', () => {
  let store: any;
  beforeEach(() => {
    store = getStore();
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('creates a loadOfficesPeople action', () => {
    expect(loadOfficesPeople(dummyOfficesPeople)).toMatchSnapshot();
  });

  it.skip('fetchOfficesPeople makes API call', done => {
    // Skipping this test until response is working
    const expectedActions = [LOAD_OFFICES_PEOPLE];

    moxios.stubRequest('grouped_content?type=office&group=category&category=118&sort=alphabetic', {
      status: 200,
      responseText: 'OK'
    });

    store
      .dispatch(fetchOfficesPeople())
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
