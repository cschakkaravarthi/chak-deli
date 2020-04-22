import { dummyDepartmentsArray } from '../models/Department.model';
import moxios from 'moxios';
import { fetchDepartments, loadDepartments } from './departmentActions';
import getStore from '../services/mockGlobalStore';
import { LOAD_DEPARTMENTS } from '../types/departmentTypes';

describe('DepartmentsActions', () => {
  let store: any;
  beforeEach(() => {
    store = getStore();
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('creates a loadDepartments action', () => {
    expect(loadDepartments(dummyDepartmentsArray)).toMatchSnapshot();
  });

  it.skip('fetchDepartments makes API call', done => {
    const expectedActions = [LOAD_DEPARTMENTS];

    moxios.stubRequest('/content?type=department', {
      status: 200,
      responseText: 'OK'
    });

    store
      .dispatch(fetchDepartments())
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
