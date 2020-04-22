import peopleReducers, { initialState } from './peopleReducers';
import { FETCH_MORE_PEOPLE } from '../types/peopleTypes';
import { dummyPeople } from '../models/People.model';

describe('peopleReducers', () => {
  it('Handles default case', () => {
    const state = peopleReducers(undefined, {});
    expect(state).toEqual(initialState);
  });

  it('Handles LOAD_PEOPLE action', () => {
    const action = { type: FETCH_MORE_PEOPLE, people: [dummyPeople] };
    const state = peopleReducers(undefined, action);
    expect(state).toMatchSnapshot();
  });
});
