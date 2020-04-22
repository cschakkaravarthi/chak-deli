import { MsalAuthProvider, AccessTokenResponse } from 'react-aad-msal';
import { UserInfo } from './shared/models/UserInfo.model';
export declare const GRAPH_SCOPES: {
    WEB_API: string;
};
export declare const authProvider: MsalAuthProvider;
export declare const getAccessToken: () => Promise<AccessTokenResponse>;
/**
     * Getting the User information from ID token.
     *
     * @returns {UserInfo} -  return name and profile
     * @memberof AuthProvider
     */
export declare function getUserInfo(): UserInfo;
//# sourceMappingURL=reactAuthProvider.d.ts.map