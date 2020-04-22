import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

import ApiService from '../services/apiService';

import {
  CLEAR_PEOPLE,
  ClearPeopleAction,
  FETCH_MORE_PEOPLE,
  LoadMorePeopleAction
} from '../types/peopleTypes';

import PeopleModel from '../models/People.model';
import { ApplicationState } from '../reducers';

export const loadPeople = (people: PeopleModel[]): LoadMorePeopleAction => ({
  people,
  type: FETCH_MORE_PEOPLE
});

type ThunkResult<R> = ThunkAction<R, ApplicationState, undefined, AnyAction>;

export const fetchPeople = (
  sitecode: string,
  startsWith?: string,
  limit?: number
): ThunkResult<void> => {
  return async (
    dispatch: ThunkDispatch<{}, {}, AnyAction>,
    getState: () => ApplicationState
  ): Promise<void> => {
    const {
      peopleReducers: { pageCount }
    } = getState();

    dispatch(() => ({ type: FETCH_MORE_PEOPLE }));
    return ApiService.getPeople(
      people => dispatch(loadPeople(people)),
      sitecode,
      startsWith,
      pageCount,
      limit
    );
  };
};

export const clearPeople = (): ClearPeopleAction => ({ type: CLEAR_PEOPLE });
