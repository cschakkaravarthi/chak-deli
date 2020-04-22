import {
  ToggleGlobalToastAction,
  TOGGLE_GLOBAL_TOAST,
  CURRENT_USER_NAME,
  SetCurrentUsername,
  SET_REJECT_MODAL_ID_ISSHOW,
  SET_REJECT_MODAL_TEXTAREA,
  SetRejectModalIdIsShow,
  SetRejectModalTextarea,
  CurrentUser
} from '../types/commonTypes';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import RejectModal from './../models/RejectModal';

export const setCurrentUsername = (currentUsername: CurrentUser): SetCurrentUsername => ({
  currentUsername,
  type: CURRENT_USER_NAME
});

const toastTimeOut = 3000;

export const toggleGlobalToast = (
  displayToast: boolean,
  toastMessage: string,
  toastError: boolean
): ToggleGlobalToastAction => ({
  displayToast,
  toastMessage,
  toastError,
  type: TOGGLE_GLOBAL_TOAST
});

export const triggerToast = (
  toastMessage: string,
  toastError = false
): ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>): void => {
    dispatch(toggleGlobalToast(true, toastMessage, toastError));
    // Hide toast automatically
    setTimeout(() => {
      dispatch(toggleGlobalToast(false, '', toastError));
    }, toastTimeOut);
  };
};

export const setRejectModalIdIsShow = (
  idAndIsShow: RejectModal
): SetRejectModalIdIsShow => ({
  idAndIsShow,
  type: SET_REJECT_MODAL_ID_ISSHOW
});

export const setRejectModalTextarea = (
  textarea: string
): SetRejectModalTextarea => ({
  textarea,
  type: SET_REJECT_MODAL_TEXTAREA
});

export const setReject = (
  isShow: boolean,
  sysId: string
): ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>): void => {
    dispatch(setRejectModalIdIsShow({ isShow: isShow, sysId: sysId }));
  };
};

export const setTextarea = (
  textarea: string
): ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>): void => {
    dispatch(setRejectModalTextarea(textarea));
  };
};
