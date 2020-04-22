import React from 'react';
import Notification from '../shared/models/Notification.model';
declare type Props = {
    menuOpen: boolean;
    notifications?: Notification[];
    fetchNotifications?: <T>() => T;
    onSetMenuOpen: (b: boolean) => void;
};
export declare const NotificationsOverlay: React.FC<Props>;
declare const _default: import("react-redux").ConnectedComponent<React.FC<Props>, Pick<Props, never> & Props>;
export default _default;
//# sourceMappingURL=NotificationsOverlay.d.ts.map