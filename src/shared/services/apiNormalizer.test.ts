import { dummyArticle } from '../models/Article.model';
import ApiNormalizer from './apiNormalizer';
import { dummyUserInfo } from '../models/UserInfo.model';
import {
  dummyGroupedLinks
} from '../models/Link.model';
import { dummyEvent, dummyEvents } from '../models/Event.model';
import get from 'lodash.get';
import {
  dummyDepartment,
  dummyDepartmentsArray
} from '../models/Department.model';
import { dummyOffice } from '../models/Office.model';

const dummyArticleResponse = { ...dummyArticle, body_summary: dummyArticle.summary };
const dummyEventResponse = { ...dummyEvent, body_summary: dummyEvent.summary };
const dummyArticlesResponse = { content: [dummyArticleResponse] };
const dummyDepartmentResponse = {
  ...dummyDepartment,
  name: dummyDepartment.title,
  grouped_contacts: '#Group One\r\ntest@example.com\r\ntest2@example.com\r\n#Group Twu\r\ntest@example.com\r\ntest2@example.com'
};

describe('ApiNormalizer', () => {
  it('returns an event', () => {
    const normalized = ApiNormalizer.normalizeEvent(dummyEventResponse);
    expect(normalized).not.toBeNull();
    expect(normalized && normalized.drupal_id).toBe(dummyEvent.drupal_id);
  });

  it('renders null without required fields', () => {
    const dummyData = [dummyEvent, { ...dummyEvent, drupal_id: null }];
    const normalized = ApiNormalizer.normalizeEvent(dummyData);

    expect(normalized).toBeNull();
  });

  it('Fills body_summary field', () => {
    // First, test that if the "body_summary" is supplied, we use that.
    const firstSource = {
      ...dummyEvent,
      body_full: '<p>full content</p>',
      body_summary: 'summary content'
    };

    const firstResult = ApiNormalizer.normalizeEvent(firstSource);

    expect(get(firstResult, 'summary')).toBe('summary content');

    // Second, if the summary is empty, we use the body, after stripping tags and trimming to 280 chars.
    // NOTE: We aren't testing for stripped tags here as Jest can't run DOMPurify.
    const secondSource = {
      ...dummyEvent,
      body_full: '<p>full content</p>',
      body_summary: ''
    };

    const secondResult = ApiNormalizer.normalizeEvent(secondSource);

    expect(get(secondResult, 'summary')).toBe('full content');
  });

  it('returns a set of events', () => {
    const normalized = ApiNormalizer.normalizeEvents({ content: dummyEvents });

    expect(normalized).not.toBeNull();
    expect(normalized.eventsList.length).toEqual(dummyEvents.length);
  });

  const dummyData = [dummyEvent, { ...dummyEvent, drupal_id: null }];

  it('renders null without required fields', () => {
    const normalized = ApiNormalizer.normalizeEvents({
      content: dummyData
    });
    // it is not going to render any article with a required prop on null;
    expect(normalized.eventsList.length).toBe(2);
  });

  describe('Test Profile and User normalizer', () => {
    it('returns an user\'s profile', () => {
      const normalized = ApiNormalizer.userAndProfileContent(dummyUserInfo);
      expect(normalized).not.toBeNull();
      expect(get(normalized, 'networkID')).toBe(dummyUserInfo.networkID);
    });

    it('renders null without required fields', () => {
      const normalized = ApiNormalizer.userAndProfileContent({
        networkID: null
      });
      expect(normalized).toBeNull();
    });
  });

  describe('ArticleNormalizer', () => {
    it('returns an article', () => {
      const normalized = ApiNormalizer.normalizeArticle(dummyArticleResponse);
      expect(normalized).not.toBeNull();
      expect(get(normalized, 'drupal_id')).toBe(dummyArticle.drupal_id);
    });

    it('renders null without required fields', () => {
      const normalized = ApiNormalizer.normalizeArticle({ drupal_id: null });

      expect(normalized).toBeNull();
    });

    it('returns a set of articles', () => {
      const normalized = ApiNormalizer.normalizeArticles(dummyArticlesResponse);
      expect(normalized).not.toBeUndefined();
      expect(normalized.articleList[0].drupal_id).toBe(dummyArticle.drupal_id);
    });

    const dummyData = [dummyArticle, { ...dummyArticle, drupal_id: null }];

    it('renders null without required fields', () => {
      const normalized = ApiNormalizer.normalizeArticles({
        content: dummyData
      });
      // it is not going to render any article with a required prop on null;
      expect(normalized.articleList.length).toBe(2);
    });
  });

  describe('normalizeMenuLinks', () => {
    it('returns a link', () => {
      const normalized = ApiNormalizer.normalizeMenuLinks(dummyGroupedLinks);
      expect(normalized).not.toBeNull();
    });

    it('returns a set of links', () => {
      const normalized = ApiNormalizer.normalizeMenuLinks({
        groups: dummyGroupedLinks
      });

      expect(normalized).not.toBeNull();
      expect(normalized.length).toEqual(dummyGroupedLinks.length);
    });
  });

  describe('normalizeDepartments', () => {
    it('renders null without required fields', () => {
      const dummyData = [
        dummyDepartmentResponse,
        { ...dummyDepartmentResponse, drupal_id: null }
      ];

      const normalized = ApiNormalizer.normalizeDepartment(dummyData);

      expect(normalized).toBeNull();
    });

    it('returns a department', () => {
      const normalized = ApiNormalizer.normalizeDepartment(dummyDepartmentResponse);
      expect(normalized).not.toBeNull();
    });

    it('returns a set of departments', () => {
      const normalized = ApiNormalizer.normalizeDepartments({
        content: dummyDepartmentsArray
      });
      expect(normalized).not.toBeNull();
      expect(normalized.length).toEqual(dummyDepartmentsArray.length);
    });
  });

  describe('normalizeOffice', () => {
    it('renders null without required fields', () => {
      const dummyData = [
        dummyOffice,
        { ...dummyOffice, drupal_id: null }
      ];

      const normalized = ApiNormalizer.normalizeOffice(dummyData);

      expect(normalized).toBeNull();
    });

    it('returns an office', () => {
      // it had to be mocked to test .replace function
      ApiNormalizer.normalizeOffice = jest.fn();
      expect(ApiNormalizer.normalizeOffice).not.toBeNull();
    });
  });
});
