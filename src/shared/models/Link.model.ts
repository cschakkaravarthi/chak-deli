import { ImageUris } from './Image.model';
import { BaseContentModel, TaxonomyTermModel } from '../types/contentTypes';

export default interface Link extends BaseContentModel {
  url?: string;
  type: string;
  title: string;
  language?: string;
  promote?: boolean;
  drupal_id: number;
  owner: TaxonomyTermModel[];
  categories: TaxonomyTermModel[];
  category_ancestors: TaxonomyTermModel[];
  image_uri?: ImageUris;
  image_alt?: string;
  summary?: string;
  attachments_uri?: string;
}

export interface LinkGroupItems {
  url?: string;
  title: string;
  content: Link[];
  promote?: boolean;
  drupal_id: number;
  icon?: string;
}

export interface LinkGroup {
  groups: LinkGroupItems[];
}

export const dummyLink: Link = {
  type: 'link',
  drupal_id: 4,
  title: 'Zebra',
  promote: true,
  language: 'en',
  summary: 'test summary',
  category_ancestors: [{ drupal_id: 2, title: 'HR', icon: null }],
  owner: [],
  url: 'https://www.zebra.com',
  categories: [{ drupal_id: 2, title: 'HR', icon: null }]
};

export const minisiteDummyLinks: Link[] = [
  {
    type: 'link',
    language: 'en',
    category_ancestors: [
      {
        drupal_id: 137,
        title: 'Links',
        weight: 1,
        icon: null
      }
    ],
    categories: [
      {
        drupal_id: 137,
        title: 'Links',
        weight: 1,
        icon: null
      }
    ],
    summary: 'Uniport is an application',
    drupal_id: 25,
    title: 'Uniport',
    promote: false,
    url: 'https://www.google.com/search?q=uniport',
    owner: [
      {
        drupal_id: 133,
        title: 'Finance',
        weight: 0,
        icon: null
      }
    ],
    image_uri: {
      umgc_banner:
        's3://styles/umgc_banner/s3/2019-11/trail-8LPgWfHgcMg-unsplash.jpg',
      umgc_embedded:
        's3://styles/umgc_embedded/s3/2019-11/trail-8LPgWfHgcMg-unsplash.jpg',
      umgc_featured:
        's3://styles/umgc_featured/s3/2019-11/trail-8LPgWfHgcMg-unsplash.jpg',
      umgc_thumbnail:
        's3://styles/umgc_thumbnail/s3/2019-11/trail-8LPgWfHgcMg-unsplash.jpg',
      source: 's3://2019-11/trail-8LPgWfHgcMg-unsplash.jpg'
    }
  }
];

export const dummyGroupedLinkContent: LinkGroupItems = {
  title: 'HR',
  drupal_id: 23,
  content: [dummyLink]
};

export const dummyGroupedLink: LinkGroup = {
  groups: [dummyGroupedLinkContent]
};

export const dummyGroupedLinks: LinkGroupItems[] = [
  {
    drupal_id: 2,
    title: 'HR',
    content: [
      {
        type: 'link',
        language: 'en',
        category_ancestors: [
          {
            drupal_id: 2,
            title: 'HR',
            icon: null
          }
        ],
        categories: [
          {
            drupal_id: 2,
            title: 'HR',
            icon: null
          }
        ],
        owner: [],
        summary: undefined,
        drupal_id: 4,
        title: 'Zebra',
        promote: true,
        url: 'https://www.zebra.com'
      }
    ]
  },
  {
    drupal_id: 23,
    title: 'UMG Departments',
    content: [
      {
        type: 'link',
        language: 'en',
        category_ancestors: [
          {
            drupal_id: 27,
            title: 'some name',
            icon: null
          },
          {
            drupal_id: 23,
            title: 'UMG Departments',
            icon: null
          }
        ],
        owner: [],
        categories: [
          {
            drupal_id: 27,
            title: 'some name',
            icon: null
          },
          {
            drupal_id: 23,
            title: 'UMG Departments',
            icon: null
          }
        ],
        summary: undefined,
        drupal_id: 3,
        title: 'Testing Link #2',
        promote: true,
        url: 'http://www.google.com'
      }
    ]
  },
  {
    drupal_id: 26,
    title: 'HR',
    content: [
      {
        type: 'link',
        language: 'en',
        category_ancestors: [
          {
            drupal_id: 26,
            title: 'HR',
            icon: null
          }
        ],
        owner: [],
        categories: [
          {
            drupal_id: 26,
            title: 'HR',
            icon: null
          }
        ],
        summary: 'This is a test link',
        drupal_id: 1,
        title: 'Test Link',
        promote: true,
        url: 'https://www.example.com'
      }
    ]
  }
];

export const searchDummyLinks: Link = {
  type: 'link',
  summary: 'Uniport is an application',
  drupal_id: 25,
  title: 'Uniport',
  url: 'https://www.google.com/search?q=uniport',
  owner: [],
  categories: [],
  category_ancestors: []
};
