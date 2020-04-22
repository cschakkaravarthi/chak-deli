import { ManualNotificationListModel, Categories, NotificationBell } from '../models/ManualNotification.model';
export declare const LOAD_MANUAL_NOTIFICATIONS = "LOAD_MANUAL_NOTIFICATIONS";
export declare const LOAD_MANUAL_NOTIFICATIONS_FILTER = "LOAD_MANUAL_NOTIFICATIONS_FILTER";
export declare const FETCH_MANUAL_NOTIFICATIONS = "FETCH_MANUAL_NOTIFICATIONS";
export declare const FETCH_MANUAL_NOTIFICATIONS_FILTER = "FETCH_MANUAL_NOTIFICATIONS_FILTER";
export declare const SET_MANUAL_NOTIFICATIONS_FILTER_FACET = "SET_MANUAL_NOTIFICATIONS_FILTER_FACET";
export declare const LOAD_MANUAL_NOTIFICATIONS_BELL = "LOAD_MANUAL_NOTIFICATIONS_BELL";
export declare const FETCH_MANUAL_NOTIFICATIONS_BELL = "FETCH_MANUAL_NOTIFICATIONS_BELL";
export declare const PUT_MANUAL_NOTIFICATIONS_ARCHIVE = "PUT_MANUAL_NOTIFICATIONS_ARCHIVE";
export declare const SET_MANUAL_NOTIFICATIONS_IS_NEW_OR_ARCHIVED = "SET_MANUAL_NOTIFICATIONS_IS_NEW_OR_ARCHIVED";
export interface ManualNotificationListState {
    manualNotificationsListState: ManualNotificationListModel;
    facets: {};
    categories: Categories[];
    selectedFacet: string;
    notificationBell: NotificationBell;
    isNewOrArchived: string;
}
export interface LoadManualNotificationsAction {
    type: typeof LOAD_MANUAL_NOTIFICATIONS;
    notificationsList: ManualNotificationListModel;
}
export interface LoadManualNotificationsFilterAction {
    type: typeof LOAD_MANUAL_NOTIFICATIONS_FILTER;
    filterList: Categories[];
}
export interface SetFilterFacetAction {
    type: typeof SET_MANUAL_NOTIFICATIONS_FILTER_FACET;
    selectedFacet: Categories;
}
export interface LoadManulNotificationsBellAction {
    type: typeof LOAD_MANUAL_NOTIFICATIONS_BELL;
    NotificationBell: NotificationBell;
}
export interface SetIsNewOrArchived {
    type: typeof SET_MANUAL_NOTIFICATIONS_IS_NEW_OR_ARCHIVED;
    isNewOrArchived: string;
}
//# sourceMappingURL=manualNotificationTypes.d.ts.map