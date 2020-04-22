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
export declare const dummyDocument: DocumentSearch;
export declare const dummyDocuments: DocumentSearch[];
//# sourceMappingURL=Document.model.d.ts.map