import officeReducers, { initialState } from './officeReducers';

import {
  LOAD_OFFICE_BY_ID,
  LOAD_OFFICE_BY_ID_ERROR
} from '../types/officeTypes';

import { dummyOffice } from '../models/Office.model';

describe('officeReducers', () => {
  it('Handles default case', () => {
    const state = officeReducers(undefined, {});
    expect(state).toEqual(initialState);
  });

  it('Handles LoadOfficeAction action', () => {
    const action = { type: LOAD_OFFICE_BY_ID, office: dummyOffice };
    const state = officeReducers(initialState, action);
    expect(state).toMatchSnapshot();
  });

  it('Handles OfficeError action', () => {
    const action = { type: LOAD_OFFICE_BY_ID_ERROR, profileDataError: true };
    const state = officeReducers(initialState, action);
    expect(state).toMatchSnapshot();
  });
});
