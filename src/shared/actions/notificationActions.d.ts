import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { LoadNotificationsAction } from '../types/notificationTypes';
import Notification from '../models/Notification.model';
export declare const loadNotifications: (notifications: Notification[]) => LoadNotificationsAction;
export declare const fetchNotifications: () => (dispatch: ThunkDispatch<{}, {}, AnyAction>) => Promise<void>;
//# sourceMappingURL=notificationActions.d.ts.map