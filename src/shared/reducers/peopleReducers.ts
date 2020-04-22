import { Reducer } from 'redux';
import { CLEAR_PEOPLE, FETCH_MORE_PEOPLE, PeopleState } from '../types/peopleTypes';
import { PEOPLE_LIMIT } from '../../constants/constants';

export const initialState = {
  people: [],
  pageCount: 1,
  isLastPage: false
};

const peopleReducers: Reducer<PeopleState, any> = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MORE_PEOPLE:
      return {
        ...state,
        isLastPage: action.people.length === 0 || action.people.length < PEOPLE_LIMIT,
        people: [...state.people, ...action.people],
        pageCount: state.pageCount + 1
      };
    case CLEAR_PEOPLE:
      return {
        ...state,
        people: [],
        pageCount: 1,
        isLastPage: false
      };
    default:
      return state;
  }
};

export default peopleReducers;
