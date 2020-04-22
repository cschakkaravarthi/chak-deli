import { useLocation, useHistory } from 'react-router-dom';
import { downloadAddToCalendarAction } from '../shared/actions/eventActions';
import { UserProfilePicture } from '../shared/models/UserInfo.model';
import React from 'react';
import { getUserInfo } from '../reactAuthProvider';
import EventModel, { EventSendInviteModel } from '../shared/models/Event.model';
import { formatDate, getEventTime } from '../shared/services/date';
import { SEND_EVENT_BODY_MESSAGE } from '../constants/constants';
// IMPORTANT: Also update src/testingSetup when you update this.
interface AppConfigVarsType {
  aad: {
    authority: string;
    cacheLocation: 'localStorage' | 'sessionStorage';
    clientId: string;
    endpoints: {
      api: string;
    };
    redirectUriEnd: string;
    tenant: string;
    tokenRenewalOffsetSeconds: number;
    validateAuthority: boolean;
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

// loads app config from config/index.json with data type
export const appEnv: AppConfigVarsType = Object.freeze(window.env);

interface FilterQueryWithSearchKeywordType {
  useFilterQueryWithSearchKeyword(
    searchKeyword: string,
    query: string,
    value: string,
    callback?: (a: string) => void
  ): void;
}
interface FilterQueryType {
  // this type has been change to any since there are too many
  // functions in the code using any due to this callback which is a param receiving
  // multiple types of data
  useFilterQuery(query: string, value: string, callback: any): void;
}

interface UserEmailQueryType {
  userEmailQuery(value: string | undefined): void;
}
// End of defining data types for hooks.uuu

// Parses the query string
export function useQuery (): any {
  return new URLSearchParams(useLocation().search);
}

// Takes the query key, query value and a callback reference (redux action). It pushes the query to the history and dispatches the action
export function filterQuery (): FilterQueryType {
  const history = useHistory();
  function useFilterQuery (query: string, value: string, callback: (a: string) => void): void {
    history.push({
      search: `?${query}=${value}`
    });
    callback && callback(value);
  }
  return { useFilterQuery };
}

// Takes the searchKeyword, query key, query value and a callback reference (redux action). It pushes the query to the history and dispatches the action
export function filterQueryWithSearchKeyword (): FilterQueryWithSearchKeywordType {
  const history = useHistory();
  function useFilterQueryWithSearchKeyword (
    searchKeyword: string,
    query: string,
    value: string,
    callback?: (a: string) => void
  ): void {
    history.push({
      pathname: '/search',
      search: `q=${searchKeyword}&${query}=${value}`
    });
    callback && callback(value);
  }
  return { useFilterQueryWithSearchKeyword };
}

export async function usehandleAddToCalendar (
  id: string,
  title: string,
  ref: React.MutableRefObject<any>
): Promise<void> {
  try {
    const resdata = await downloadAddToCalendarAction(id);
    if (resdata.status === undefined || resdata.data === undefined) {
      ref.current.setToastState('Error', 'Failed to download the ics file');
    } else if (resdata.status === 200) {
      const blob = new Blob([resdata.data], { type: 'text/calendar' });
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.setAttribute('download', `${title}.ics`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      ref.current.setToastState('Error', 'Failed to download the ics file');
    }
  } catch (error) {
    ref.current.setToastState('Error', error);
  }
}

// for user profile
export function emailQuery (): UserEmailQueryType {
  const history = useHistory();
  function userEmailQuery (value: string | undefined): void {
    history.push({
      search: `?upn=${value}`
    });
  }
  return { userEmailQuery };
}

/**
 *
 * @param ProfilePictureId
 * Description: Pass User profile Id and Get Whole URL if Id as null or undefined it will Return Default Image
 */
export function getUserProfilePicture (
  ProfilePictureId: UserProfilePicture | null | undefined,
  isOfficePeople = false
): string {
  const avatar = '/assets/avatar.svg';
  if (ProfilePictureId && ProfilePictureId.photo) {
    return `${appEnv.serviceNowUri.baseUrl + ProfilePictureId.photo}.iix`;
  } else {
    if (isOfficePeople) {
      return avatar;
    }
  }
  return avatar;
}

/**
 *
 * @param userSiteCode
 * Description: Pass User profile Id and Get User SiteCode if Id as null or undefined it will Return empty string
 */
export function getUserSiteCode (userSiteCode: UserProfilePicture | null | undefined): string {
  let siteCode = '';
  if (userSiteCode && userSiteCode.siteCode) {
    siteCode = userSiteCode.siteCode;
  }
  return siteCode;
}

export function getKnowledgeBaseUrl (articleId: string): string {
  return articleId ? `${appEnv.serviceNowUri.baseUrl}nav_to.do?uri=/kb_view.do?sys_kb_id=${articleId}` : '';
}

export function getCatalogUrl (sysId: string): string {
  return sysId ? `${appEnv.serviceNowUri.baseUrl}com.glideapp.servicecatalog_cat_item_view.do?sysparm_id=${sysId}` : '';
}

export const extractExtension = (attachment: string): string => {
  const dotIndex = attachment.lastIndexOf('.');
  if (dotIndex >= 0) {
    return attachment.slice(dotIndex + 1);
  }
  return '';
};

/**
 * Normalizing event Data
 * @returns {EventSendInviteModel}
 * @param event
 */
export function normalizeEventData (event: EventModel): EventSendInviteModel {
  const userinfo = getUserInfo();

  const eventSendInvite = {} as EventSendInviteModel;
  eventSendInvite.title = event.title;
  eventSendInvite.username = userinfo.name;

  const start_time = formatDate(event.when_start);
  const end_time = event.when_end == null ? formatDate(event.when_start) : formatDate(event.when_end);
  const time = getEventTime(event.when_duration, event.when_start);
  const event_time = `${time !== '' ? `${decodeURI('%0A%0A%20%20%20%20Time:')} ` + time : ''}`;
  const userName = userinfo.name !== undefined ? userinfo.name : '';

  const bodymessage = SEND_EVENT_BODY_MESSAGE.replace('Event_Start_Date', start_time)
    .replace('Event_End_date', end_time)
    .replace('Event_Location', event && event.where)
    .replace('Event_Time', event_time)
    .replace('User_Name', userName);

  eventSendInvite.emailBody = encodeURIComponent(bodymessage);
  return eventSendInvite;
}
