import { ImageUris } from './Image.model';
import { BaseContentModel, TaxonomyTermModel } from '../types/contentTypes';

export default interface EventModel extends BaseContentModel {
  type: 'event';
  language?: string;
  body_full: string;
  summary: string;
  created: number;
  drupal_id: number;
  event_category?: TaxonomyTermModel[];
  categories: TaxonomyTermModel[];
  category_ancestors: TaxonomyTermModel[];
  image_uri?: ImageUris;
  attachments?: any[] | null;
  owner: TaxonomyTermModel[];
  tags?: TaxonomyTermModel[];
  tags_ancestors?: TaxonomyTermModel[];
  title: string;
  when_end: number;
  when_start: number;
  where: string;
  when_duration: number;
}

export interface EventSendInviteModel extends EventModel {
  username?: string | undefined;
  emailBody?: string | undefined;
}

export const dummyEvent: EventModel = {
  language: 'en',
  type: 'event',
  body_full: '<p>Some body text</p>\r\n',
  summary: '',
  created: 1568326940,
  drupal_id: 4,
  event_category: [
    {
      drupal_id: 46,
      title: 'Industry Events',
      weight: 1,
      icon: null
    }
  ],
  categories: [],
  category_ancestors: [],
  image_uri: {
    umgc_banner: 'undefined',
    umgc_embedded: 'undefined',
    umgc_featured: 'undefined',
    umgc_thumbnail: 'undefined',
    source: 'undefined'
  },
  attachments: null,
  owner: [
    {
      drupal_id: 3,
      title: 'Global Travel',
      weight: 0,
      icon: null
    }
  ],
  tags: [
    {
      drupal_id: 6,
      title: 'Lady Gaga',
      weight: 0,
      icon: null
    }
  ],
  tags_ancestors: [
    {
      drupal_id: 6,
      title: 'Lady Gaga',
      weight: 0,
      icon: null
    }
  ],
  title: 'Test 1',
  when_end: 1568370600,
  when_start: 1568326940,
  where: 'Over the Rainbow',
  when_duration: 7199
};

export const dummyEvents: EventModel[] = [
  dummyEvent,
  { ...dummyEvent, drupal_id: 24 }
];
