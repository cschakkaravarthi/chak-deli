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
export declare const dummyPageSearchData: PageSearch;
//# sourceMappingURL=Page.model.d.ts.map