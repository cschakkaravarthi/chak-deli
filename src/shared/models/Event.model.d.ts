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
export declare const dummyEvent: EventModel;
export declare const dummyEvents: EventModel[];
//# sourceMappingURL=Event.model.d.ts.map