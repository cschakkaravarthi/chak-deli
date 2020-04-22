import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

import {
  LoadNotificationsAction,
  LOAD_NOTIFICATIONS,
  FETCH_NOTIFICATIONS
} from '../types/notificationTypes';

import ApiService from '../services/apiService';
import Notification from '../models/Notification.model';

export const loadNotifications = (
  notifications: Notification[]
): LoadNotificationsAction => ({
  notifications,
  type: LOAD_NOTIFICATIONS
});

export const fetchNotifications = () => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    dispatch(() => ({ type: FETCH_NOTIFICATIONS }));
    return ApiService.getNotifications(notifications =>
      dispatch(loadNotifications(notifications))
    );
  };
};
