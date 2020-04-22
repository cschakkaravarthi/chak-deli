import notificationReducers, { initialState } from './notificationReducers';
import { LOAD_NOTIFICATIONS } from '../types/notificationTypes';
import { dummyNotifications } from '../models/Notification.model';

describe('notificationReducers', () => {
  it('Handles default case', () => {
    const state = notificationReducers(undefined, {});
    expect(state).toEqual(initialState);
  });

  it('Handles loadNotifications action', () => {
    const action = { type: LOAD_NOTIFICATIONS, articles: dummyNotifications };
    const state = notificationReducers(undefined, action);
    expect(state).toMatchSnapshot();
  });
});
