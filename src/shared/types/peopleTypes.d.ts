import PeopleModel from '../models/People.model';
export declare const CLEAR_PEOPLE = "CLEAR_PEOPLE";
export declare const FETCH_MORE_PEOPLE = "FETCH_MORE_PEOPLE";
export interface PeopleState {
    pageCount: number;
    isLastPage: boolean;
    people: PeopleModel[];
}
export interface LoadMorePeopleAction {
    type: typeof FETCH_MORE_PEOPLE;
    people?: PeopleModel[];
}
export interface ClearPeopleAction {
    type: typeof CLEAR_PEOPLE;
}
//# sourceMappingURL=peopleTypes.d.ts.map