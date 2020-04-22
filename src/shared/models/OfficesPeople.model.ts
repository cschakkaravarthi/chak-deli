import { TaxonomyTermModel } from '../types/contentTypes';

export default interface OfficesPeople {
  drupal_id?: number;
  placeName?: string;
  officeList?: OfficeItem[];
}

export interface OfficeItem {
  drupal_id?: number;
  title?: string;
  address?: string;
  type?: string;
  officeCategories?: OfficePeopleCategory[];
  location?: OfficePeopleCategory[];
}

export type OfficePeopleCategory = TaxonomyTermModel;

// --dummy data
export const dummyOfficesPeople: OfficesPeople[] = [
  {
    placeName: 'New York',
    officeList: [
      {
        title: 'Office Name',
        address: '21301 burbank blvdWoodland hills, CA',
        type: 'office',
        officeCategories: [{ drupal_id: 1, title: 'test', weight: 1, icon: 'test.png' }]
      },
      {
        title: 'Office Name',
        address: '21301 burbank blvdWoodland hills, CA',
        type: 'office'
      }
    ]
  },
  {
    drupal_id: 2,
    placeName: 'Asia',
    officeList: [
      {
        title: 'Office Name',
        address: '21301 burbank blvdWoodland hills, CA',
        type: 'office'
      },
      {
        title: 'Office Name',
        address: '21301 burbank blvdWoodland hills, CA',
        type: 'office'
      }
    ]
  },
  {
    drupal_id: 3,
    placeName: 'North America',
    officeList: [
      {
        title: 'Office Name',
        address: '21301 burbank blvdWoodland hills, CA'
      },
      {
        title: 'Office Name',
        address: '21301 burbank blvdWoodland hills, CA'
      }
    ]
  },
  {
    drupal_id: 4,
    placeName: 'Europe',
    officeList: [
      {
        title: 'Office Name',
        address: '21301 burbank blvdWoodland hills, CA'
      },
      {
        title: 'Office Name',
        address: '21301 burbank blvdWoodland hills, CA'
      }
    ]
  }
];
