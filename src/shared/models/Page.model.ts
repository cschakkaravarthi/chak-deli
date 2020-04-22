import { BaseContentModel, TaxonomyTermModel } from '../types/contentTypes';
import { ImageUris } from './Image.model';

export interface Page extends BaseContentModel {
  type: string;
  language: string;
  categories: TaxonomyTermModel[];
  category_ancestors: TaxonomyTermModel[];
  body_full?: string;
  summary?: string;
  created?: number;
  owner: TaxonomyTermModel[];
  drupal_id: number;
  promote?: boolean;
  tags?: TaxonomyTermModel[];
  tags_ancestors?: number[];
  title: string;
  image_uri?: ImageUris;
  image_alt?: string;
  attachments_uri?: string[];
}

export interface PageSearch extends Page {
  owner_name?: string;
}

export const dummyPageSearchData: PageSearch = {
  type: 'page',
  language: 'en',
  categories: [],
  category_ancestors: [],
  body_full: '<p>Here are all the nice things you can do in the Woodland Hills office:<br />\r\n<br />\r\n- Yoga</p>\r\n\r\n<p>- Drink coffee</p>\r\n\r\n<p>- Play games</p>\r\n',
  summary: 'More information on Recreation opportunities in the Woodland Hills office. This card is for a Page.',
  created: 1574803435,
  owner: [],
  owner_name: 'Communications',
  drupal_id: 86,
  promote: false,
  tags: [],
  tags_ancestors: [],
  title: 'Recreation'
};
