import { BaseContentModel, TaxonomyTermModel } from '../types/contentTypes';

export default interface BoxModel extends BaseContentModel {
  categories: TaxonomyTermModel[];
  category_ancestors: TaxonomyTermModel[];
  drupal_id: number;
  language: string;
  owner: TaxonomyTermModel[];
  summary: string;
  title: string;
  type: 'box';
}
