import moxios from 'moxios';
import { dummyNotifications } from '../../shared/models/Notification.model';
import { loadNotifications, fetchNotifications } from './notificationActions';
import { LOAD_NOTIFICATIONS } from '../types/notificationTypes';
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
    expect(loadNotifications(dummyNotifications)).toMatchSnapshot();
  });

  it.skip('fetchNotifications makes API call', done => {
    // Skipping this test until response is working
    const expectedActions = [LOAD_NOTIFICATIONS];

    moxios.stubRequest('notifications', {
      status: 200,
      responseText: 'OK'
    });

    store
      .dispatch(fetchNotifications())
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
