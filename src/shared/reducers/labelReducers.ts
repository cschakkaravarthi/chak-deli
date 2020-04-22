import { Reducer } from 'redux';
import {
  LOAD_LABEL_BY_ID,
  LOAD_LABELS,
  LabelState
} from '../types/labelTypes';

export const initialState = {
  labels: []
};

const labelReducers: Reducer<LabelState, any> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case LOAD_LABEL_BY_ID:
      return {
        ...state,
        labels: [
          ...state.labels.filter(d => d.drupal_id !== action.label.drupal_id),
          action.label
        ]
      };
    case LOAD_LABELS: {
      return {
        ...state,
        labels: action.labels
      };
    }
    default:
      return state;
  }
};

export default labelReducers;
