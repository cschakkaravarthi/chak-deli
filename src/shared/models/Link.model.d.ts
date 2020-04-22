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
export declare const dummyLink: Link;
export declare const minisiteDummyLinks: Link[];
export declare const dummyGroupedLinkContent: LinkGroupItems;
export declare const dummyGroupedLink: LinkGroup;
export declare const dummyGroupedLinks: LinkGroupItems[];
export declare const searchDummyLinks: Link;
//# sourceMappingURL=Link.model.d.ts.map