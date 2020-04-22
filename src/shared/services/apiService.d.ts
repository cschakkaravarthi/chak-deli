import Article from '../models/Article.model';
import EventModel from '../models/Event.model';
import Link, { LinkGroupItems } from '../models/Link.model';
import Notification from '../models/Notification.model';
import PeopleModel from '../models/People.model';
import UserInfoModel, { UserProfileModel, UserProfilePicture, ContactResponse, ContactList, UserProfileUpdateResponse, AddToContactResponse } from '../models/UserInfo.model';
import { ManualNotificationListModel, NotificationBell } from '../models/ManualNotification.model';
import { ContentWithFacet } from '../types/contentWithFacets';
import { Department } from '../models/Department.model';
import { Office } from '../models/Office.model';
import OfficesPeople from '../models/OfficesPeople.model';
import { Page } from '../models/Page.model';
import { SearchResultState } from '../types/searchResultTypes';
import { Users } from '../models/OrgChart.model';
import Bookmark from '../models/Bookmark.model';
import Todo from '../models/Todo.model';
import { VariousContentGroupModel, VariousContentModel } from '../types/contentTypes';
export interface ResponseData {
    [key: string]: any;
}
export interface SuccessfulResponse {
    success: boolean;
}
export default class ApiService {
    static makeApiCall: <T>(url: string, normalizeCallback: <T_1>(d: ResponseData) => any, callback: (d: T) => any, errorCallBack?: ((a: string) => any) | undefined, method?: string, data?: {}, header?: {
        'Content-Type': string;
    }) => Promise<void>;
    static getContent: (callback: (groupedContent: VariousContentModel[]) => void, filterId: string, filterField?: string | undefined, allowedTypes?: string | undefined, sort?: string | undefined) => Promise<void>;
    static getGroupedContent: (callback: (groupedContent: VariousContentGroupModel[]) => void, filterId: string, filterField?: string | undefined, allowedTypes?: string | undefined, group?: string | undefined, sort?: string | undefined) => Promise<void>;
    static getArticles: (callback: (a: ContentWithFacet) => void, page?: number | undefined, limit?: number | undefined, sort?: string | undefined, facet?: string | undefined, selectedFacet?: string | undefined) => Promise<void>;
    static getPeople: (callback: (a: PeopleModel[]) => void, sitecode: string, startsWith?: string | undefined, page?: string | number | undefined, limit?: string | number | undefined) => Promise<void>;
    static getEvents: (callback: (a: ContentWithFacet) => void, page?: number | undefined, limit?: number | undefined, sort?: string | undefined, facet?: string | undefined, selectedFacet?: string | undefined) => Promise<void>;
    static makeApiCallWithoutCallback: (url: string, errorCallBack?: ((a: string) => any) | undefined) => Promise<any>;
    static getArticleById: (callback: (a: Article[]) => void, id: string) => Promise<void>;
    static getEventById: (callback: (a: EventModel[]) => void, id: string) => Promise<void>;
    static getNotifications: (callback: (a: Notification[]) => void) => Promise<void>;
    static getManualNotifications: (callback: (a: ManualNotificationListModel) => void, id: string) => Promise<void>;
    static getManualNotificationsFilterList: (callback: (a: import("../types/contentTypes").TaxonomyTermModel[]) => void) => Promise<void>;
    static getNotificationsBell: (callback: (a: NotificationBell) => void) => Promise<void>;
    static setNotificationsArchive: (callback: (success: boolean) => void, errorback: (error: boolean) => void, drupal_id: number | undefined) => Promise<void>;
    static getUserByNetworkId: (callback: (a: UserInfoModel[]) => void, userID: string) => Promise<void>;
    static getUserByEmail: (callback: (a: UserInfoModel[]) => void, email: string) => Promise<void>;
    static getProfile: (callback: (a: UserInfoModel) => void) => Promise<void>;
    static getMenuLinks: (callback: (a: LinkGroupItems[]) => void) => Promise<void>;
    static getUserLinks: (callback: (userLinksIds: Link[]) => void) => Promise<void>;
    static getTodos: (callback: (todos: Todo[]) => void) => Promise<void>;
    static setTodo: (callback: (success: boolean) => void, text: string) => Promise<void>;
    static deleteTodo: (callback: (success: boolean) => void, identifier: string) => Promise<void>;
    static getBookmarks: (callback: (bookmarks: Bookmark[]) => void) => Promise<void>;
    static setBookmark: (callback: (success: boolean) => void, title: string, url: string) => Promise<void>;
    static deleteBookmark: (callback: (success: boolean) => void, identifier: string) => Promise<void>;
    static getMinisiteLinks: (callback: (minisiteLinks: VariousContentGroupModel[]) => void, cat: string) => Promise<void>;
    static getPages: (callback: (pages: Page[]) => void, categoryId?: string | null) => Promise<void>;
    static getPage: (callback: (pages: Page) => void, pageId: number) => Promise<void>;
    static getDepartment: (callback: (department: Department) => void, departmentId: number) => Promise<void>;
    static setUserLinks: (callback: (success: boolean) => void, links: string[]) => Promise<void>;
    static getHomeArticles: (callback: (a: ResponseData) => void, limit: string, sort: string, owner?: string | undefined) => Promise<void>;
    static getHomeEvents: (callback: (a: ResponseData) => void, owner?: string | undefined) => Promise<void>;
    static getSearchResults: (callback: (a: SearchResultState) => void, errorCallback: (a: string) => void, page?: number | undefined, query?: string | undefined, limit?: number | undefined, type?: string | undefined, facet?: string | undefined) => Promise<void>;
    static getSearchSuggestions: (callback: (a: ResponseData) => void, query?: string | undefined, limit?: number | undefined) => Promise<void>;
    static getUserProfile: (callback: (a: UserProfileModel) => void, errorCallback: (a: string) => void, username?: string | undefined) => Promise<void>;
    static getUserProfilePicture: (callback: (a: UserProfilePicture) => void, errorCallback: (a: string) => void, username?: string | undefined) => Promise<void>;
    static getOffice: (callback: (a: Office) => void, errorCallback: (a: string) => void, officeId?: string | undefined) => Promise<void>;
    static getFacilities: (callback: (a: Link[]) => void, errorCallback: (a: string) => void, categoryId?: string | undefined) => Promise<void>;
    static getUserOrgChart: (callback: (a: Users) => void, errorCallback: (a: string) => void, email: string) => Promise<void>;
    static downloadAddToCalendarService: (id: string) => Promise<any>;
    static getEmployeeServices: (callback: (a: VariousContentModel[]) => void) => Promise<void>;
    static getDepartments: (callback: (a: Department[]) => void) => Promise<void>;
    static getQuickTools: (callback: (a: Link[]) => void) => Promise<void>;
    static getOfficesPeople: (callback: (a: OfficesPeople[]) => void) => Promise<void>;
    static toggleContentLike: (callback: (a: ResponseData) => void, contentType: string, contentId: number, likedByUser: boolean) => Promise<void>;
    static updateUserProfileDetails: (callback: (a: UserProfileUpdateResponse) => void, errorCallback: (a: string) => void, userDetails: Pick<UserProfileModel, "email" | "photo" | "error" | "networkID" | "department" | "profilePicture" | "lastName" | "firstName" | "fullName" | "jobLocation" | "companyName" | "profitCenter" | "desk" | "officeNumber" | "mobileNumber" | "nickname" | "birthday" | "birthMonth" | "anniversaryDay" | "anniversaryMonth" | "languagesSpoken" | "professionalSkills" | "currentlyWorking" | "aboutMe" | "hideMobileNumberOnProfile" | "avatar">) => Promise<void>;
    static postAddToContact: (callback: (response: AddToContactResponse) => void, errorCallback: () => void, email: string | undefined) => Promise<void>;
    static fetchMyContactsList: (callback: (a: ContactList) => void, errorCallback: (a: string) => void) => Promise<void>;
    static removeContactFromList: (callback: (a: ContactResponse) => void, errorCallback: (a: string) => void, email?: string | undefined) => Promise<void>;
    static uploadUserProfilePic: (callback: (a: ContactResponse) => void, errorCallback: (a: string) => void, file: File) => Promise<void>;
    static removeUserProfilePic: (callback: (a: ContactResponse) => void, errorCallback: (a: string) => void) => Promise<void>;
}
//# sourceMappingURL=apiService.d.ts.map