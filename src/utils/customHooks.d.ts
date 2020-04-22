import { UserProfilePicture } from '../shared/models/UserInfo.model';
import React from 'react';
import EventModel, { EventSendInviteModel } from '../shared/models/Event.model';
interface AppConfigVarsType {
    aad: {
        'authority': string;
        'cacheLocation': 'localStorage' | 'sessionStorage';
        'clientId': string;
        'endpoints': {
            'api': string;
        };
        'redirectUriEnd': string;
        'tenant': string;
        'tokenRenewalOffsetSeconds': number;
        'validateAuthority': boolean;
    };
    centralApi: {
        baseUrl: string;
    };
    cloudfrontEndpoint: {
        baseUrl: string;
    };
    googleAnalytics: {
        REACT_APP_GA_DEBUG: boolean;
        REACT_APP_GA_TRACKING_ID: string;
    };
    serviceNowUri: {
        baseUrl: string;
        feedbackUrl: string;
    };
    logging: {
        LOGGING_ACCESS_FORMAT: string;
        LOGGING_COMPRESS: string;
        LOGGING_INTERVAL: string;
        LOGGING_LEVEL: string;
        LOGGING_MAX_SIZE: string;
        LOGGING_PATH: string;
        LOGGING_REQUESTS_ON_STDOUT: string;
        LOGGING_SPLUNK_BATCH_INTERVAL: string;
        LOGGING_SPLUNK_MAX_BATCH_COUNT: string;
        LOGGING_SPLUNK_MAX_BATCH_SIZE: string;
        LOGGING_SPLUNK_TOKEN: string;
        LOGGING_SPLUNK_URL: string;
    };
}
declare global {
    interface Window {
        env: AppConfigVarsType;
    }
}
export declare const appEnv: AppConfigVarsType;
interface FilterQueryWithSearchKeywordType {
    useFilterQueryWithSearchKeyword(searchKeyword: string, query: string, value: string, callback?: (a: string) => void): void;
}
interface FilterQueryType {
    useFilterQuery(query: string, value: string, callback: (a: string) => void): void;
}
interface UserEmailQueryType {
    userEmailQuery(value: string | undefined): void;
}
export declare function useQuery(): any;
export declare function filterQuery(): FilterQueryType;
export declare function filterQueryWithSearchKeyword(): FilterQueryWithSearchKeywordType;
export declare function usehandleAddToCalendar(id: string, title: string, ref: React.MutableRefObject<any>): Promise<void>;
export declare function emailQuery(): UserEmailQueryType;
/**
 *
 * @param ProfilePictureId
 * Description: Pass User profile Id and Get Whole URL if Id as null or undefined it will Return Default Image
 */
export declare function getUserProfilePicture(ProfilePictureId: UserProfilePicture | null | undefined, isOfficePeople?: boolean): string;
export declare function getKnowledgeBaseUrl(articleId: string): string;
export declare function getCatalogUrl(sysId: string): string;
export declare const extractExtension: (attachment: string) => string;
/**
 * Normalizing event Data
 * @returns {EventSendInviteModel}
 * @param event
 */
export declare function normalizeEventData(event: EventModel): EventSendInviteModel;
export {};
//# sourceMappingURL=customHooks.d.ts.map