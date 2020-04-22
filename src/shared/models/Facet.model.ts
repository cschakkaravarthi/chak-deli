import { TaxonomyTermModel } from '../types/contentTypes';

export type FacetProperty = TaxonomyTermModel;

export default interface Facet {
  office_category?: FacetProperty[];
  article_category?: FacetProperty[];
  tags?: FacetProperty[];
  owner?: FacetProperty[];
  category?: FacetProperty[];
}

export const mockedFacets: Facet = {
  tags: [
    {
      title: 'string',
      drupal_id: 1,
      icon: 'string',
      weight: 1
    }
  ]
};
