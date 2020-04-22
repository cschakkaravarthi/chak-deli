import Link from '../models/Link.model';
import Article from '../models/Article.model';
import EventModel from '../models/Event.model';
import { Page } from '../models/Page.model';
import { DocumentSearch } from '../models/Document.model';
import { Department } from '../models/Department.model';
import BoxModel from '../models/Box.model';
export interface TaxonomyTermModel {
    drupal_id: number;
    title: string;
    weight?: number;
    icon?: any;
}
export interface BaseContentModel {
    type: string;
    drupal_id: number;
    title: string;
    summary?: string;
    categories: TaxonomyTermModel[];
    category_ancestors: TaxonomyTermModel[];
    owner: TaxonomyTermModel[];
}
export declare type VariousContentModel = Link | Article | EventModel | Page | DocumentSearch | Department | BoxModel;
export interface VariousContentGroupModel extends TaxonomyTermModel {
    content: VariousContentModel[];
}
export interface ContentStateModel {
    content: ContentCategorizedStorageModel;
    groupedContent: ContentGroupedCategorizedStorageModel;
}
export interface ContentGroupedCategorizedStorageModel {
    [key: string]: VariousContentGroupModel[];
}
export interface ContentCategorizedStorageModel {
    [key: string]: VariousContentModel[];
}
export declare const FETCH_CONTENT = "FETCH_CONTENT";
export declare const LOAD_CONTENT = "LOAD_CONTENT";
export declare const FETCH_GROUPED_CONTENT = "FETCH_GROUPED_CONTENT";
export declare const LOAD_GROUPED_CONTENT = "LOAD_GROUPED_CONTENT";
export interface LoadGroupedContentAction {
    type: typeof LOAD_GROUPED_CONTENT;
    content: VariousContentGroupModel[];
    filterId: string;
}
export interface LoadContentAction {
    type: typeof LOAD_CONTENT;
    content: VariousContentModel[];
    filterId: string;
}
export declare const dummyVariousContentGroup: VariousContentGroupModel;
export declare const dummyVariousContent: VariousContentModel[];
export declare const dummyContentGroupedCategorizedStorage: ContentGroupedCategorizedStorageModel;
//# sourceMappingURL=contentTypes.d.ts.map