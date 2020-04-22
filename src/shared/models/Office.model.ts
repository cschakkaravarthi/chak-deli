import { TaxonomyTermModel } from '../types/contentTypes';

export type Cat = TaxonomyTermModel;

export interface AddressMap {
  addressTop: string;
  addressForMap: string;
}

export interface Office {
  type: string;
  ad_key?: string[];
  addressMap?: AddressMap;
  categories?: Cat[];
  drupal_id: number;
  location?: Cat[];
  title?: string;
  office_hours?: string;
  language?: string;
}

export interface OfficeSearch extends Office {
  street?: string;
  city?: string;
  country?: string;
  address?: string | JSX.Element;
}

export const dummySearchOffice: OfficeSearch = {
  type: 'Office',
  drupal_id: 135,
  title: 'vonPfister',
  address: '<p>21301 Burbank Blvd</p>\r\n\r\n<p>Woodland Hills, CA 91367</p>\r\n'
};

export const dummySearchOfficeData: OfficeSearch[] = [
  dummySearchOffice,
  { ...dummySearchOffice, drupal_id: 136 }
];

export const dummyOffice: Office = {
  type: 'office',
  ad_key: [
    'USWHB'
  ],
  addressMap: {
    addressTop: '<p>21301 Burbank Blvd</p>\r\n\r\n<p>Woodland Hills, CA 91367</p>\r\n',
    addressForMap: '21301 Burbank Blvd Woodland Hills, CA 91367'
  },
  categories: [
    {
      drupal_id: 118,
      title: 'North America',
      weight: 0,
      icon: null
    }
  ],
  drupal_id: 135,
  location: [
    {
      drupal_id: 13,
      title: 'Los Angeles Area',
      weight: 0,
      icon: null
    }
  ],
  title: 'Woodland Hills',
  office_hours: '<p>MON - FRI: 7:00AM - 9:00PM</p>\r\n\r\n<p>SAT:&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 8:00AM - 8:00PM</p>\r\n\r\n<p>SUN:&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 8:00AM - 6:00PM</p>\r\n',
  language: 'en'
};
