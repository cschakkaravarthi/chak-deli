import { ImageUris } from './Image.model';
import { BaseContentModel, TaxonomyTermModel } from '../types/contentTypes';

export type LabelTemplate = TaxonomyTermModel;

export interface ContactGroup {
  group_label?: string;
  contacts: string[];
}

export interface Label extends BaseContentModel {
  banner_alt: string;
  banner_uri?: ImageUris;
  body: string;
  categories: TaxonomyTermModel[];
  category_ancestors: TaxonomyTermModel[];
  contacts?: ContactGroup[];
  drupal_id: number;
  image_uri?: ImageUris;
  is_homepage: boolean;
  language?: string;
  logo_uri?: string;
  score?: number;
  summary?: string;
  template: TaxonomyTermModel[];
  title: string;
  type: string;
  url?: string; // in the case of type link is only url
  website_url?: string;
}

export const dummyLabel: Label = {
  type: 'label',
  language: 'en',
  banner_uri: {
    umgc_banner:
      's3://styles/umgc_banner/s3/2019-11/helloquence-5fNmWej4tAA-unsplash.jpg',
    umgc_embedded:
      's3://styles/umgc_embedded/s3/2019-11/helloquence-5fNmWej4tAA-unsplash.jpg',
    umgc_featured:
      's3://styles/umgc_featured/s3/2019-11/helloquence-5fNmWej4tAA-unsplash.jpg',
    umgc_thumbnail:
      's3://styles/umgc_thumbnail/s3/2019-11/helloquence-5fNmWej4tAA-unsplash.jpg',
    source: 's3://2019-11/helloquence-5fNmWej4tAA-unsplash.jpg'
  },
  logo_uri: 's3://2019-11/helloquence-5fNmWej4tAA-unsplash.jpg',
  banner_alt: 'Two people at a desk',
  body:
    '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vitae odio vehicula nisl lacinia luctus non et libero. Quisque leo tortor, lacinia et porttitor vel, dignissim at sapien.</p>',
  summary: 'body Lorem ipsum dolor summary',
  categories: [
    { drupal_id: 23, title: 'Departments List', weight: 2, icon: '' }
  ],
  category_ancestors: [{ drupal_id: 23, title: 'Departments List', weight: 2, icon: '' }],
  owner: [],
  contacts: [
    {
      group_label: 'Primary Contacts',
      contacts: ['test1@example.com', 'test2@example.com']
    },
    {
      group_label: 'Secondary Contacts',
      contacts: ['test3@example.com', 'test4@example.com']
    }
  ],
  drupal_id: 192019,
  is_homepage: false,
  title: 'Finance',
  template: [{ drupal_id: 23, title: 'Template A', weight: 2, icon: '' }],
  score: undefined,
  website_url: ''
};

export const dummyLabelsArray = [
  { ...dummyLabel },
  { ...dummyLabel, drupal_id: 1 },
  { ...dummyLabel, drupal_id: 2 },
  { ...dummyLabel, drupal_id: 3 },
  { ...dummyLabel, drupal_id: 5 },
  { ...dummyLabel, drupal_id: 6 },
  { ...dummyLabel, drupal_id: 7 }
];
