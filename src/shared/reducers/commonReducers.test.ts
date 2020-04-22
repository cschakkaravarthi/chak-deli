import commonReducers, { initialState } from './commonReducers';

import {
  TOGGLE_GLOBAL_TOAST
} from '../types/commonTypes';

describe('appreciationReducers', () => {
  it('Handles default case', () => {
    const state = commonReducers(undefined, {});
    expect(state).toEqual(initialState);
  });

  it('Handles TOGGLE_GLOBAL_TOAST action', () => {
    const action = {
      type: TOGGLE_GLOBAL_TOAST,
      appreciationCardAlert: {
        displayToast: true,
        toastMessage: 'Successful Operation!'
      }
    };
    const state = commonReducers(initialState, action);
    expect(state).toMatchSnapshot();
  });
});
