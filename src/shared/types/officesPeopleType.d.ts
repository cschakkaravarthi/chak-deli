import OfficesPeople, { OfficePeopleCategory } from '../models/OfficesPeople.model';
export declare const LOAD_OFFICES_PEOPLE = "LOAD_OFFICES_PEOPLE";
export declare const FETCH_OFFICES_PEOPLE = "FETCH_OFFICES_PEOPLE";
export declare const FILTER_OFFICES_PEOPLE = "FILTER_OFFICES_PEOPLE";
export interface OfficesPeopleState {
    officesPeople: OfficesPeople[];
    officesPeopleFilteredList: OfficesPeople[];
    officeCategories: OfficePeopleCategory[];
}
export interface LoadOfficesPeopleAction {
    type: typeof LOAD_OFFICES_PEOPLE;
    officesPeople: OfficesPeople[];
}
//# sourceMappingURL=officesPeopleType.d.ts.map