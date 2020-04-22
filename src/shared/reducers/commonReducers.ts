import { Reducer } from 'redux';
import {
  TOGGLE_GLOBAL_TOAST,
  CommonState,
  CURRENT_USER_NAME,
  SET_REJECT_MODAL_ID_ISSHOW,
  SET_REJECT_MODAL_TEXTAREA,
  CurrentUser
} from '../types/commonTypes';
import RejectModal from './../models/RejectModal';

export const initialState = {
  displayToast: false,
  toastMessage: '',
  toastError: false,
  idAndIsShow: {} as RejectModal,
  textarea: '',
  currentUsername: {} as CurrentUser
};

const commonReducers: Reducer<CommonState, any> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case CURRENT_USER_NAME:
      return {
        ...state,
        currentUsername: action.currentUsername
      };
    case TOGGLE_GLOBAL_TOAST:
      return {
        ...state,
        displayToast: action.displayToast,
        toastMessage: action.toastMessage,
        toastError: action.toastError
      };
    case SET_REJECT_MODAL_ID_ISSHOW:
      return {
        ...state,
        idAndIsShow: action.idAndIsShow
      };
    case SET_REJECT_MODAL_TEXTAREA:
      return {
        ...state,
        textarea: action.textarea
      };
    default:
      return state;
  }
};

export default commonReducers;
