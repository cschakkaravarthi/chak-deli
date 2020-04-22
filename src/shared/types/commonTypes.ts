import RejectModal from './../models/RejectModal';

export const CURRENT_USER_NAME = 'CURRENT_USER_NAME';
export const TOGGLE_GLOBAL_TOAST = 'TOGGLE_GLOBAL_TOAST';
export const SET_REJECT_MODAL_TEXTAREA = 'SET_REJECT_MODAL_TEXTAREA';
export const SET_REJECT_MODAL_ID_ISSHOW = 'SET_REJECT_MODAL_ID_ISSHOW';

export interface ToggleGlobalToastAction {
  type: typeof TOGGLE_GLOBAL_TOAST;
  displayToast: boolean;
  toastMessage: string;
  toastError: boolean;
}

export type CurrentUser = {
  family_name: string;
  given_name: string;
};

export interface SetCurrentUsername {
  type: typeof CURRENT_USER_NAME;
  currentUsername: CurrentUser;
}

export interface CommonState {
  currentUsername: CurrentUser;
  displayToast: boolean;
  toastMessage: string;
  toastError: boolean;
  idAndIsShow: RejectModal;
  textarea: string;
}

export interface SetRejectModalIdIsShow {
  type: typeof SET_REJECT_MODAL_ID_ISSHOW;
  idAndIsShow: RejectModal;
}

export interface SetRejectModalTextarea {
  type: typeof SET_REJECT_MODAL_TEXTAREA;
  textarea: string;
}
