import notificationReducers, { initialState } from './manualNotificationReducers';
import { LOAD_MANUAL_NOTIFICATIONS } from '../types/manualNotificationTypes';
import { dummyManualNotificationListModel } from '../models/ManualNotification.model';

describe('notificationReducers', () => {
  it('Handles default case', () => {
    const state = notificationReducers(undefined, {});
    expect(state).toEqual(initialState);
  });

  it('Handles loadNotifications action', () => {
    const action = { type: LOAD_MANUAL_NOTIFICATIONS, articles: dummyManualNotificationListModel };
    const state = notificationReducers(undefined, action);
    expect(state).toMatchSnapshot();
  });
});
