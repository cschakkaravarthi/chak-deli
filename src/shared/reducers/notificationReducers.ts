import { Reducer } from 'redux';
import {
  NotificationState,
  LOAD_NOTIFICATIONS
} from '../types/notificationTypes';

export const initialState = {
  notifications: []
};

const notificationReducers: Reducer<NotificationState, any> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case LOAD_NOTIFICATIONS:
      return {
        ...state,
        notifications: action.notifications
      };
    default:
      return state;
  }
};

export default notificationReducers;
