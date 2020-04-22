import OfficesPeople, { OfficePeopleCategory } from '../models/OfficesPeople.model';

export const LOAD_OFFICES_PEOPLE = 'LOAD_OFFICES_PEOPLE';
export const FETCH_OFFICES_PEOPLE = 'FETCH_OFFICES_PEOPLE';
export const FILTER_OFFICES_PEOPLE = 'FILTER_OFFICES_PEOPLE';

export interface OfficesPeopleState {
    officesPeople: OfficesPeople[];
    officesPeopleFilteredList: OfficesPeople[];
    officeCategories: OfficePeopleCategory[];
}

export interface LoadOfficesPeopleAction {
    type: typeof LOAD_OFFICES_PEOPLE;
    officesPeople: OfficesPeople[];
}
