import {
  FETCH_LABEL_BY_ID,
  FETCH_LABELS,
  LOAD_LABEL_BY_ID,
  LOAD_LABELS,
  LoadLabelByIdAction,
  LoadLabelsAction
} from '../types/labelTypes';

import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import ApiService from '../services/apiService';
import { Label } from '../models/Label.model';

export const loadLabelById = (
  label: Label
): LoadLabelByIdAction => ({ label, type: LOAD_LABEL_BY_ID });

export const fetchLabelById = (labelId: number) => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    dispatch(() => ({ type: FETCH_LABEL_BY_ID }));
    return ApiService.getLabel(
      label => dispatch(loadLabelById(label)),
      labelId
    );
  };
};

export const loadLabels = (
  labels: Label[]
): LoadLabelsAction => ({ labels, type: LOAD_LABELS });

export const fetchLabels = () => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    dispatch(() => ({ type: FETCH_LABELS }));
    return ApiService.getLabels(
      labels => dispatch(loadLabels(labels))
    );
  };
};
