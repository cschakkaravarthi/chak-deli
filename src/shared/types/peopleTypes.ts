import PeopleModel from '../models/People.model';

export const CLEAR_PEOPLE = 'CLEAR_PEOPLE';
export const FETCH_MORE_PEOPLE = 'FETCH_MORE_PEOPLE';

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
