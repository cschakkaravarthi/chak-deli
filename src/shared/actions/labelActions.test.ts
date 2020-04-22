import { dummyLabelsArray } from '../models/Label.model';
import moxios from 'moxios';
import { fetchLabels, loadLabels } from './labelActions';
import getStore from '../services/mockGlobalStore';
import { LOAD_LABELS } from '../types/labelTypes';

describe('LabelActions', () => {
  let store: any;
  beforeEach(() => {
    store = getStore();
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('creates a loadDepartments action', () => {
    expect(loadLabels(dummyLabelsArray)).toMatchSnapshot();
  });

  it.skip('fetchLabels makes API call', done => {
    const expectedActions = [LOAD_LABELS];

    moxios.stubRequest('/content?type=label', {
      status: 200,
      responseText: 'OK'
    });

    store
      .dispatch(fetchLabels())
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
