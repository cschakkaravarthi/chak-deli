import React from 'react';
import Link, { LinkGroupItems } from '../shared/models/Link.model';
import { UserInfo } from '../shared/models/UserInfo.model';
declare type Props = {
    user?: UserInfo;
    menuOpen: boolean;
    onSetMenuOpen: (b: boolean) => void;
    editLinks: boolean;
    onSetEditLinks: (b: boolean) => void;
    fetchLinks?: <T>() => T;
    groups: LinkGroupItems[];
    fetchUserLinks?: <T>() => T;
    links: Link[];
    saveUserLinks?: <T>(links: string[]) => Promise<T>;
};
export declare const AllLinksOverlay: React.FC<Props>;
declare const _default: import("react-redux").ConnectedComponent<React.FC<Props>, Pick<Props, never> & Props>;
export default _default;
//# sourceMappingURL=AllLinksOverlay.d.ts.map