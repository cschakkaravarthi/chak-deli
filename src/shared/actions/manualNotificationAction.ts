import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import {
  LoadManualNotificationsAction,
  LOAD_MANUAL_NOTIFICATIONS,
  FETCH_MANUAL_NOTIFICATIONS,
  LoadManualNotificationsFilterAction,
  FETCH_MANUAL_NOTIFICATIONS_FILTER,
  SetFilterFacetAction,
  SET_MANUAL_NOTIFICATIONS_FILTER_FACET,
  LOAD_MANUAL_NOTIFICATIONS_FILTER,
  LOAD_MANUAL_NOTIFICATIONS_BELL,
  FETCH_MANUAL_NOTIFICATIONS_BELL,
  LoadManulNotificationsBellAction,
  SetIsNewOrArchived,
  SET_MANUAL_NOTIFICATIONS_IS_NEW_OR_ARCHIVED
} from '../types/manualNotificationTypes';

import ApiService from '../services/apiService';
import { ManualNotificationListModel, Categories, NotificationBell } from '../models/ManualNotification.model';
import { triggerToast } from './commonActions';
import { eventGA } from '../../utils/googleAnalytics';
import Facet from '../models/Facet.model';

export const loadManualNotifications = (
  notificationsList: ManualNotificationListModel
): LoadManualNotificationsAction => ({
  notificationsList,
  type: LOAD_MANUAL_NOTIFICATIONS
});

export const fetchManualNotifications = (newOrArchive: string, id?: string, type?: string) => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    dispatch(() => ({ type: FETCH_MANUAL_NOTIFICATIONS }));
    return ApiService.getManualNotifications(notifications =>
      dispatch(loadManualNotifications(notifications)),
    newOrArchive,
    id || '', type || ''
    );
  };
};

export const loadManualNotificationsFilter = (
  filterList: Categories[]
): LoadManualNotificationsFilterAction => ({
  filterList,
  type: LOAD_MANUAL_NOTIFICATIONS_FILTER
});

export const fetchManualNotificationsFilter = () => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    dispatch(() => ({ type: FETCH_MANUAL_NOTIFICATIONS_FILTER }));
    return ApiService.getManualNotificationsFilterList(filterLists =>
      dispatch(loadManualNotificationsFilter(filterLists))
    );
  };
};

export const setFilterFacet = (
  selectedFacet: Facet
): SetFilterFacetAction => ({
  selectedFacet,
  type: SET_MANUAL_NOTIFICATIONS_FILTER_FACET
});

export const loadNotificationsBell = (
  NotificationBell: NotificationBell
): LoadManulNotificationsBellAction => ({
  NotificationBell,
  type: LOAD_MANUAL_NOTIFICATIONS_BELL
});

export const setIsNewOrArchived = (
  isNewOrArchived: string
): SetIsNewOrArchived => ({
  isNewOrArchived,
  type: SET_MANUAL_NOTIFICATIONS_IS_NEW_OR_ARCHIVED
});

export const fetchNotificationsCount = () => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    dispatch(() => ({ type: FETCH_MANUAL_NOTIFICATIONS_BELL }));
    return ApiService.getNotificationsBell(notifications =>
      dispatch(loadNotificationsBell(notifications))
    );
  };
};

export const setNotificationsArchive = (drupal_id: number | undefined) => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>): void => {
    ApiService.setNotificationsArchive(
      () => {
        eventGA({
          category: 'Notification',
          action: 'Archived successfully'
        });
        dispatch(fetchNotificationsCount());
        dispatch(fetchManualNotifications('new'));
        dispatch(triggerToast('Notification archived successfully.'));
      },
      () => {
        dispatch(triggerToast('Error archiving notification.', true));
      },
      drupal_id
    );
  };
};

export const setNotificationsApprove = (sysId: string) => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>): void => {
    ApiService.setNotificationsApprove(
      (state: string) => {
        if (state === 'approved') {
          dispatch(fetchNotificationsCount());
          dispatch(fetchManualNotifications('new'));
          dispatch(triggerToast('Request Approved successfully.'));
        } else {
          dispatch(triggerToast('Sorry, there was an error approving this request. We are looking into it.', true));
        }
      },
      () => {
        dispatch(triggerToast('Sorry, there was an error approving this request. We are looking into it.', true));
      },
      sysId
    );
  };
};

export const setNotificationsReject = (sysId: string, message: string) => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>): void => {
    ApiService.setNotificationsReject(
      (state: string) => {
        if (state === 'rejected') {
          dispatch(fetchNotificationsCount());
          dispatch(fetchManualNotifications('new'));
          dispatch(triggerToast('Request Rejected successfully.'));
        } else {
          dispatch(triggerToast('Sorry, there was an error rejecting this request. We are looking into it.', true));
        }
      },
      () => {
        dispatch(triggerToast('Sorry, there was an error rejecting this request. We are looking into it.', true));
      },
      sysId,
      message
    );
  };
};
