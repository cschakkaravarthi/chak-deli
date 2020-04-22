import { BaseContentModel, TaxonomyTermModel } from '../types/contentTypes';

export interface DocumentSearch extends BaseContentModel {
  type: string;
  drupal_id: number;
  title: string;
  summary?: string;
  document_uri: string;
  categories: TaxonomyTermModel[];
  category_ancestors: TaxonomyTermModel[];
  owner: TaxonomyTermModel[];
}

export const dummyDocument: DocumentSearch = {
  type: 'Office',
  summary: 'test summary',
  drupal_id: 1,
  title: 'vonPfister',
  owner: [],
  categories: [],
  category_ancestors: [],
  document_uri: 's3://2019-11/Drupal screens_Observations.docx'
};

export const dummyDocuments: DocumentSearch[] = [
  dummyDocument,
  { ...dummyDocument, drupal_id: 2 }
];
