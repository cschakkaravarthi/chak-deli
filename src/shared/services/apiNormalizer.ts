import Article from '../models/Article.model';
import Bookmark from '../models/Bookmark.model';
import BoxModel from '../models/Box.model';
import DOMPurify from 'dompurify';
import EventModel from '../models/Event.model';
import get from 'lodash.get';
import set from 'lodash.set';
import images from '../../images/images';
import Link, { LinkGroupItems } from './../models/Link.model';
import Notification, { AppreciationCardNotificationModel as AlertModel } from '../models/Notification.model';
import OfficesPeople, { OfficeItem } from './../models/OfficesPeople.model';
import PeopleModel from '../models/People.model';
import Todo from '../models/Todo.model';
import { CatalogSearch } from '../models/Catalog.model';
import { ContactGroup, Department } from '../models/Department.model';
import { DocumentSearch } from '../models/Document.model';
import { handleUri, handleUriSet, handleUriForIcons } from '../../utils/imageUrlHandler';
import { KnowledgeSearch } from '../models/KnowledgeBase.model';
import { Manager, Users } from '../models/OrgChart.model';
import { Office, OfficeSearch } from '../models/Office.model';
import { Page, PageSearch } from '../models/Page.model';
import { ResponseData, SuccessfulResponse } from './apiService';
import {
  Categories,
  ManualNotification,
  ManualNotificationListModel,
  ManualNotifications,
  NotificationBell
} from '../models/ManualNotification.model';
import UserInfoModel, {
  UserProfileModel,
  UserProfilePicture,
  ContactList,
  UserProfileUpdateResponse,
  ContactResponse
} from '../../shared/models/UserInfo.model';
import {
  FacetedContentGroupModel,
  FacetedContentModel,
  FacetsModel,
  TaxonomyTermModel,
  VariousContentGroupModel,
  VariousContentModel
} from '../types/contentTypes';
import { AppreciationCardTemplate } from '../../shared/models/AppreciationCards.model';
import { SearchSuggestionSuccessResponse } from '../../shared/models/SearchResult.model';

import { appEnv } from '../../utils/customHooks';
import { Label } from '../models/Label.model';
import { SystemApplicationItem } from '../../shared/models/SystemsApplications.model';

const domPurify = DOMPurify();

const summaryMaxLength = 250;

const fullOrSummary = (content: object): string => {
  let summary = get(content, 'body_summary') || get(content, 'field_summary') || get(content, 'summary');
  if (!summary) {
    summary = domPurify.sanitize(get(content, 'body_full') || get(content, 'body'), {
      ALLOWED_TAGS: ['#text']
    });
  }

  if (summary && summary.length > summaryMaxLength) {
    summary = summary.substr(0, summaryMaxLength);
    summary = summary.substr(0, Math.min(summary.length, summary.lastIndexOf(' ')));
    summary = `${summary} ...`;
  }

  return summary;
};

const getAlignmentClass = (dataAlign: string | null): string => {
  if (dataAlign === 'left') {
    return 'float-left';
  } else if (dataAlign === 'right') {
    return 'float-right';
  } else if (dataAlign === 'center') {
    return 'd-block mx-auto';
  } else {
    return '';
  }
};

const getSizeClass = (dataSize: string | null): string => {
  if (dataSize === 'half') {
    return 'w-50';
  } else {
    return 'w-100';
  }
};

const convertToEmbeddedImage = (element: Element): string => {
  const alignClass = getAlignmentClass(element.getAttribute('data-align'));
  const sizeClass = getSizeClass(element.getAttribute('data-size'));
  const caption = element.getAttribute('data-caption');
  const captionElement = caption ? `<div class="embedded-image-caption text-center">${caption}</div>` : '';

  return (
    `<div class="embedded-image ${alignClass} ${sizeClass}">` +
    `<img alt="${element.getAttribute('alt') || ''}" src="${handleUri(
      element.getAttribute('data-uri')
    )}" class='w-100 p-1' />` +
    `${captionElement}` +
    '</div>'
  );
};

const parseDrupalEntity = (drupalEntity: string): string | null => {
  try {
    if (drupalEntity) {
      const parser = new DOMParser();
      const parsedEntity = parser.parseFromString(drupalEntity, 'text/xml');
      const element = parsedEntity.getElementsByTagName('drupal-media')[0];
      return convertToEmbeddedImage(element);
    }
    return null;
  } catch (e) {
    return null;
  }
};

const transformArticleFullBody = (fullBody: string): string => {
  let tempFullBody: string | null = fullBody;
  let continueLooking = true;
  if (fullBody) {
    while (continueLooking) {
      const beginIndex = tempFullBody.indexOf('<drupal-media');
      const endIndex = tempFullBody.indexOf('</drupal-media>');
      if (beginIndex >= 0 && endIndex >= 0) {
        const substring = tempFullBody.substr(beginIndex, endIndex - beginIndex + '</drupal-media>'.length);

        const imageElement = parseDrupalEntity(substring);

        if (imageElement) {
          tempFullBody = tempFullBody.replace(substring, imageElement);
        }
      } else {
        continueLooking = false;
      }
    }
  }
  return tempFullBody;
};

const validatePrice = (value: string): boolean => {
  let validate = false;
  const patt = new RegExp('.');
  const isDot = patt.test(value);
  const numArr = isDot ? value.match(/\d+/g) : [value];
  if (numArr) {
    for (let i = 0; i < numArr.length; i++) {
      validate = parseInt(numArr[i]) > 0 && parseFloat(numArr[i]) > -1;
      if (validate) {
        break;
      }
    }
  }
  return validate;
};

// @TODO: Effective error handling here! Our API changed! Alert the devs! Possible security breach!
// The effective error handling should start on this service to show a user friendly error
const reportError = (err?: string): void => console.log('Bad API Response', err);

export default class ApiNormalizer {
  /**
   * Sanitation and validation of API response is crucial to prevent bugs and XSS.
   */

  static normalizeContent (response: ResponseData): FacetedContentModel | null {
    if (!response.content) {
      reportError('normalizeContent failed');
      return null;
    }

    return {
      content: response.content.map(ApiNormalizer.normalizeContentSet),
      facets: ApiNormalizer.normalizeFacets(response.facets),
      totalRecords: response.count || 0
    };
  }

  static normalizeGroupedContent (response: ResponseData): FacetedContentGroupModel | null {
    if (!response.groups) {
      reportError('normalizeGroupedContent failed');
      return null;
    }

    return {
      groups: response.groups.map(ApiNormalizer.normalizeContentSetGroup),
      facets: ApiNormalizer.normalizeFacets(response.facets)
    };
  }

  static normalizeContentSetGroup (response: ResponseData): VariousContentGroupModel | null {
    if (!response.content) {
      reportError('normalizeContentSetGroup failed');
      return null;
    }

    return {
      content: response.content.map(ApiNormalizer.normalizeContentSet),
      drupal_id: response.drupal_id,
      title: response.name,
      weight: response.weight,
      icon: handleUriForIcons(response.icon)
    };
  }

  static normalizeContentSet (response: ResponseData): VariousContentModel | null {
    switch (response.type) {
      case 'link':
        return ApiNormalizer.normalizeMinisiteLink(response);
      case 'article':
        return ApiNormalizer.normalizeArticle(response);
      case 'event':
        return ApiNormalizer.normalizeEvent(response);
      case 'page':
        return ApiNormalizer.normalizePageSearch(response);
      case 'box':
        return ApiNormalizer.normalizeBox(response);
      case 'department':
        return ApiNormalizer.normalizeDepartment(response);
      case 'document':
        return ApiNormalizer.normalizeDocumentSearch(response);
    }
    return null;
  }

  static normalizeFacets (responseFacets: ResponseData): FacetsModel {
    const facets: FacetsModel = {};
    if (responseFacets) {
      Object.keys(responseFacets).forEach(facetType => {
        set(facets, facetType, ApiNormalizer.normalizeTaxonomyTerms(responseFacets[facetType]));
      });
    }
    return facets;
  }

  // @TODO: Maybe there is a more effective way of comparing response to expected schemas?
  static validateArticle (content: ResponseData): ResponseData | null {
    const requiredProps = ['title', 'created', 'body_full', 'body_summary', 'tags', 'categories'];

    for (const prop of requiredProps) {
      if (!Object.prototype.hasOwnProperty.call(content, prop)) {
        reportError(`validateArticle failed: ${prop} missing`);
        return null;
      }
    }

    return content;
  }

  static validateEvent (content: ResponseData): ResponseData | null {
    const requiredProps = [
      'title',
      'created',
      'body_full',
      'body_summary',
      'tags',
      'categories',
      'when_end',
      'when_start',
      'where'
    ];

    for (const prop of requiredProps) {
      if (!Object.prototype.hasOwnProperty.call(content, prop)) {
        reportError(`validateEvent failed: ${prop} missing`);
        return null;
      }
    }

    return content;
  }

  static validateDepartment (content: ResponseData): ResponseData | null {
    const requiredProps = ['drupal_id', 'name', 'type'];

    for (const prop of requiredProps) {
      if (!Object.prototype.hasOwnProperty.call(content, prop)) {
        reportError(`validateDepartment failed: ${prop} missing`);
        return null;
      }
    }

    return content;
  }

  static validateLabel (content: ResponseData): ResponseData | null {
    const requiredProps = ['drupal_id', 'name', 'type'];

    for (const prop of requiredProps) {
      if (!Object.prototype.hasOwnProperty.call(content, prop)) {
        reportError(`validateLabel failed: ${prop} missing`);
        return null;
      }
    }

    return content;
  }

  static validateOffice (content: ResponseData): ResponseData | null {
    const requiredProps = ['drupal_id', 'type', 'address'];

    for (const prop of requiredProps) {
      if (!Object.prototype.hasOwnProperty.call(content, prop)) {
        reportError(`validateOffice failed: ${prop} missing`);
        return null;
      }
    }

    return content;
  }

  static validateAppreciationCard (content: ResponseData): ResponseData | null {
    const requiredProps = ['recipientArchived', 'supervisorArchived', 'cardId'];

    for (const prop of requiredProps) {
      if (!Object.prototype.hasOwnProperty.call(content, prop)) {
        reportError(`validateAppreciationData failed: ${prop} missing`);
        return null;
      }
    }

    return content;
  }

  static validatePeople (content: ResponseData): ResponseData | null {
    const requiredProps = ['loginId', 'fullName', 'email'];

    for (const prop of requiredProps) {
      if (!Object.prototype.hasOwnProperty.call(content, prop)) {
        reportError(`validatePeople failed: ${prop} missing`);
        return null;
      }
    }

    return content;
  }

  static validateNotification (content: ResponseData): ResponseData | null {
    const requiredProps = ['id', 'description', 'application', 'viewed', 'detailsLink', 'reject', 'approve'];
    for (const prop of requiredProps) {
      if (!Object.prototype.hasOwnProperty.call(content, prop)) {
        reportError(`validateNotification failed: ${prop} missing`);
        return null;
      }
    }

    return content;
  }

  static validateLinks (content: ResponseData): ResponseData | null {
    const requiredProps = ['drupal_id', 'name'];

    for (const prop of requiredProps) {
      if (!Object.prototype.hasOwnProperty.call(content, prop)) {
        reportError(`validateLinks failed: ${prop} missing`);
        return null;
      }
    }

    return content;
  }

  static validateBox (content: ResponseData): ResponseData | null {
    const requiredProps = ['drupal_id', 'title'];

    for (const prop of requiredProps) {
      if (!Object.prototype.hasOwnProperty.call(content, prop)) {
        reportError(`validateBox failed: ${prop} missing`);
        return null;
      }
    }

    return content;
  }

  static validateSuccessfulResponse (content: ResponseData): ResponseData | null {
    const requiredProps = ['success'];

    for (const prop of requiredProps) {
      if (!Object.prototype.hasOwnProperty.call(content, prop)) {
        reportError(`validateSuccessfulResponse failed: ${prop} missing`);
        return null;
      }
    }

    return content;
  }

  // This also validates the current list of resources
  static normalizeMinisiteLink (untrustedContent: ResponseData): Link | null {
    const content = ApiNormalizer.validateLinks(untrustedContent);

    if (!content) {
      reportError('normalizeMinisiteLink failed');
      return null;
    }

    return {
      url: content.url,
      type: content.type,
      title: content.name,
      language: content.language,
      promote: content.promote,
      drupal_id: content.drupal_id,
      categories: ApiNormalizer.normalizeTaxonomyTerms(content.categories),
      owner: ApiNormalizer.normalizeTaxonomyTerms(content.owner),
      summary: content.field_summary,
      category_ancestors: ApiNormalizer.normalizeTaxonomyTerms(content.category_ancestors),
      image_uri: handleUriSet(content.image_uri)
    };
  }

  static normalizeSuccessfulResponse (untrustedContent: ResponseData): SuccessfulResponse | null {
    const content = ApiNormalizer.validateSuccessfulResponse(untrustedContent);

    if (!content) {
      reportError('normalizeSuccessfulResponse failed');
      return null;
    }

    return {
      success: content.success
    };
  }

  static normalizeBox (untrustedContent: ResponseData): BoxModel | null {
    const content = ApiNormalizer.validateBox(untrustedContent);

    if (!content) {
      reportError('normalizeBox failed');
      return null;
    }

    return {
      categories: ApiNormalizer.normalizeTaxonomyTerms(content.categories),
      category_ancestors: ApiNormalizer.normalizeTaxonomyTerms(content.category_ancestors),
      drupal_id: content.drupal_id,
      language: content.language,
      owner: ApiNormalizer.normalizeTaxonomyTerms(content.owner),
      summary: content.summary,
      title: content.title,
      type: content.type
    };
  }

  /**
   * Convert API response into the data model we want to store in state.
   */
  static normalizeArticle (untrustedContent: ResponseData): Article | null {
    const content = ApiNormalizer.validateArticle(untrustedContent);
    if (!content) {
      return null;
    }

    return {
      type: 'article',
      drupal_id: content.drupal_id,
      title: content.title,
      created: content.created,
      image_uri: handleUriSet(content.image_uri),
      summary: fullOrSummary(content) || '',
      body_full: transformArticleFullBody(get(content, 'body_full') || ''),
      likesCount: content.likesCount,
      likedByUser: content.likedByUser,
      tags: ApiNormalizer.normalizeTaxonomyTerms(content.tags),
      categories: ApiNormalizer.normalizeTaxonomyTerms(content.categories),
      category_ancestors: ApiNormalizer.normalizeTaxonomyTerms(content.category_ancestors),
      owner: ApiNormalizer.normalizeTaxonomyTerms(content.owner),
      articleCategory: ApiNormalizer.normalizeTaxonomyTerms(content.article_category)
    };
  }

  static normalizeTaxonomyTerm (content: ResponseData): TaxonomyTermModel {
    if (!content || !content.drupal_id) {
      return {} as TaxonomyTermModel;
    }

    return {
      drupal_id: content.drupal_id,
      icon: content.icon,
      title: content.name,
      weight: content.weight
    };
  }

  static normalizeTaxonomyTerms (content: ResponseData): TaxonomyTermModel[] {
    if (!content || !content.length) {
      return [];
    }

    return content.map((t: ResponseData) => ApiNormalizer.normalizeTaxonomyTerm(t));
  }

  static normalizeEvent (untrustedContent: ResponseData): EventModel | null {
    const content = ApiNormalizer.validateEvent(untrustedContent);
    if (!content) {
      return null;
    }

    return {
      type: 'event',
      drupal_id: content.drupal_id,
      title: content.title,
      image_uri: handleUriSet(content.image_uri),
      created: content.created,
      summary: fullOrSummary(content) || '',
      body_full: transformArticleFullBody(get(content, 'body_full', '')),
      tags: ApiNormalizer.normalizeTaxonomyTerms(content.tags),
      categories: ApiNormalizer.normalizeTaxonomyTerms(content.categories),
      category_ancestors: ApiNormalizer.normalizeTaxonomyTerms(content.category_ancestors),
      owner: ApiNormalizer.normalizeTaxonomyTerms(content.owner),
      event_category: ApiNormalizer.normalizeTaxonomyTerms(content.event_category),
      when_end: content.when_end,
      when_start: content.when_start,
      where: content.where,
      when_duration: content.when_duration
    };
  }

  static normalizeLabel (untrustedContent: ResponseData): Label | null {
    if (untrustedContent.labels) {
      untrustedContent = untrustedContent.labels[0];
    }

    const content = ApiNormalizer.validateLabel(untrustedContent);

    if (!content) {
      return null;
    }

    if (content.content) {
      return content.content.length ? content.content[0] : null;
    } else {
      return {
        type: content.type,
        language: content.language,
        banner_uri: handleUriSet(content.banner_uri),
        image_uri: handleUriSet(content.image_uri),
        banner_alt: content.banner_alt,
        logo_uri: handleUri(content.logo_uri),
        body: get(content, 'body'),
        summary: fullOrSummary(content),
        owner: ApiNormalizer.normalizeTaxonomyTerms(content.owner),
        categories: ApiNormalizer.normalizeTaxonomyTerms(content.categories),
        category_ancestors: ApiNormalizer.normalizeTaxonomyTerms(content.category_ancestors),
        contacts: ApiNormalizer.normalizeGroupedContacts(content.grouped_contacts),
        drupal_id: content.drupal_id,
        is_homepage: content.is_homepage,
        title: content.name,
        template: content.template,
        url: content.website_url || content.url,
        score: content.score
      };
    }
  }

  static normalizeGroupedContacts (contactsString: string): ContactGroup[] {
    if (!contactsString) {
      return [];
    }
    const extractLines = (group: string, firstIsLabel: boolean): ContactGroup => {
      const lines = group.split('\r\n').filter(Boolean);
      return {
        group_label: firstIsLabel ? lines[0] : undefined,
        contacts: firstIsLabel ? lines.slice(1) : lines
      };
    };
    return contactsString.includes('#')
      ? contactsString
        .split('#')
        .filter(Boolean)
        .map(g => extractLines(g, true))
      : [extractLines(contactsString, false)];
  }

  static normalizeDepartment (untrustedContent: ResponseData): Department | null {
    if (untrustedContent.departments) {
      untrustedContent = untrustedContent.departments[0];
    }

    const content = ApiNormalizer.validateDepartment(untrustedContent);

    if (!content) {
      return null;
    }

    if (content.content) {
      return content.content.length ? content.content[0] : null;
    } else {
      return {
        type: content.type,
        language: content.language,
        banner_uri: handleUriSet(content.banner_uri),
        image_uri: handleUriSet(content.image_uri),
        banner_alt: content.banner_alt,
        logo_uri: handleUri(content.logo_uri),
        body: get(content, 'body'),
        summary: fullOrSummary(content),
        owner: ApiNormalizer.normalizeTaxonomyTerms(content.owner),
        categories: ApiNormalizer.normalizeTaxonomyTerms(content.categories),
        category_ancestors: ApiNormalizer.normalizeTaxonomyTerms(content.category_ancestors),
        contacts: ApiNormalizer.normalizeGroupedContacts(content.grouped_contacts),
        drupal_id: content.drupal_id,
        is_homepage: content.is_homepage,
        title: content.name,
        template: content.template,
        url: content.website_url || content.url,
        score: content.score
      };
    }
  }

  static normalizePerson (untrustedContent: ResponseData): PeopleModel | null {
    const content = ApiNormalizer.validatePeople(untrustedContent);
    if (!content) {
      return null;
    }

    return {
      loginId: content.loginId,
      fullName: content.fullName,
      firstName: content.firstName,
      lastName: content.lastName,
      employeeType: content.employeeType,
      employeeNumber: content.employeeNumber,
      title: content.title,
      managerName: content.managerName,
      managerEmail: content.managerEmail,
      costCenter: content.costCenter,
      department: content.department,
      company: content.company,
      location: content.location,
      siteCode: content.siteCode,
      country: content.country,
      mobileNumber: content.mobileNumber,
      phoneNumber: content.phoneNumber,
      voipNumber: content.voipNumber,
      email: content.email,
      prefLanguage: content.prefLanguage,
      photo: { photo: content.photo || '' },
      avatar: { photo: content.avatar || '' }
    };
  }

  static validatePageSearch (content: ResponseData): ResponseData | null {
    const requiredProps = ['drupal_id', 'title', 'body_summary'];

    for (const prop of requiredProps) {
      if (!Object.prototype.hasOwnProperty.call(content, prop)) {
        reportError(`validateLinks failed: ${prop} missing`);
        return null;
      }
    }

    return content;
  }

  static normalizePageSearch (untrustedContent: ResponseData): PageSearch | null {
    const content = ApiNormalizer.validatePageSearch(untrustedContent);
    if (!content) {
      return null;
    }

    return {
      drupal_id: content.drupal_id,
      type: content.type,
      language: content.language,
      title: content.title,
      summary: fullOrSummary(content) || '',
      body_full: transformArticleFullBody(content.body_full || ''),
      owner_name: content.owner_name,
      owner: ApiNormalizer.normalizeTaxonomyTerms(content.owner),
      categories: ApiNormalizer.normalizeTaxonomyTerms(content.categories),
      category_ancestors: ApiNormalizer.normalizeTaxonomyTerms(content.category_ancestors),
      image_uri: handleUriSet(content.image_uri),
      attachments_uri: content.attachments_uri
    };
  }

  static validateOfficeSearch (content: ResponseData): ResponseData | null {
    const requiredProps = ['drupal_id', 'name', 'address'];

    for (const prop of requiredProps) {
      if (!Object.prototype.hasOwnProperty.call(content, prop)) {
        reportError(`validateLinks failed: ${prop} missing`);
        return null;
      }
    }

    return content;
  }

  static normalizeOfficeSearch (untrustedContent: ResponseData): OfficeSearch | null {
    const content = ApiNormalizer.validateOfficeSearch(untrustedContent);
    if (!content) {
      return null;
    }
    return {
      type: content.type,
      address: content.address,
      drupal_id: content.drupal_id,
      title: content.name
    };
  }

  static validateDocumentSearch (content: ResponseData): ResponseData | null {
    const requiredProps = ['drupal_id', 'name', 'summary'];

    for (const prop of requiredProps) {
      if (!Object.prototype.hasOwnProperty.call(content, prop)) {
        reportError(`validateLinks failed: ${prop} missing`);
        return null;
      }
    }

    return content;
  }

  static normalizeDocumentSearch (untrustedContent: ResponseData): DocumentSearch | null {
    const content = ApiNormalizer.validateDocumentSearch(untrustedContent);
    if (!content) {
      return null;
    }
    return {
      type: content.type,
      summary: fullOrSummary(content),
      drupal_id: content.drupal_id,
      title: content.name,
      document_uri: content.document_uri,
      owner: ApiNormalizer.normalizeTaxonomyTerms(content.owner),
      categories: ApiNormalizer.normalizeTaxonomyTerms(content.categories),
      category_ancestors: ApiNormalizer.normalizeTaxonomyTerms(content.category_ancestors)
    };
  }

  static validateKnowledgebaseSearch (content: ResponseData): ResponseData | null {
    const requiredProps = ['articleId', 'author', 'body'];

    for (const prop of requiredProps) {
      if (!Object.prototype.hasOwnProperty.call(content, prop)) {
        reportError(`validateLinks failed: ${prop} missing`);
        return null;
      }
    }

    return content;
  }

  static normalizeKnowledgebaseSearch (untrustedContent: ResponseData): KnowledgeSearch | null {
    const content = ApiNormalizer.validateKnowledgebaseSearch(untrustedContent);
    if (!content) {
      return null;
    }

    return {
      type: content.type,
      title: content.title,
      body: fullOrSummary(content),
      articleId: content.articleId,
      author: content.author,
      knowledgeBase: content.knowledgeBase,
      createdOn: content.createdOn
    };
  }

  static validateCatalogSearch (content: ResponseData): ResponseData | null {
    const requiredProps = ['name', 'title', 'body'];

    for (const prop of requiredProps) {
      if (!Object.prototype.hasOwnProperty.call(content, prop)) {
        reportError(`validateLinks failed: ${prop} missing`);
        return null;
      }
    }

    return content;
  }

  static normalizeCatalogSearch (untrustedContent: ResponseData): CatalogSearch | null {
    const content = ApiNormalizer.validateCatalogSearch(untrustedContent);
    if (!content) {
      return null;
    }
    return {
      type: content.type,
      title: content.title,
      body: fullOrSummary(content),
      sysId: content.sysId,
      name: content.name
    };
  }

  static normalizeOffice (untrustedContent: ResponseData): Office | null {
    if (untrustedContent.offices) {
      untrustedContent = untrustedContent.offices[0];
    }

    const content = ApiNormalizer.validateOffice(untrustedContent);

    if (!content) {
      return null;
    }

    // it replaces HTML tags to render the address of the map properly
    const regex = /(<([^>]+)>)/gi;

    return {
      type: content.type,
      title: content.name,
      ad_key: content.ad_key,
      language: content.language,
      location: content.location,
      drupal_id: content.drupal_id,
      categories: ApiNormalizer.normalizeTaxonomyTerms(content.categories),
      office_hours: content.office_hours,
      addressMap: {
        addressTop: get(content, 'address', ''),
        addressForMap: get(content, 'address', '').replace(regex, '')
      }
    };
  }

  static normalizeAppreciationCard (untrustedContent: ResponseData): AlertModel | null {
    const content = ApiNormalizer.validateAppreciationCard(untrustedContent);

    if (!content) {
      return null;
    }

    return {
      recipientEmail: content.recipientEmail,
      cardMessage: content.cardMessage,
      recipientSupervisorEmail: content.recipientSupervisorEmail,
      recipientFirstName: content.recipientFirstName,
      recipientLastName: content.recipientLastName,
      senderFirstName: content.senderFirstName,
      supervisorArchived: content.supervisorArchived,
      recipientArchived: content.recipientArchived,
      senderLastName: content.senderLastName,
      cardId: content.cardId,
      senderEmail: content.senderEmail,
      dateSent: content.dateSent,
      topImg: handleUri(get(content, 'templateImages[0].topImg', null)),
      bottomImg: handleUri(get(content, 'templateImages[0].bottomImg', null))
    };
  }

  static normalizeSearch (response: ResponseData): ResponseData {
    if (!response) {
      reportError('normalizeSearch failed');
      return [];
    }

    const articles = response.articles.data.map(ApiNormalizer.normalizeArticle);
    const events = response.events.data.map(ApiNormalizer.normalizeEvent);
    const people = response.people.data.map(ApiNormalizer.normalizePerson);
    const links = response.link.data.map(ApiNormalizer.normalizeMinisiteLink);
    const departments = response.department.data.map(ApiNormalizer.normalizeDepartment);
    const pages = response.page.data.map(ApiNormalizer.normalizePageSearch);
    const office = response.office.data.map(ApiNormalizer.normalizeOfficeSearch);
    const documents = response.document.data.map(ApiNormalizer.normalizeDocumentSearch);
    const knowledgeBase = response.knowledgebase.data.map(ApiNormalizer.normalizeKnowledgebaseSearch);
    const catalog = response.catalog.data.map(ApiNormalizer.normalizeCatalogSearch);

    const articlesCount = parseInt(response.articles.count);
    const eventsCount = parseInt(response.events.count);
    const peopleCount = parseInt(response.people.count);
    const linksCount = parseInt(response.link.count);
    const departmentsCount = parseInt(response.department.count);
    const pagesCount = parseInt(response.page.count);
    const officeCount = parseInt(response.office.count);
    const documentsCount = parseInt(response.document.count);
    const knowledgeBaseCount = parseInt(response.knowledgebase.count);
    const catalogCount = parseInt(response.catalog.count);
    const totalCount = parseInt(response.total);
    const spellingSuggestion = response.respellingSuggestion;

    return {
      articles,
      events,
      people,
      links,
      departments,
      pages,
      office,
      documents,
      knowledgeBase,
      catalog,
      articlesCount,
      eventsCount,
      peopleCount,
      linksCount,
      departmentsCount,
      pagesCount,
      officeCount,
      documentsCount,
      knowledgeBaseCount,
      catalogCount,
      totalCount,
      spellingSuggestion
    };
  }

  static normalizeSearchSuggestions (response: ResponseData): ResponseData {
    if (!response) {
      reportError('normalizeSearchSuggestions failed');
      return [];
    }

    const searchSuggestions: object[] = [];
    const responseSuggestions = response.suggestion;
    responseSuggestions.map((suggestion: SearchSuggestionSuccessResponse) =>
      searchSuggestions.push({
        label: suggestion.match,
        value: suggestion.match,
        email: suggestion.email
      })
    );

    return { searchSuggestions };
  }

  static normalizeNotification (untrustedContent: ResponseData): Notification | null {
    const content = ApiNormalizer.validateNotification(untrustedContent);
    if (!content) {
      return null;
    }

    return {
      id: content.id,
      description: content.description,
      viewed: content.viewed,
      application: content.application,
      detailsLink: content.detailsLink,
      reject: content.reject,
      approve: content.approve
    };
  }

  static normalizeManualNotification (untrustedContent: ResponseData): ManualNotification | null {
    if (!untrustedContent) {
      return null;
    }
    const validateManualNotification = ApiNormalizer.validateManualNotification(untrustedContent);
    return validateManualNotification ? ApiNormalizer.dataToObjectManualNotification(validateManualNotification) : null;
  }

  static validateManualNotification (content: ResponseData): ResponseData | null {
    const requiredProps = ['title', 'created', 'body_full', 'body_summary', 'tags', 'alert_type', 'drupal_id'];
    for (const prop of requiredProps) {
      if (!Object.prototype.hasOwnProperty.call(content, prop)) {
        reportError(`validateManualNotification failed: ${prop} missing`);
        return null;
      }
    }

    return content;
  }

  static dataToObjectManualNotification (contentData: ResponseData): ManualNotification {
    const notificationType =
      contentData.alert_type[0].name === 'Events'
        ? 'events'
        : contentData.alert_type[0].name === 'Emergency'
          ? 'emergency'
          : contentData.alert_type[0].name === 'News'
            ? 'news'
            : 'maintenance';
    return {
      title: `${contentData.alert_type[0].name} - ${contentData.title}`,
      drupal_id: contentData.drupal_id,
      created: contentData.created,
      summary: fullOrSummary(contentData) || '',
      body_full: get(contentData, 'body_full') || '',
      owner: contentData.owner.map(ApiNormalizer.normalizeTaxonomyTerm),
      notificationType: notificationType
    };
  }

  static normalizeApprovalsManualNotification (untrustedContent: ResponseData): ManualNotification | null {
    if (!untrustedContent) {
      return null;
    }
    const validateApprovalsManualNotification = ApiNormalizer.validateApprovalsManualNotification(untrustedContent);
    return validateApprovalsManualNotification
      ? ApiNormalizer.dataToObjectApprovalsManualNotification(validateApprovalsManualNotification)
      : null;
  }

  static validateApprovalsManualNotification (content: ResponseData): ResponseData | null {
    const requiredProps = [
      'title',
      'requstedDate',
      'sys_id',
      'sys_approval'
    ];
    for (const prop of requiredProps) {
      if (!Object.prototype.hasOwnProperty.call(content, prop)) {
        reportError(`validateApprovalsManualNotification failed: ${prop} missing`);
        return [];
      }
    }

    return content;
  }

  static dataToObjectApprovalsManualNotification (contentData: ResponseData): ManualNotification {
    contentData.body_summary = contentData.description;
    contentData.body_full = contentData.description;
    const price = contentData.price && validatePrice(contentData.price) ? ` - ${contentData.price}` : '';
    const requestedFor = contentData.requested_for ? ` - ${contentData.requested_for}` : '';
    return {
      title: `${contentData.title}${price}${requestedFor}`,
      drupal_id: contentData.sys_id,
      created: contentData.requstedDate,
      summary: fullOrSummary(contentData) || '',
      body_full: get(contentData, 'body_full') || '',
      owner: [
        {
          drupal_id: 0,
          title: 'UMG IT'
        }
      ],
      notificationType: 'approval',
      serviceNowLink: contentData.sys_approval.link
    };
  }

  static normalizeManualNotificationFilterList (content: ResponseData): Categories[] {
    if (!content.facets.alert_type) {
      reportError('normalizeManualNotificationFilterList failed');
      return [];
    }
    return ApiNormalizer.normalizeManualNotificationFilters(content.facets.alert_type);
  }

  static normalizeManualNotificationFilters (content: ResponseData): Categories[] {
    if (!content) {
      reportError('normalizeManualNotificationFilters failed');
      return [] as Categories[];
    }
    return content.map(ApiNormalizer.normalizeManualNotificationFilterData);
  }

  static normalizeManualNotificationFilterData (untrustedContent: ResponseData): Categories | null {
    const content = ApiNormalizer.validateManualNotificationFilterList(untrustedContent);
    if (!untrustedContent) {
      reportError('normalizeManualNotificationFilterData failed');
      return null;
    }
    if (content) {
      return {
        title: content.name,
        drupal_id: content.drupal_id
      };
    } else {
      return null;
    }
  }

  static validateManualNotificationFilterList (content: ResponseData): ResponseData | null {
    const requiredProps = ['name', 'drupal_id'];
    for (const prop of requiredProps) {
      if (!Object.prototype.hasOwnProperty.call(content, prop)) {
        reportError(`validateManualNotificationFilterList failed: ${prop} missing`);
        return null;
      }
    }
    return content;
  }

  static normalizeArticles (response: ResponseData): ResponseData {
    if (!response.content) {
      reportError('normalizeArticles failed');
      return [];
    }
    const articleList = response.content.map(ApiNormalizer.normalizeContentSet);
    const facets = ApiNormalizer.normalizeFacets(response.facets);
    return {
      articleList,
      facets
    };
  }

  static normalizeEvents (response: ResponseData): ResponseData {
    if (!response.content) {
      reportError('normalizeEvents failed');
      return [];
    }

    const eventsList = response.content.map(ApiNormalizer.normalizeEvent);
    const facets = ApiNormalizer.normalizeFacets(response.facets);
    return {
      eventsList,
      facets
    };
  }

  static normalizeDepartments (response: ResponseData): Department[] {
    if (!response.content) {
      reportError('normalizeDepartments failed');
      return [];
    }

    return response.content.map(ApiNormalizer.normalizeDepartment);
  }

  static normalizeLink (untrustedContent: ResponseData): LinkGroupItems | null {
    const content = ApiNormalizer.validateLinks(untrustedContent);

    if (!content) {
      reportError('normalizeLink failed');
      return null;
    }

    return {
      title: content.name,
      content: content.content,
      drupal_id: content.drupal_id
    };
  }

  static normalizeQuickLink (untrustedContent: ResponseData): LinkGroupItems | null {
    const content = ApiNormalizer.validateLinks(untrustedContent);

    if (!content) {
      reportError('normalizeQuickLink failed');
      return null;
    }

    return {
      content: [], // @TODO: Why is this necessary? We need to clean up our models?
      url: content.url,
      title: content.name,
      promote: content.promote,
      drupal_id: content.drupal_id
    };
  }

  static normalizeTodo (untrustedContent: ResponseData): Todo | null {
    if (!untrustedContent) {
      reportError('normalizeTodo failed');
      return null;
    }
    return {
      identifier: untrustedContent.identifier,
      text: untrustedContent.text
    };
  }

  static normalizeBookmark (untrustedContent: ResponseData): Bookmark | null {
    if (!untrustedContent) {
      reportError('normalizeBookmark failed');
      return null;
    }
    return {
      identifier: untrustedContent.identifier,
      title: untrustedContent.title,
      url: untrustedContent.url
    };
  }

  static normalizeMenuLinks (content: ResponseData): LinkGroupItems[] {
    if (!content.groups) {
      reportError('normalizeMenuLinks failed');
      return [];
    }
    return content.groups.map(ApiNormalizer.normalizeLink);
  }

  static normalizeUserLinks (trustedContent: ResponseData): string[] {
    if (!trustedContent.links) {
      reportError('normalizeUserLinks failed');
      return [];
    }

    return trustedContent.links.map(ApiNormalizer.normalizeQuickLink);
  }

  static normalizeTodos (trustedContent: ResponseData): Todo[] {
    if (!trustedContent.todos) {
      reportError('normalizeTodos failed');
      return [];
    }
    return trustedContent.todos.map(ApiNormalizer.normalizeTodo);
  }

  static normalizeBookmarks (trustedContent: ResponseData): Bookmark[] {
    if (!trustedContent.bookmarks) {
      reportError('normalizeBookmarks failed');
      return [];
    }
    return trustedContent.bookmarks.map(ApiNormalizer.normalizeBookmark);
  }

  static normalizePeople (content: ResponseData): PeopleModel[] {
    if (!content.officeUsers) {
      reportError('normalizePeople failed');
      return [];
    }
    return content.officeUsers.map(ApiNormalizer.normalizePerson);
  }

  static normalizeManualNotificationList (content: ResponseData): ManualNotificationListModel {
    if (
      !content.normalizedNotification ||
      !content.normalizedNotification.approvals ||
      !content.normalizedNotification.alerts
    ) {
      reportError('normalizeManualNotificationList failed');
      return {} as ManualNotificationListModel;
    }
    return {
      approvals: ApiNormalizer.normalizeManualNotifications(content.normalizedNotification.approvals, true),
      alerts: ApiNormalizer.normalizeManualNotifications(content.normalizedNotification.alerts, false)
    };
  }

  static normalizeManualNotifications (content: ResponseData, isApprovals: boolean): ManualNotifications {
    if (!content.notifications) {
      reportError('normalizeManualNotifications failed');
      return {} as ManualNotifications;
    }
    const notifications = isApprovals
      ? content.notifications.map(ApiNormalizer.normalizeApprovalsManualNotification)
      : content.notifications.map(ApiNormalizer.normalizeManualNotification);
    return {
      total: content.total,
      notifications: notifications
    };
  }

  static normalizeNotificationsBell (content: ResponseData): NotificationBell | null {
    if (!content) {
      reportError('normalizeNotificationsBell failed');
      return {} as NotificationBell;
    }
    return ApiNormalizer.normalizeNotificationBell(content);
  }

  static normalizeNotificationBell (untrustedContent: ResponseData): NotificationBell | null {
    const content = ApiNormalizer.validateNotificationBell(untrustedContent);
    if (!content) {
      return null;
    }

    return {
      newNotificationCount: content.newNotificationCount
    };
  }

  static validateNotificationBell (content: ResponseData): ResponseData | null {
    const requiredProps = ['newNotificationCount'];
    for (const prop of requiredProps) {
      if (!Object.prototype.hasOwnProperty.call(content, prop)) {
        reportError(`validateNotificationBell failed: ${prop} missing`);
        return null;
      }
    }

    return content;
  }

  static normalizeNotificationsArchive (content: ResponseData): boolean | null {
    if (!content) {
      reportError('normalizeNotificationsArchive failed.');
      return false;
    }
    return ApiNormalizer.normalizeNotificationArchive(content);
  }

  static normalizeNotificationArchive (untrustedContent: ResponseData): boolean | null {
    const content = ApiNormalizer.validateNotificationArchive(untrustedContent);
    if (!content) {
      reportError('normalizeNotificationArchive failed.');
      return false;
    }

    return content.success;
  }

  static validateNotificationArchive (content: ResponseData): ResponseData | null {
    const requiredProps = ['success'];
    for (const prop of requiredProps) {
      if (!Object.prototype.hasOwnProperty.call(content, prop)) {
        reportError(`validateNotificationArchive failed: ${prop} missing`);
        return null;
      }
    }

    return content;
  }

  static normalizeNotificationsRequest (content: ResponseData): string | null {
    if (!content.data) {
      reportError('normalizeNotificationsRequest failed.');
      return null;
    }
    return ApiNormalizer.normalizeNotificationRequest(content.data);
  }

  static normalizeNotificationRequest (untrustedContent: ResponseData): string | null {
    const content = ApiNormalizer.validateNotificationRequest(untrustedContent);
    if (!content) {
      reportError('normalizeNotificationRequest failed.');
      return null;
    }

    return content.state;
  }

  static validateNotificationRequest (content: ResponseData): ResponseData | null {
    const requiredProps = ['state'];
    for (const prop of requiredProps) {
      if (!Object.prototype.hasOwnProperty.call(content, prop)) {
        reportError(`validateNotificationRequest failed: ${prop} missing`);
        return null;
      }
    }

    return content;
  }

  static normalizeArticleById (content: ResponseData): Article[] {
    if (!content.articles) {
      reportError('normalizeArticleById failed');
      return [];
    }
    return content.articles.map(ApiNormalizer.normalizeArticle);
  }

  static normalizeEventById (content: ResponseData): EventModel[] {
    if (!content.events) {
      reportError('normalizeEventById failed');
      return [];
    }
    return content.events.map(ApiNormalizer.normalizeEvent);
  }

  static validateUser (content: ResponseData): ResponseData | null {
    const requiredProps = ['networkID', 'email', 'firstName', 'lastName'];
    for (const prop of requiredProps) {
      if (!content[prop]) {
        reportError();
        return get(content, 'error') ? content : null;
      }
    }

    return content;
  }

  static userAndProfileContent (untrustedContent: ResponseData): UserInfoModel | null {
    const content = ApiNormalizer.validateUser(untrustedContent);

    if (!content) {
      reportError('userAndProfileContent failed');
      return null;
    }

    const { photo } = content;

    const defaultPhoto: object = {
      medium: photo && photo.medium ? photo.medium : images.defaultAvatar
    };

    return content.error
      ? content
      : {
        photo: defaultPhoto,
        email: content.email,
        phone: content.phone,
        jobTitle: content.jobTitle,
        location: content.location,
        lastName: content.lastName,
        networkID: content.networkID,
        reportsTo: content.reportsTo,
        firstName: content.firstName,
        department: content.department,
        directReports: content.directReports,
        preferredLanguage: content.preferredLanguage
      };
  }

  static userProfilePictureContent (untrustedContent: ResponseData): UserProfilePicture | null {
    const content = untrustedContent[0];

    if (!content) {
      reportError('userProfilePictureContent failed');
      return null;
    }
    return content.error
      ? content
      : {
        photo: content.photo,
        siteCode: content.siteCode
      };
  }

  static userProfileContent (untrustedContent: ResponseData): UserProfileModel | null {
    const content = untrustedContent[0];

    if (!content) {
      reportError('userProfileContent failed');
      return null;
    }
    return content.error
      ? content
      : {
        networkID: content.loginId,
        firstName: content.firstName,
        lastName: content.lastName,
        title: content.title,
        jobLocation: content.location,
        fullName: content.fullName,
        companyName: content.company,
        department: content.department,
        profitCenter: content.costCenter,
        desk: content.desk,
        officeNumber: content.phoneNumber,
        mobileNumber: content.home_phone,
        email: content.email,
        nickname: content.nickname,
        birthday: content.birthDay,
        birthMonth: content.birthMonth,
        anniversaryDay: content.anniversaryDay,
        anniversaryMonth: content.anniversaryMonth,
        languagesSpoken: content.languagesSpoken,
        professionalSkills: content.professionalSkills,
        currentlyWorking: content.currentAssignment,
        aboutMe: content.shortDescription,
        photo: { photo: content.photo || '' },
        avatar: { photo: content.avatar || '' },
        profileType: get(content, 'orgUnit[0].type', 'umg'),
        labelId: get(content, 'orgUnit[0].drupal_id', 0),
        labelLogo: get(content, 'orgUnit[0].central_logo_uri', '')
      };
  }

  static normalizeUser (untrustedContent: ResponseData): UserInfoModel | null {
    return ApiNormalizer.userAndProfileContent(untrustedContent);
  }

  static normalizeProfile (untrustedContent: ResponseData): UserInfoModel | null {
    return ApiNormalizer.userAndProfileContent(untrustedContent._user);
  }

  static normalizeUsers (content: ResponseData): UserInfoModel[] {
    if (!content.users) {
      reportError('normalizeUsers failed');
      return [];
    }

    return content.users.map(ApiNormalizer.normalizeUser);
  }

  static normalizePage (response: ResponseData): Page | null {
    if (!response) {
      reportError('normalizePage failed');
      return null;
    }

    if (response.content) {
      return response.content.length ? response.content[0] : null;
    } else {
      return response.pages && response.pages.length ? ApiNormalizer.normalizePageSearch(response.pages[0]) : null;
    }
  }

  static normalizeUserProfile (untrustedContent: ResponseData): UserProfileModel | null {
    return ApiNormalizer.userProfileContent(untrustedContent.user);
  }

  static normalizeUserProfilePicture (untrustedContent: ResponseData): UserProfilePicture | null {
    return ApiNormalizer.userProfilePictureContent(untrustedContent.profilepicture);
  }

  static normalizeOrgChart (content: ResponseData): Users {
    if (!content.user || !content.subordinates) {
      reportError('normalizeOrgchart failed');
      return {} as Users;
    }

    return {
      manager: content.manager,
      user: content.user,
      subordinates: content.subordinates.map(ApiNormalizer.normalizeSubordinates)
    };
  }

  static normalizeSubordinates (untrustedContent: ResponseData): Manager | null {
    const content = ApiNormalizer.validateSubordinates(untrustedContent);
    if (!content) {
      return null;
    }

    return {
      email: content.email,
      name: content.name,
      title: content.title
    };
  }

  static validateSubordinates (content: ResponseData): ResponseData | null {
    const requiredProps = ['email', 'name', 'title'];
    for (const prop of requiredProps) {
      if (!Object.prototype.hasOwnProperty.call(content, prop)) {
        reportError(`validateSubordinates failed: ${prop} missing`);
        return null;
      }
    }

    return content;
  }

  static normalizeOfficesPeoples (content: ResponseData): OfficesPeople[] {
    if (!content.groups) {
      reportError('normalizeOfficesPeoples failed');
      return [];
    }

    return content.groups.map(ApiNormalizer.normalizeOfficesPeople).filter(Boolean);
  }

  static normalizeOfficesPeople (untrustedContent: ResponseData): OfficesPeople | null {
    const content = ApiNormalizer.validateOfficesPeople(untrustedContent);

    if (!content) {
      reportError('normalizeOfficesPeople failed');
      return null;
    }
    const officesData = ApiNormalizer.normalizeOfficeContents(content);

    return {
      placeName: content.name,
      officeList: officesData,
      drupal_id: content.drupal_id
    };
  }

  static normalizeOfficeContents (content: ResponseData): OfficeItem[] {
    if (!content.content) {
      reportError('normalizeOfficeContents failed');
      return [];
    }

    return content.content.map(ApiNormalizer.normalizeOfficeContent);
  }

  static normalizeAppreciationCards (content: ResponseData): AlertModel[] {
    if (!content.appreciationCards) {
      reportError('normalizeAppreciationCards failed');
      return [];
    }

    return content.appreciationCards.map(ApiNormalizer.normalizeAppreciationCard);
  }

  static normalizeSetUserProfileData (content: any): any {
    return {
      home_phone: content.mobileNumber || '',
      u_nickname: content.nickname || '',
      u_dob_day: content.birthday || '',
      u_dob_month: content.birthMonth || '',
      u_anniversary_month: content.anniversaryMonth || '',
      u_anniversary_day: content.anniversaryDay || '',
      u_languages_spoken: content.languagesSpoken || '',
      u_professional_skills: content.professionalSkills || '',
      u_current_assignment: content.currentlyWorking || '',
      short_description: content.aboutMe || ''
    };
  }

  static normalizeOfficeContent (content: ResponseData): OfficeItem | null {
    const addressContent = ApiNormalizer.validateOfficeContent(content);
    if (!addressContent) {
      reportError('normalizeOfficesPeople failed');
      return null;
    }

    return {
      drupal_id: addressContent.drupal_id,
      title: addressContent.name,
      address: get(addressContent, 'location[0].name', null),
      type: addressContent.type,
      officeCategories: ApiNormalizer.normalizeTaxonomyTerms(content.categories),
      location: addressContent.location
    };
  }

  static validateOfficesPeople (content: ResponseData): ResponseData | null {
    const requiredProps = ['drupal_id', 'name', 'content'];

    for (const prop of requiredProps) {
      if (!Object.prototype.hasOwnProperty.call(content, prop)) {
        reportError(`validateOfficesPeople failed: ${prop} missing`);
        return null;
      }
    }

    return content;
  }

  static validateOfficeContent (content: ResponseData): ResponseData | null {
    const requiredProps = ['drupal_id', 'name', 'location', 'type', 'categories'];

    for (const prop of requiredProps) {
      if (!Object.prototype.hasOwnProperty.call(content, prop)) {
        reportError(`validateOfficeContent failed: ${prop} missing`);
        return null;
      }
    }

    return content;
  }

  static normalizeUserProfileUpdate (content: ResponseData): UserProfileUpdateResponse {
    if (get(content.data, 'error', null)) {
      content.data.error = content.data.error.replace('Error: ', '');
      content.data.error = content.data.error.replace(/:/gi, ' ');
      content.data.error = content.data.error.split(',').join(', ');
      return {
        userProfileUpdateErrorMessage: content.data.error,
        isUserProfileUpdateError: true
      };
    } else {
      return {
        userProfileUpdateErrorMessage: '',
        isUserProfileUpdateError: false
      };
    }
  }

  static normalizeMyContacts (content: ResponseData): ContactList | null {
    if (!content) {
      reportError('normalizeMyContacts failed');
      return null;
    } else {
      return {
        title: content.title,
        office: content.phoneNumber,
        mobile: content.mobileNumber,
        email: content.email,
        contactPic: { photo: content.photo || '', siteCode: content.siteCode || '' }
      };
    }
  }

  static normalizeMyContactsResponse (content: ResponseData): ContactList[] {
    if (!content.contacts) {
      reportError('normalizeMyContactsList failed');
      return [];
    }
    return content.contacts.map(ApiNormalizer.normalizeMyContacts);
  }

  static normalizeUsersByEmail (content: ResponseData): UserInfoModel[] {
    if (!content) {
      reportError('normalizeUsersByEmail failed');
      return [];
    }

    return content.user.map((u: ResponseData) => {
      const defaultPhoto: object = {
        medium: u.photo ? appEnv.serviceNowUri.baseUrl + u.photo : images.defaultAvatar
      };

      return {
        networkID: u.loginId,
        email: u.email,
        jobTitle: u.title,
        department: u.department,
        profilePicture: defaultPhoto,
        location: u.location,
        phone: [
          {
            cc: 'USA',
            number: u.phoneNumber,
            type: 'desk'
          },
          {
            cc: 'USA',
            number: u.home_phone,
            type: 'mobile'
          }
        ],
        photo: u.photo,
        reportsTo: u.managerName,
        lastName: u.lastName,
        firstName: u.firstName,
        fullName: u.fullName,
        preferredLanguage: u.prefLanguage
      };
    });
  }

  static normalizeProfilepicDeleteResponse (content: ResponseData): ContactResponse | null {
    if (!content) {
      reportError('normalizeprofilepic delete failed');
      return null;
    } else {
      return {
        success: content.success,
        error: content.error,
        message: content.message
      };
    }
  }

  static normalizeAppreciationCardTemplate (content: ResponseData): AppreciationCardTemplate[] | null {
    if (!content) {
      reportError('normalizeAppreciationCardTemplate failed');
      return null;
    } else {
      const appreciationCardTemplates = content.appreciationCardTemplates.map((card: AppreciationCardTemplate) => ({
        templateId: card.templateId,
        topImg: handleUri(card.topImg),
        bottomImg: handleUri(card.bottomImg),
        active: card.active
      }));
      return appreciationCardTemplates;
    }
  }

  static normalizeSystemsApplications (content: ResponseData): SystemApplicationItem[] | null {
    if (!content) {
      reportError('normalizeSystemsApplications failed');
      return null;
    }
    return content.applications.map(ApiNormalizer.normalizeApplications);
  }

  static normalizeApplications (content: ResponseData): SystemApplicationItem | null {
    if (!content) {
      return null;
    }

    return {
      name: content.name,
      shortDescription: content.shortDescription,
      ownedBy: content.ownedBy,
      managedBy: content.managedBy,
      supportedBy: content.supportedBy,
      url: content.url,
      ownedByEmail: content.ownedByEmail,
      managedByEmail: content.managedByEmail,
      supportedByEmail: content.supportedByEmail
    };
  }
}
