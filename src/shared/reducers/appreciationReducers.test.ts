import appreciationReducers, { initialState } from './appreciationReducers';

import {
  SET_NEW_CARD_DETAIL,
  ARCHIVE_ALERT_STATE,
  APPRECIATION_CARD_ID,
  LOAD_APPRECIATION_ALERT,
  CLEAR_APPRECIATION_REDUCER,
  LOAD_APPRECIATION_ALERT_ERROR
} from '../types/appreciationTypes';

import { dummyAppreciationCardNotification } from '../models/Notification.model';

describe('appreciationReducers', () => {
  it('Handles default case', () => {
    const state = appreciationReducers(undefined, {});
    expect(state).toEqual(initialState);
  });

  it('Handles APPRECIATION_CARD_ID action', () => {
    const action = { type: APPRECIATION_CARD_ID, cardId: '1' };
    const state = appreciationReducers(initialState, action);
    expect(state).toMatchSnapshot();
  });

  it('Handles ARCHIVE_ALERT_STATE action', () => {
    const action = { type: ARCHIVE_ALERT_STATE, cardArchiveSuccess: true };
    const state = appreciationReducers(initialState, action);
    expect(state).toMatchSnapshot();
  });

  it('Handles LOAD_APPRECIATION_ALERT action', () => {
    const action = { type: LOAD_APPRECIATION_ALERT, appreciationCardAlert: [dummyAppreciationCardNotification] };
    const state = appreciationReducers(initialState, action);
    expect(state).toMatchSnapshot();
  });

  it('Handles LOAD_APPRECIATION_ALERT_ERROR action', () => {
    const action = { type: LOAD_APPRECIATION_ALERT_ERROR, appreciationCardAlertError: true };
    const state = appreciationReducers(initialState, action);
    expect(state).toMatchSnapshot();
  });

  it('Handles CLEAR_APPRECIATION_REDUCER action', () => {
    const action = {
      type: CLEAR_APPRECIATION_REDUCER,
      appreciationCardAlert: initialState.appreciationCardAlert,
      appreciationCardAlertError: initialState.appreciationCardAlertError
    };

    const state = appreciationReducers(initialState, action);
    expect(state).toMatchSnapshot();
  });

  it('Handles SET_NEW_CARD_DETAIL action', () => {
    const action = {
      type: SET_NEW_CARD_DETAIL,
      payload: { cardMessage: 'Card Message' }
    };

    const state = appreciationReducers(initialState, action);
    expect(state).toMatchSnapshot();
  });
});
