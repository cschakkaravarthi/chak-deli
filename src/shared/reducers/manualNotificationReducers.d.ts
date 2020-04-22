import { Reducer } from 'redux';
import { ManualNotificationListState } from '../types/manualNotificationTypes';
import { ManualNotificationListModel, NotificationBell } from '../models/ManualNotification.model';
export declare const initialState: {
    manualNotificationsListState: ManualNotificationListModel;
    facets: {};
    categories: import("../types/contentTypes").TaxonomyTermModel[];
    selectedFacet: string;
    notificationBell: NotificationBell;
    isNewOrArchived: string;
};
declare const manualNotificationReducers: Reducer<ManualNotificationListState, any>;
export default manualNotificationReducers;
//# sourceMappingURL=manualNotificationReducers.d.ts.map