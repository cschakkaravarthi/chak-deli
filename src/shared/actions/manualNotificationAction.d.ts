import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { LoadManualNotificationsAction, LoadManualNotificationsFilterAction, SetFilterFacetAction, LoadManulNotificationsBellAction, SetIsNewOrArchived } from '../types/manualNotificationTypes';
import { ManualNotificationListModel, NotificationBell } from '../models/ManualNotification.model';
export declare const loadManualNotifications: (notificationsList: ManualNotificationListModel) => LoadManualNotificationsAction;
export declare const fetchManualNotifications: (id: string) => (dispatch: ThunkDispatch<{}, {}, AnyAction>) => Promise<void>;
export declare const loadManualNotificationsFilter: (filterList: import("../types/contentTypes").TaxonomyTermModel[]) => LoadManualNotificationsFilterAction;
export declare const fetchManualNotificationsFilter: () => (dispatch: ThunkDispatch<{}, {}, AnyAction>) => Promise<void>;
export declare const setFilterFacet: (selectedFacet: import("../types/contentTypes").TaxonomyTermModel) => SetFilterFacetAction;
export declare const loadNotificationsBell: (NotificationBell: NotificationBell) => LoadManulNotificationsBellAction;
export declare const setIsNewOrArchived: (isNewOrArchived: string) => SetIsNewOrArchived;
export declare const fetchNotificationsBell: () => (dispatch: ThunkDispatch<{}, {}, AnyAction>) => Promise<void>;
export declare const setNotificationsArchive: (drupal_id: number | undefined) => (dispatch: ThunkDispatch<{}, {}, AnyAction>) => void;
//# sourceMappingURL=manualNotificationAction.d.ts.map