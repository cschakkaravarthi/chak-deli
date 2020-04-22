import moxios from 'moxios';
import { dummyManualNotificationListModel } from '../../shared/models/ManualNotification.model';
import { loadManualNotifications, fetchManualNotifications } from './manualNotificationAction';
import { LOAD_MANUAL_NOTIFICATIONS } from '../types/manualNotificationTypes';
import getStore from '../services/mockGlobalStore';

describe('notificationActions', () => {
  let store: any;
  beforeEach(() => {
    store = getStore();
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('creates a loadArticles action', () => {
    expect(loadManualNotifications(dummyManualNotificationListModel)).toMatchSnapshot();
  });

  it.skip('fetchNotifications makes API call', done => {
    // Skipping this test until response is working
    const expectedActions = [LOAD_MANUAL_NOTIFICATIONS];

    moxios.stubRequest('notifications', {
      status: 200,
      responseText: 'OK'
    });

    store
      .dispatch(fetchManualNotifications(''))
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
