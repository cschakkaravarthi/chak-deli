import Notification from '../models/Notification.model';
export declare const LOAD_NOTIFICATIONS = "LOAD_NOTIFICATIONS";
export declare const FETCH_NOTIFICATIONS = "FETCH_NOTIFICATIONS";
export interface NotificationState {
    notifications: Notification[];
}
export interface LoadNotificationsAction {
    type: typeof LOAD_NOTIFICATIONS;
    notifications: Notification[];
}
//# sourceMappingURL=notificationTypes.d.ts.map