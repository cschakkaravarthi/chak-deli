import { Reducer } from 'redux';
import {
  ManualNotificationListState,
  LOAD_MANUAL_NOTIFICATIONS,
  LOAD_MANUAL_NOTIFICATIONS_FILTER,
  SET_MANUAL_NOTIFICATIONS_FILTER_FACET,
  LOAD_MANUAL_NOTIFICATIONS_BELL,
  SET_MANUAL_NOTIFICATIONS_IS_NEW_OR_ARCHIVED
} from '../types/manualNotificationTypes';
import { ManualNotificationListModel, Categories, NotificationBell } from '../models/ManualNotification.model';

export const initialState = {
  manualNotificationsListState: {} as ManualNotificationListModel,
  facets: {},
  categories: [] as Categories[],
  selectedFacet: '',
  notificationBell: {} as NotificationBell,
  isNewOrArchived: 'new'
};

const manualNotificationReducers: Reducer<ManualNotificationListState, any> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case LOAD_MANUAL_NOTIFICATIONS:
      return {
        ...state,
        manualNotificationsListState: action.notificationsList
      };
    case LOAD_MANUAL_NOTIFICATIONS_FILTER:
      return {
        ...state,
        categories: action.filterList
      };
    case SET_MANUAL_NOTIFICATIONS_FILTER_FACET:
      return {
        ...state,
        selectedFacet: action.selectedFacet,
        manualNotificationsListState: {} as ManualNotificationListModel
      };
    case LOAD_MANUAL_NOTIFICATIONS_BELL:
      return {
        ...state,
        notificationBell: action.NotificationBell
      };
    case SET_MANUAL_NOTIFICATIONS_IS_NEW_OR_ARCHIVED:
      return {
        ...state,
        isNewOrArchived: action.isNewOrArchived
      };
    default:
      return state;
  }
};

export default manualNotificationReducers;
