import React, { FC } from 'react';
import Article from '../shared/models/Article.model';
import { NotificationBell } from '../shared/models/ManualNotification.model';
import { UserInfo, UserProfilePicture } from '../shared/models/UserInfo.model';
import LinkModel from '../shared/models/Link.model';
export interface PrimaryNavItem {
    id: number;
    route: string;
    label: string;
}
export interface SearchSuggest {
    value: string;
    label: string;
}
declare type Props = {
    user?: UserInfo;
    articles?: Article[];
    allLinksOpen?: boolean;
    notificationsOpen?: boolean;
    primaryNav?: PrimaryNavItem[];
    notificationsBell?: NotificationBell;
    fetchNotificationsBell?: <T>() => T;
    onSetAllLinksOpen?: (b: boolean) => void;
    onNotificationPress?: (b: boolean) => void;
    searchSuggestions?: SearchSuggest[];
    fetchSearchSuggestion?: (a: string, b: number) => void;
    clearSearchSuggestionList?: () => void;
    fetchUserLinks?: <T>() => T;
    links?: LinkModel[];
    editLinks: boolean;
    onSetEditLinks: (b: boolean) => void;
    fetchUserProfilePicture?: <T>(email: string) => T;
    userProfilePicture?: UserProfilePicture | null;
};
export declare const SlidingMenu: FC<Props>;
declare const _default: import("react-redux").ConnectedComponent<React.FC<Props>, Pick<Props, never> & Props>;
export default _default;
//# sourceMappingURL=SlidingMenu.d.ts.map