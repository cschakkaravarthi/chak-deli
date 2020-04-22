import Article from '../models/Article.model';
import Bookmark from '../models/Bookmark.model';
import BoxModel from '../models/Box.model';
import EventModel from '../models/Event.model';
import Link, { LinkGroupItems } from './../models/Link.model';
import Notification from '../models/Notification.model';
import OfficesPeople, { OfficeItem } from './../models/OfficesPeople.model';
import PeopleModel from '../models/People.model';
import Todo from '../models/Todo.model';
import { CatalogSearch } from '../models/Catalog.model';
import { ContactGroup, Department } from '../models/Department.model';
import { DocumentSearch } from '../models/Document.model';
import { KnowledgeSearch } from '../models/KnowledgeBase.model';
import { Manager, Users } from '../models/OrgChart.model';
import { Office, OfficeSearch } from '../models/Office.model';
import { Page, PageSearch } from '../models/Page.model';
import { ResponseData, SuccessfulResponse } from './apiService';
import { Categories, ManualNotification, ManualNotificationListModel, ManualNotifications, NotificationBell } from '../models/ManualNotification.model';
import UserInfoModel, { UserProfileModel, UserProfilePicture, ContactList, UserProfileUpdateResponse, ContactResponse } from '../../shared/models/UserInfo.model';
import { TaxonomyTermModel, VariousContentGroupModel, VariousContentModel } from '../types/contentTypes';
export default class ApiNormalizer {
    /**
     * Sanitation and validation of API response is crucial to prevent bugs and XSS.
     */
    static normalizeContent(response: ResponseData): VariousContentModel[];
    static normalizeGroupedContent(response: ResponseData): VariousContentGroupModel[];
    static normalizeContentSetGroup(response: ResponseData): VariousContentGroupModel | null;
    static normalizeContentSet(response: ResponseData): VariousContentModel | null;
    static validateArticle(content: ResponseData): ResponseData | null;
    static validateEvent(content: ResponseData): ResponseData | null;
    static validateDepartment(content: ResponseData): ResponseData | null;
    static validateOffice(content: ResponseData): ResponseData | null;
    static validatePeople(content: ResponseData): ResponseData | null;
    static validateNotification(content: ResponseData): ResponseData | null;
    static validateLinks(content: ResponseData): ResponseData | null;
    static validateBox(content: ResponseData): ResponseData | null;
    static validateSuccessfulResponse(content: ResponseData): ResponseData | null;
    static normalizeMinisiteLink(untrustedContent: ResponseData): Link | null;
    static normalizeSuccessfulResponse(untrustedContent: ResponseData): SuccessfulResponse | null;
    static normalizeBox(untrustedContent: ResponseData): BoxModel | null;
    /**
     * Convert API response into the data model we want to store in state.
     */
    static normalizeArticle(untrustedContent: ResponseData): Article | null;
    static normalizeTaxonomyTerm(content: ResponseData): TaxonomyTermModel | null;
    static normalizeTaxonomyTerms(content: ResponseData): TaxonomyTermModel[];
    static normalizeEvent(untrustedContent: ResponseData): EventModel | null;
    static normalizeGroupedContacts(contactsString: string): ContactGroup[];
    static normalizeDepartment(untrustedContent: ResponseData): Department | null;
    static normalizePerson(untrustedContent: ResponseData): PeopleModel | null;
    static validatePageSearch(content: ResponseData): ResponseData | null;
    static normalizePageSearch(untrustedContent: ResponseData): PageSearch | null;
    static validateOfficeSearch(content: ResponseData): ResponseData | null;
    static normalizeOfficeSearch(untrustedContent: ResponseData): OfficeSearch | null;
    static validateDocumentSearch(content: ResponseData): ResponseData | null;
    static normalizeDocumentSearch(untrustedContent: ResponseData): DocumentSearch | null;
    static validateKnowledgebaseSearch(content: ResponseData): ResponseData | null;
    static normalizeKnowledgebaseSearch(untrustedContent: ResponseData): KnowledgeSearch | null;
    static validateCatalogSearch(content: ResponseData): ResponseData | null;
    static normalizeCatalogSearch(untrustedContent: ResponseData): CatalogSearch | null;
    static normalizeOffice(untrustedContent: ResponseData): Office | null;
    static normalizeSearch(response: ResponseData): ResponseData;
    static normalizeSearchSuggestions(response: ResponseData): ResponseData;
    static normalizeNotification(untrustedContent: ResponseData): Notification | null;
    static normalizeManualNotification(untrustedContent: ResponseData): ManualNotification | null;
    static validateManualNotification(content: ResponseData): ResponseData | null;
    static dataToObjectManualNotification(contentData: ResponseData): ManualNotification;
    static normalizeManualNotificationFilterList(content: ResponseData): Categories[];
    static normalizeManualNotificationFilters(content: ResponseData): Categories[];
    static normalizeManualNotificationFilterData(untrustedContent: ResponseData): Categories | null;
    static validateManualNotificationFilterList(content: ResponseData): ResponseData | null;
    static normalizeArticles(response: ResponseData): ResponseData;
    static normalizeEvents(response: ResponseData): ResponseData;
    static normalizeFacets(responseFacets: ResponseData): ResponseData;
    static normalizeDepartments(response: ResponseData): Department[];
    static normalizeLink(untrustedContent: ResponseData): LinkGroupItems | null;
    static normalizeQuickLink(untrustedContent: ResponseData): LinkGroupItems | null;
    static normalizeTodo(untrustedContent: ResponseData): Todo | null;
    static normalizeBookmark(untrustedContent: ResponseData): Bookmark | null;
    static normalizeMenuLinks(content: ResponseData): LinkGroupItems[];
    static normalizeUserLinks(trustedContent: ResponseData): string[];
    static normalizeTodos(trustedContent: ResponseData): Todo[];
    static normalizeBookmarks(trustedContent: ResponseData): Bookmark[];
    static normalizePeople(content: ResponseData): PeopleModel[];
    static normalizeManualNotificationList(content: ResponseData): ManualNotificationListModel;
    static normalizeManualNotifications(content: ResponseData): ManualNotifications;
    static normalizeNotificationsBell(content: ResponseData): NotificationBell | null;
    static normalizeNotificationBell(untrustedContent: ResponseData): NotificationBell | null;
    static validateNotificationBell(content: ResponseData): ResponseData | null;
    static normalizeNotificationsArchive(content: ResponseData): boolean | null;
    static normalizeNotificationArchive(untrustedContent: ResponseData): boolean | null;
    static validateNotificationArchive(content: ResponseData): ResponseData | null;
    static normalizeArticleById(content: ResponseData): Article[];
    static normalizeEventById(content: ResponseData): EventModel[];
    static validateUser(content: ResponseData): ResponseData | null;
    static userAndProfileContent(untrustedContent: ResponseData): UserInfoModel | null;
    static userProfilePictureContent(untrustedContent: ResponseData): UserProfilePicture | null;
    static userProfileContent(untrustedContent: ResponseData): UserProfileModel | null;
    static normalizeUser(untrustedContent: ResponseData): UserInfoModel | null;
    static normalizeProfile(untrustedContent: ResponseData): UserInfoModel | null;
    static normalizeUsers(content: ResponseData): UserInfoModel[];
    static normalizePage(response: ResponseData): Page | null;
    static normalizeUserProfile(untrustedContent: ResponseData): UserProfileModel | null;
    static normalizeUserProfilePicture(untrustedContent: ResponseData): UserProfilePicture | null;
    static normalizeOrgChart(content: ResponseData): Users;
    static normalizeSubordinates(untrustedContent: ResponseData): Manager | null;
    static validateSubordinates(content: ResponseData): ResponseData | null;
    static normalizeOfficesPeoples(content: ResponseData): OfficesPeople[];
    static normalizeOfficesPeople(untrustedContent: ResponseData): OfficesPeople | null;
    static normalizeOfficeContents(content: ResponseData): OfficeItem[];
    static normalizeSetUserProfileData(content: any): any;
    static normalizeOfficeContent(content: ResponseData): OfficeItem | null;
    static validateOfficesPeople(content: ResponseData): ResponseData | null;
    static validateOfficeContent(content: ResponseData): ResponseData | null;
    static normalizeUserProfileUpdate(content: ResponseData): UserProfileUpdateResponse;
    static normalizeMyContacts(content: ResponseData): ContactList | null;
    static normalizeMyContactsResponse(content: ResponseData): ContactList[];
    static normalizeUsersByEmail(content: ResponseData): UserInfoModel[];
    static normalizeProfilepicDeleteResponse(content: ResponseData): ContactResponse | null;
}
//# sourceMappingURL=apiNormalizer.d.ts.map