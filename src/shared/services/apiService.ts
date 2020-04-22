import ApiClient from './apiClient';
import ApiNormalizer from './apiNormalizer';
import Article from '../models/Article.model';
import DrupalIds from '../../drupalIds';
import EventModel from '../models/Event.model';
import Link, { LinkGroupItems } from '../models/Link.model';
import Notification, { AppreciationCardNotificationModel as AlertModel } from '../models/Notification.model';
import PeopleModel from '../models/People.model';
import UserInfoModel, {
  UserProfileModel,
  UserProfilePicture,
  ContactResponse,
  ContactList,
  UserProfileUpdateResponse,
  AddToContactResponse
} from '../models/UserInfo.model';
import { Categories, ManualNotificationListModel, NotificationBell } from '../models/ManualNotification.model';
import { ContentWithFacet } from '../types/contentWithFacets';
import { Department } from '../models/Department.model';
import { Office } from '../models/Office.model';
import { Label } from '../models/Label.model';
import OfficesPeople from '../models/OfficesPeople.model';
import { Page } from '../models/Page.model';
import { SearchResultState } from '../types/searchResultTypes';
import { Users } from '../models/OrgChart.model';
import Bookmark from '../models/Bookmark.model';
import Todo from '../models/Todo.model';
import {
  ContentQueryParamsType,
  FacetedContentGroupModel,
  VariousContentGroupModel,
  FacetedContentModel
} from '../types/contentTypes';
import { AppreciationCardTemplate } from '../models/AppreciationCards.model';
import { NewAppreciationCardForm } from '../types/appreciationTypes';
import { AxiosRequestConfig } from 'axios';
import { ApiErrorModel } from '../models/Error.model';
import { SystemApplicationItem } from '../models/SystemsApplications.model';
import { toQueryString } from '../../utils/content';

export interface ResponseData {
  [key: string]: any;
}

export interface SuccessfulResponse {
  success: boolean;
}

export default class ApiService {
  static makeApiCall = <T>(
    url: string,
    normalizeCallback: <T>(d: ResponseData) => T | any,
    callback: (d: T) => void,
    errorCallBack?: (a: ApiErrorModel) => void,
    method = 'get',
    data = {},
    header = { 'Content-Type': 'application/json;charset=utf-8' }
    // optionalErrorHandler = true
  ): Promise<void> => {
    const errorHandler = (error: ApiErrorModel): void => {
      /* Commenting the global error500 route logic temporarily */
      // if (!optionalErrorHandler) {
      //   window.location.assign('/error500');
      // } else {
      errorCallBack && errorCallBack(error);
      // }
      console.error(`ApiClient ${url}`, error);
    };

    const config: AxiosRequestConfig = {};

    if (method === 'post') {
      config.headers = header;
      return ApiClient.post(url, data, config)
        .then(res => callback(normalizeCallback(res.data)))
        .catch(error => errorHandler(error));
    } else if (method === 'delete') {
      return ApiClient.delete(url, data)
        .then(res => callback(normalizeCallback(res.data)))
        .catch(error => errorHandler(error));
    } else if (method === 'patch') {
      return ApiClient.patch(url, data)
        .then(res => callback(normalizeCallback(res.data)))
        .catch(error => errorHandler(error));
    } else {
      return ApiClient.get(url)
        .then(res => callback(normalizeCallback(res.data)))
        .catch(error => errorHandler(error));
    }
  };

  static archiveAppreciationAlert = (
    callback: (a: SuccessfulResponse) => void,
    errorCallback: (error: ApiErrorModel) => void,
    cardId: string
  ): Promise<void> => {
    return ApiService.makeApiCall<SuccessfulResponse>(
      'appreciationCard/archive',
      ApiNormalizer.normalizeSuccessfulResponse,
      callback,
      errorCallback,
      'post',
      { cardId }
    );
  };

  static getContent = (
    callback: (groupedContent: FacetedContentModel) => void,
    params: ContentQueryParamsType,
    limit?: number,
    offset?: number
  ): Promise<void> => {
    // Set some sensible defaults, but override them with whatever we get passed.
    const query = {
      type: 'link,page,document,article,event',
      sort: 'alphabetic',
      limit: limit || '',
      offset: offset || '',
      page: limit && offset !== undefined ? Math.floor(offset / limit) + 1 : '', // @TODO: API should really use offset, not page number.
      ...params
    };
    return ApiService.makeApiCall(`content?${toQueryString(query)}`, ApiNormalizer.normalizeContent, callback);
  };

  static getGroupedContent = (
    callback: (groupedContent: FacetedContentGroupModel) => void,
    params: ContentQueryParamsType,
    limit?: number,
    offset?: number
  ): Promise<void> => {
    // Set some sensible defaults, but override them with whatever we get passed.
    const query = {
      type: 'link,page,document,article,event',
      group: 'category',
      sort: 'alphabetic',
      limit: limit,
      page: limit && offset !== undefined ? Math.floor(offset / limit) : '', // @TODO: API should really use offset, not page number.
      ...params
    };
    return ApiService.makeApiCall(
      `grouped_content?${toQueryString(query)}`,
      ApiNormalizer.normalizeGroupedContent,
      callback
    );
  };

  static getArticles = (
    callback: (a: ContentWithFacet) => void,
    page?: number,
    limit?: number,
    sort?: string,
    facet?: string,
    selectedFacet?: string
  ): Promise<void> => {
    const queryDetails = {
      page,
      limit,
      sort,
      facet: facet || null,
      article_category: selectedFacet || null,
      type: 'article'
    };
    return ApiService.makeApiCall(`content?${toQueryString(queryDetails)}`, ApiNormalizer.normalizeArticles, callback);
  };

  static getPeople = (
    callback: (a: PeopleModel[]) => void,
    sitecode: string,
    startsWith?: string,
    page?: string | number,
    limit?: string | number
  ): Promise<void> => {
    const queryDetails = {
      page,
      limit,
      sitecode,
      startsWith
    };

    return ApiService.makeApiCall<PeopleModel[]>(
      `officeusers?${toQueryString(queryDetails)}`,
      ApiNormalizer.normalizePeople,
      callback
    );
  };

  static getEvents = (
    callback: (a: ContentWithFacet) => void,
    page?: number,
    limit?: number,
    sort?: string,
    facet?: string,
    selectedFacet?: string
  ): Promise<void> => {
    const queryDetails = {
      page,
      limit,
      sort,
      facet: facet || null,
      event_category: selectedFacet || null,
      type: 'event'
    };
    return ApiService.makeApiCall(`content?${toQueryString(queryDetails)}`, ApiNormalizer.normalizeEvents, callback);
  };

  static makeApiCallWithoutCallback = (url: string, errorCallBack?: (a: ApiErrorModel) => void): Promise<any> =>
    ApiClient.get(url)
      .then()
      .catch(error => {
        errorCallBack && errorCallBack(error);
        console.error(`ApiClient ${url}`, error);
        if (error.response !== undefined) {
          return error.response;
        }
        return error;
      });

  static getArticleById = (callback: (a: Article[]) => void, id: string): Promise<void> => {
    return ApiService.makeApiCall<Article[]>(`articles?id=${id}`, ApiNormalizer.normalizeArticleById, callback);
  };

  static getEventById = (callback: (a: EventModel[]) => void, id: string): Promise<void> => {
    return ApiService.makeApiCall<EventModel[]>(`events?id=${id}`, ApiNormalizer.normalizeEventById, callback);
  };

  static getNotifications = (callback: (a: Notification[]) => void): Promise<void> => {
    return ApiService.makeApiCall<Notification[]>(
      'notifications',
      ApiNormalizer.normalizeManualNotificationList,
      callback
    );
  };

  static getManualNotifications = (
    callback: (a: ManualNotificationListModel) => void,
    newOrArchive: string,
    id: string,
    type: string
  ): Promise<void> => {
    return ApiService.makeApiCall<ManualNotificationListModel>(
      `notifications/${newOrArchive}?alert_type=${id}&type=${type}`,
      ApiNormalizer.normalizeManualNotificationList,
      callback
    );
  };

  static getManualNotificationsFilterList = (callback: (a: Categories[]) => void): Promise<void> => {
    return ApiService.makeApiCall<Categories[]>(
      'content?type=notification&facet=alert_type',
      ApiNormalizer.normalizeManualNotificationFilterList,
      callback
    );
  };

  static getNotificationsBell = (callback: (a: NotificationBell) => void): Promise<void> => {
    return ApiService.makeApiCall<NotificationBell>(
      'notifications/count',
      ApiNormalizer.normalizeNotificationsBell,
      callback
    );
  };

  static setNotificationsApprove = async (
    callback: (success: string) => void,
    errorback: (error: boolean) => void,
    sysId: string
  ): Promise<void> => {
    return ApiService.makeApiCall(
      'request/approve',
      ApiNormalizer.normalizeNotificationsRequest,
      callback,
      () => {
        errorback(false);
      },
      'patch',
      { sys_id: sysId }
    );
  };

  static setNotificationsReject = async (
    callback: (success: string) => void,
    errorback: (error: boolean) => void,
    sysId: string,
    message: string
  ): Promise<void> => {
    return ApiService.makeApiCall(
      'request/reject',
      ApiNormalizer.normalizeNotificationsRequest,
      callback,
      () => {
        errorback(false);
      },
      'patch',
      { sys_id: sysId, comments: message }
    );
  };

  static getUserByNetworkId = (callback: (a: UserInfoModel[]) => void, userID: string): Promise<void> => {
    return ApiService.makeApiCall<UserInfoModel[]>(`users?networkID=${userID}`, ApiNormalizer.normalizeUsers, callback);
  };

  static getUserByEmail = (callback: (a: UserInfoModel[]) => void, email: string): Promise<void> => {
    return ApiService.makeApiCall<UserInfoModel[]>(
      `users?email=${email}`,
      ApiNormalizer.normalizeUsersByEmail,
      callback
    );
  };

  static getProfile = (callback: (a: UserInfoModel) => void): Promise<void> => {
    return ApiService.makeApiCall<UserInfoModel>('profile', ApiNormalizer.normalizeProfile, callback);
  };

  static getMenuLinks = (callback: (a: LinkGroupItems[]) => void): Promise<void> => {
    return ApiService.makeApiCall<LinkGroupItems[]>(
      `grouped_content?type=link&group=category&category=${DrupalIds.categories.allLinks}&limit=0&sort=alphabetic`,
      ApiNormalizer.normalizeGroupedContent,
      callback
    );
  };

  static getUserLinks = (callback: (userLinksIds: Link[]) => void): Promise<void> => {
    return ApiService.makeApiCall('user-links', ApiNormalizer.normalizeUserLinks, callback);
  };

  static getTodos = (callback: (todos: Todo[]) => void): Promise<void> => {
    return ApiService.makeApiCall('todo', ApiNormalizer.normalizeTodos, callback);
  };

  static setTodo = (callback: (success: boolean) => void, text: string): Promise<void> => {
    return ApiService.makeApiCall(
      'todo',
      d => {
        return d.success;
      },
      callback,
      () => {},
      'post',
      { todo: text }
    );
  };

  static deleteTodo = (callback: (success: boolean) => void, identifier: string): Promise<void> => {
    return ApiService.makeApiCall(
      'todo/delete',
      d => {
        return d.success;
      },
      callback,
      () => {},
      'post',
      {
        identifier
      }
    );
  };

  static getBookmarks = (
    callback: (bookmarks: Bookmark[]) => void,
    errorCallback: (a: ApiErrorModel) => void
  ): Promise<void> => {
    return ApiService.makeApiCall('bookmark', ApiNormalizer.normalizeBookmarks, callback, errorCallback);
  };

  static setBookmark = (callback: (success: boolean) => void, title: string, url: string): Promise<void> => {
    return ApiService.makeApiCall(
      'bookmark',
      d => {
        return d.success;
      },
      callback,
      () => {},
      'post',
      { title, url }
    );
  };

  static deleteBookmark = (callback: (success: boolean) => void, identifier: string): Promise<void> => {
    return ApiService.makeApiCall(
      'bookmark/delete',
      d => {
        return d.success;
      },
      callback,
      () => {},
      'post',
      {
        identifier
      }
    );
  };

  static getMinisiteLinks = (
    callback: (minisiteLinks: VariousContentGroupModel[]) => void,
    cat: string
  ): Promise<void> => {
    return ApiService.makeApiCall(
      `grouped_content?type=link,page,document,article,event&group=category&category=${cat}&sort=alphabetic`,
      ApiNormalizer.normalizeGroupedContent,
      callback
    );
  };

  static getPages = (callback: (pages: Page[]) => void, categoryId: string | null = null): Promise<void> => {
    return ApiService.makeApiCall(
      categoryId ? `content?type=page&category=${categoryId}` : 'content?type=page',
      ApiNormalizer.normalizeContent,
      callback
    );
  };

  static getPage = (callback: (pages: Page) => void, pageId: number): Promise<void> => {
    return ApiService.makeApiCall(`page?id=${pageId}`, ApiNormalizer.normalizePage, callback);
  };

  static getDepartment = (callback: (department: Department) => void, departmentId: number): Promise<void> => {
    return ApiService.makeApiCall(`department?id=${departmentId}`, ApiNormalizer.normalizeDepartment, callback);
  };

  static setUserLinks = (callback: (success: boolean) => void, links: string[]): Promise<void> => {
    return ApiService.makeApiCall('user-links', ApiNormalizer.normalizeUserLinks, callback, () => {}, 'post', {
      links
    });
  };

  static getHomeArticles = (
    callback: (a: ResponseData) => void,
    limit: string,
    sort: string,
    owner?: string
  ): Promise<void> =>
    ApiService.makeApiCall<Article[]>(
      `content?type=article&limit=${limit}&sort=${sort}${owner ? `&owner=${owner}` : ''}`,
      ApiNormalizer.normalizeArticles,
      callback
    );

  static getHomeEvents = (callback: (a: ResponseData) => void, owner?: string): Promise<void> =>
    ApiService.makeApiCall<EventModel[]>(
      `content?type=event&limit=3&sort=upcoming${owner ? `&owner=${owner}` : ''}`,
      ApiNormalizer.normalizeEvents,
      callback
    );

  static getSearchResults = (
    callback: (a: SearchResultState) => void,
    errorCallback: (a: ApiErrorModel) => void,
    page?: number,
    query?: string,
    limit?: number,
    type?: string,
    facet?: string
  ): Promise<void> => {
    const queryDetails = {
      page: page || 1,
      query,
      limit,
      type: type || null,
      facet: facet || null
    };

    const queryParam = toQueryString(queryDetails);

    return ApiService.makeApiCall(`search?${queryParam}`, ApiNormalizer.normalizeSearch, callback, errorCallback);
  };

  static getSearchSuggestions = (
    callback: (a: ResponseData) => void,
    query?: string,
    limit?: string,
    category?: string
  ): Promise<void> => {
    const queryDetails = {
      query,
      limit,
      category
    };
    const queryParam = toQueryString(queryDetails);
    return ApiService.makeApiCall(`suggest?${queryParam}`, ApiNormalizer.normalizeSearchSuggestions, callback);
  };

  static getLabel = (callback: (label: Label) => void, labelId: number): Promise<void> => {
    return ApiService.makeApiCall(`label?id=${labelId}`, ApiNormalizer.normalizeLabel, callback);
  };

  static getUserProfile = (
    callback: (a: UserProfileModel) => void,
    errorCallback: (a: ApiErrorModel) => void,
    username?: string
  ): Promise<void> => {
    return ApiService.makeApiCall<UserProfileModel>(
      `user?email=${username}`,
      ApiNormalizer.normalizeUserProfile,
      callback,
      errorCallback,
      'get'
      // {},
      // { 'Content-Type': 'application/json;charset=utf-8' },
      // false
    );
  };

  static getUserProfilePicture = (
    callback: (a: UserProfilePicture) => void,
    errorCallback: (a: ApiErrorModel) => void,
    username?: string
  ): Promise<void> => {
    return ApiService.makeApiCall<UserProfilePicture>(
      `profilepicture?email=${username}`,
      ApiNormalizer.normalizeUserProfilePicture,
      callback,
      errorCallback
    );
  };

  static getOffice = (
    callback: (a: Office) => void,
    errorCallback: (a: ApiErrorModel) => void,
    officeId?: string
  ): Promise<void> => {
    return ApiService.makeApiCall<Office>(
      `office?id=${officeId}`,
      ApiNormalizer.normalizeOffice,
      callback,
      errorCallback
    );
  };

  static getAppreciationData = (
    callback: (a: AlertModel[]) => void,
    errorCallback: (a: ApiErrorModel) => void,
    cardType?: string,
    limit?: string,
    offsetKey?: string
  ): Promise<void> => {
    return ApiService.makeApiCall<AlertModel[]>(
      `appreciationCard?cardType=${cardType || 'all'}${limit ? `&limit=${limit}` : ''}${
        offsetKey ? `&offsetKey=${offsetKey}` : ''
      }`,
      ApiNormalizer.normalizeAppreciationCards,
      callback,
      errorCallback
    );
  };

  static setNotificationsArchive = async (
    callback: (success: boolean) => void,
    errorback: (error: boolean) => void,
    drupal_id: number | undefined
  ): Promise<void> => {
    return ApiService.makeApiCall(
      `notifications/archive?drupalId=${drupal_id}`,
      ApiNormalizer.normalizeNotificationsArchive,
      callback,
      () => {
        errorback(false);
      },
      'post'
    );
  };

  static getFacilities = (
    callback: (a: Link[]) => void,
    errorCallback: (a: ApiErrorModel) => void,
    categoryId?: string
  ): Promise<void> => {
    return ApiService.makeApiCall<Link[]>(
      `content?type=page,link,box&category=${categoryId}`,
      ApiNormalizer.normalizeContent,
      callback,
      errorCallback
    );
  };

  static getUserOrgChart = (
    callback: (a: Users) => void,
    errorCallback: (a: ApiErrorModel) => void,
    email: string
  ): Promise<void> => {
    return ApiService.makeApiCall<Users>(
      `chart?email=${email}`,
      ApiNormalizer.normalizeOrgChart,
      callback,
      errorCallback
    );
  };

  static downloadAddToCalendarService = (id: string): Promise<any> => {
    return ApiService.makeApiCallWithoutCallback(`events?id=${id}&isAddtoCalender=true`);
  };

  static getEmployeeServices = (callback: (a: FacetedContentModel) => void): Promise<void> => {
    return ApiService.makeApiCall<FacetedContentModel>(
      `content?type=page,link&category=${DrupalIds.categories.employeeServices}&sort=alphabetic`,
      ApiNormalizer.normalizeContent,
      callback
    );
  };

  static getDepartments = (callback: (a: Department[]) => void): Promise<void> => {
    return ApiService.makeApiCall<Department[]>(
      `content?type=department,link&sort=alphabetic&category=${DrupalIds.categories.departmentsPage}`,
      ApiNormalizer.normalizeContent,
      callback
    );
  };

  static getQuickTools = (callback: (a: FacetedContentModel) => void): Promise<void> => {
    return ApiService.makeApiCall<FacetedContentModel>(
      `content?type=link&category=${DrupalIds.categories.quickTools}&sort=alphabetic`,
      ApiNormalizer.normalizeContent,
      callback
    );
  };

  static getOfficesPeople = (callback: (a: OfficesPeople[]) => void): Promise<void> => {
    return ApiService.makeApiCall<OfficesPeople[]>(
      `grouped_content?type=office&group=category&category=${DrupalIds.categories.offices}&sort=alphabetic`,
      ApiNormalizer.normalizeOfficesPeoples,
      callback
    );
  };

  static toggleContentLike = (
    callback: (a: ResponseData) => void,
    contentType: string,
    contentId: number,
    likedByUser: boolean
  ): Promise<void> => {
    const method = likedByUser ? 'post' : 'delete';
    return ApiService.makeApiCall<SuccessfulResponse>(
      `like?contentType=${contentType}&contentId=${contentId}`,
      ApiNormalizer.normalizeSuccessfulResponse,
      callback,
      undefined,
      method
    );
  };

  static sendAppreciationCard = (
    callback: (response: SuccessfulResponse) => void,
    errorCallback: (error: ApiErrorModel) => void,
    formDetails: NewAppreciationCardForm
  ): Promise<void> => {
    return ApiService.makeApiCall('appreciationCard', res => res, callback, errorCallback, 'post', formDetails);
  };

  static updateUserProfileDetails = (
    callback: (a: UserProfileUpdateResponse) => void,
    errorCallback: (a: ApiErrorModel) => void,
    userDetails: Omit<UserProfileModel, 'title'>
  ): Promise<void> => {
    return ApiService.makeApiCall(
      'user',
      ApiNormalizer.normalizeUserProfileUpdate,
      callback,
      errorCallback,
      'patch',
      userDetails
    );
  };

  static postAddToContact = (
    callback: (response: AddToContactResponse) => void,
    errorCallback: () => void,
    email: string | undefined
  ): Promise<void> => {
    return ApiService.makeApiCall(
      'contact',
      res => res,
      callback,
      errorCallback,
      'post',
      { email: email }
      // { 'Content-Type': 'application/json;charset=utf-8' },
      // false
    );
  };

  static fetchMyContactsList = (
    callback: (a: ContactList) => void,
    errorCallback: (a: ApiErrorModel) => void
  ): Promise<void> => {
    return ApiService.makeApiCall<ContactList>(
      'contact',
      ApiNormalizer.normalizeMyContactsResponse,
      callback,
      errorCallback
    );
  };

  static removeContactFromList = (
    callback: (a: ContactResponse) => void,
    errorCallback: (a: ApiErrorModel) => void,
    email?: string
  ): Promise<void> => {
    return ApiService.makeApiCall<ContactResponse>(
      'contact/delete',
      ApiNormalizer.normalizeMyContacts,
      callback,
      errorCallback,
      'post',
      { email: email }
    );
  };

  static uploadUserProfilePic = (
    callback: (a: ContactResponse) => void,
    errorCallback: (a: ApiErrorModel) => void,
    file: File
  ): Promise<void> => {
    const photo: FormData = new FormData();
    photo.append('photo', file, file.name);
    return ApiService.makeApiCall<ContactResponse>(
      'profilepicture',
      ApiNormalizer.normalizeMyContacts,
      callback,
      errorCallback,
      'post',
      photo,
      { 'Content-Type': 'multipart/form-data' }
    );
  };

  static getLabels = (callback: (a: Label[]) => void): Promise<void> => {
    return ApiService.makeApiCall<Label[]>(
      `content?type=label,link&sort=alphabetic&category=${DrupalIds.categories.labelsPage}`,
      ApiNormalizer.normalizeContent,
      callback
    );
  };

  static removeUserProfilePic = (
    callback: (a: ContactResponse) => void,
    errorCallback: (a: ApiErrorModel) => void
  ): Promise<void> => {
    return ApiService.makeApiCall<ContactResponse>(
      'profilepicture',
      ApiNormalizer.normalizeProfilepicDeleteResponse,
      callback,
      errorCallback,
      'delete'
    );
  };

  static retrieveAppreciationCardTemplates = (
    callback: (res: AppreciationCardTemplate[]) => void,
    errorCallback: (error: ApiErrorModel) => void
  ): Promise<void> => {
    return ApiService.makeApiCall(
      'appreciationCard/templates',
      ApiNormalizer.normalizeAppreciationCardTemplate,
      callback,
      errorCallback
    );
  };

  static getSystemsApplications = (
    callback: (res: SystemApplicationItem[]) => void,
    errorCallback: (error: ApiErrorModel) => void,
    filterBy?: string
  ): Promise<void> => {
    return ApiService.makeApiCall(
      `applications${filterBy ? '?startsWith=' + filterBy : ''}`,
      ApiNormalizer.normalizeSystemsApplications,
      callback,
      errorCallback
    );
  };
}
