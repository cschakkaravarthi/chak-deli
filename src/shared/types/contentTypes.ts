import Link, { dummyLink } from '../models/Link.model';
import Article, { dummyArticle } from '../models/Article.model';
import EventModel, { dummyEvent } from '../models/Event.model';
import { dummyPageSearchData, Page } from '../models/Page.model';
import { DocumentSearch, dummyDocument } from '../models/Document.model';
import { Department } from '../models/Department.model';
import { Label } from '../models/Label.model';
import BoxModel from '../models/Box.model';

export interface TaxonomyTermModel {
  drupal_id: number;
  title: string;
  weight?: number;
  icon?: any;
}

export interface BaseContentModel {
  type: string;
  drupal_id: number;
  title: string;
  summary?: string;
  categories: TaxonomyTermModel[];
  category_ancestors: TaxonomyTermModel[];
  owner: TaxonomyTermModel[];
  url?: string;
}

// supply your own type and drupal_id
export const skeletonBaseContentModel = {
  categories: [],
  category_ancestors: [],
  owner: [],
  summary: '',
  title: ''
};

export enum FacetType {
  article_category,
  category,
  event_category,
  owner
}

export type FacetsModel = {
  [FacetType.article_category]?: TaxonomyTermModel[];
  [FacetType.category]?: TaxonomyTermModel[];
  [FacetType.event_category]?: TaxonomyTermModel[];
  [FacetType.owner]?: TaxonomyTermModel[];
};

export type FacetedContentModel = {
  content: VariousContentModel[];
  facets?: FacetsModel;
  totalRecords: number;
};
export type FacetedContentGroupModel = {
  groups: VariousContentGroupModel[];
  facets?: FacetsModel;
};

// If you add a type to VariousContentModel, make sure it extends BaseContentModel.
export type VariousContentModel = Link | Article | EventModel | Page | DocumentSearch | Department | BoxModel | Label;

// A Group is just a taxonomy term, but with an extra property added, an array of children.
export interface VariousContentGroupModel extends TaxonomyTermModel {
  content: VariousContentModel[];
}

// Redux store type definition.
export interface ContentStateModel {
  content: ContentCategorizedStorageModel;
  groupedContent: ContentGroupedCategorizedStorageModel;
}

export interface ContentGroupedCategorizedStorageModel {
  [key: string]: FacetedContentGroupModel;
}

export interface ContentCategorizedStorageModel {
  [key: string]: FacetedContentModel;
}

export interface ContentQueryParamsType {
  article_category?: string;
  category?: string | number;
  event_category?: string;
  facet?: string;
  group?: string;
  owner?: string;
  sort?: string;
  type?: string;
}

export const DIRECTLY_LOADED_CONTENT_KEY = 'AAA Directly Loaded';
export const FETCH_CONTENT = 'FETCH_CONTENT';
export const FETCH_GROUPED_CONTENT = 'FETCH_GROUPED_CONTENT';
export const LOAD_CONTENT = 'LOAD_CONTENT';
export const LOAD_GROUPED_CONTENT = 'LOAD_GROUPED_CONTENT';
export const REPLACE_INDIVIDUAL_CONTENT = 'REPLACE_INDIVIDUAL_CONTENT';

export interface LoadGroupedContentAction {
  type: typeof LOAD_GROUPED_CONTENT;
  content: FacetedContentGroupModel;
  key: string;
}
export interface LoadContentAction {
  type: typeof LOAD_CONTENT;
  content: FacetedContentModel;
  key: string;
}
export interface ReplaceIndividualContentAction {
  type: typeof REPLACE_INDIVIDUAL_CONTENT;
  content: VariousContentModel;
}

export const dummyVariousContentGroup: VariousContentGroupModel = {
  content: [dummyArticle, dummyLink, dummyDocument, dummyEvent, dummyPageSearchData],
  drupal_id: 1,
  title: 'Group Title',
  weight: 1,
  icon: 'someicon.svg'
};

export const dummyVariousContent: VariousContentModel[] = [
  dummyArticle,
  dummyLink,
  dummyDocument,
  dummyEvent,
  dummyPageSearchData
];

export const dummyFacetedContentGroupModel: FacetedContentGroupModel = {
  groups: [
    // Value is an array of groups. If there is only one group, then output a flat list.
    dummyVariousContentGroup,
    {
      content: [dummyLink],
      drupal_id: 2,
      title: 'Group Title 2',
      weight: 2,
      icon: 'someicon.svg'
    }
  ]
};

export const dummyContentGroupedCategorizedStorage: ContentGroupedCategorizedStorageModel = {
  'type=article&category=12,13&group=category': dummyFacetedContentGroupModel
};

// Here I am converting a generic type (VariousContentModel) into an explicit type (Article).
export const contentToArticle = (c: VariousContentModel): Article | null => {
  if (c.type !== 'article') {
    return null;
  }
  return {
    created: 0,
    ...c,
    type: 'article'
  };
};

export const contentToDepartment = (c: VariousContentModel): Department | null => {
  if (c.type !== 'department') {
    return null;
  }
  return {
    banner_alt: '',
    body: '',
    is_homepage: false,
    template: [],
    ...c
  };
};

export const contentToLabel = (c: VariousContentModel): Label | null => {
  if (c.type !== 'label') {
    return null;
  }
  return {
    banner_alt: '',
    body: '',
    is_homepage: false,
    template: [],
    ...c
  };
};

export const dummyFacetedContentModel: FacetedContentModel = {
  content: dummyVariousContent,
  totalRecords: dummyVariousContent.length
};
