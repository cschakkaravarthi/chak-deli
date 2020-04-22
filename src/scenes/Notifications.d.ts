import React, { FC } from 'react';
import { ManualNotificationListModel, Categories } from './../shared/models/ManualNotification.model';
declare type Props = {
    notifications?: ManualNotificationListModel;
    categories?: Categories[];
    isNewOrArchived?: string;
    setFilterFacet: (a: string) => void;
    setIsNewOrArchived?: (a: string) => void;
    fetchManualNotifications?: <T>(id: string) => T;
    fetchManualNotificationsFilter?: <T>() => T;
    fetchNotificationsBell?: <T>() => T;
    setNotificationsArchive?: <T>(a: number | undefined) => T;
};
export declare const Notifications: FC<Props>;
declare const _default: import("react-redux").ConnectedComponent<React.FC<Props>, Pick<Props, never> & Props>;
export default _default;
//# sourceMappingURL=Notifications.d.ts.map