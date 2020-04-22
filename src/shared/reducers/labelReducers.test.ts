import labelReducers, { initialState } from './labelReducers';
import { LOAD_LABELS } from '../types/labelTypes';
import { dummyLabelsArray } from '../models/Label.model';

describe('labelsReducers', () => {
  it('Handles default case', () => {
    const state = labelReducers(undefined, {});
    expect(state).toEqual(initialState);
  });

  it('Handles loadLabels action', () => {
    const action = {
      type: LOAD_LABELS,
      departments: dummyLabelsArray
    };
    const state = labelReducers(initialState, action);
    expect(state).toMatchSnapshot();
  });
});
