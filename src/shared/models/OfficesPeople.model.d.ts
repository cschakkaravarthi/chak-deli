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
export declare type OfficePeopleCategory = TaxonomyTermModel;
export declare const dummyOfficesPeople: OfficesPeople[];
//# sourceMappingURL=OfficesPeople.model.d.ts.map