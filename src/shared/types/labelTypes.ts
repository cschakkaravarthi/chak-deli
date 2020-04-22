import { Label } from '../models/Label.model';

export const LOAD_LABEL_BY_ID = 'LOAD_LABEL_BY_ID';
export const FETCH_LABEL_BY_ID = 'FETCH_LABEL_BY_ID';
export const LOAD_LABELS = 'LOAD_LABELS';
export const FETCH_LABELS = 'FETCH_LABELS';
export const FETCH_CONTACTS = 'FETCH_CONTACTS';

export interface LabelState {
  labels: Label[];
}

export interface LoadLabelByIdAction {
  type: typeof LOAD_LABEL_BY_ID;
  label: Label;
}

export interface LoadLabelsAction {
  type: typeof LOAD_LABELS;
  labels: Label[];
}
