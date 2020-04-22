import { AppreciationCardNotificationModel as AlertModel } from '../models/Notification.model';
import { AppreciationCardTemplate, AppreciationCardsListGrouped } from '../models/AppreciationCards.model';

export const FETCH_APPRECIATION_DATA = 'FETCH_APPRECIATION_DATA';
export const LOAD_APPRECIATION_ALERT = 'LOAD_APPRECIATION_ALERT';
export const LOAD_APPRECIATION_ALERT_ERROR = 'LOAD_APPRECIATION_ALERT_ERROR';
export const CLEAR_APPRECIATION_REDUCER = 'CLEAR_APPRECIATION_REDUCER';
export const LOAD_APPRECIATION_MANAGER_ALERT = 'LOAD_APPRECIATION_MANAGER_ALERT';
export const SET_NEW_CARD_DETAIL = 'SET_NEW_CARD_DETAIL';
export const FETCH_CARD_TEMPLATES = 'FETCH_CARD_TEMPLATES';
export const CLEAR_NEW_CARD_FORM = 'CLEAR_NEW_CARD_FORM';
export const TOGGLE_SUCCESS_SENT_ALERT = 'TOGGLE_SUCCESS_SENT_ALERT';
export const GET_APPRECIATION_CARDS_LIST_GROUPED = 'GET_APPRECIATION_CARDS_LIST_GROUPED';
export const VIEW_APPRECIATION_CARD = 'VIEW_APPRECIATION_CARD';
export const APPRECIATION_CARD_ID = 'APPRECIATION_CARD_ID';
export const ARCHIVE_ALERT_STATE = 'ARCHIVE_ALERT_STATE';
export const LOAD_CARDS_IN_GROUP = 'LOAD_CARDS_IN_GROUP';

export interface AppreciationState {
  cardId: string;
  cardArchiveSuccess: boolean;
  isFetching: boolean;
  appreciationCardAlert?: AlertModel[];
  appreciationCardAlertError?: boolean;
  appreciationManagerCardAlert?: AlertModel[];
  newAppreciationCardForm: NewAppreciationCardForm;
  cardTemplates: AppreciationCardTemplate[];
  showSentSucessAlert: boolean;
  appreciationCardsListGrouped?: AppreciationCardsListGrouped;
  cardToView?: AlertModel;
  displayCardView: boolean;
}

export interface NewAppreciationCardForm {
  senderName?: string;
  templateId?: string;
  cardMessage?: string;
  recipientEmail?: string;
  recipientLastName?: string;
  recipientFirstName?: string;
  recipientSupervisorEmail?: string;
  managerName?: string;
}

export interface ArchiveAlertState {
  cardArchiveSuccess: boolean;
  type: typeof ARCHIVE_ALERT_STATE;
}

export interface SetArchiveAlert {
  cardId: string;
  type: typeof APPRECIATION_CARD_ID;
}

export interface FetchRequest {
  isFetching: boolean;
  type: typeof FETCH_APPRECIATION_DATA;
}

export interface LoadAppreciationAlertAction {
  isFetching: boolean;
  type: typeof LOAD_APPRECIATION_ALERT;
  appreciationCardAlert: AlertModel[];
}

export interface LoadAppreciationManagerAlertAction {
  isFetching: boolean;
  type: typeof LOAD_APPRECIATION_MANAGER_ALERT;
  appreciationManagerCardAlert: AlertModel[];
}

export interface AppreciationCardAlertError {
  isFetching: boolean;
  type: typeof LOAD_APPRECIATION_ALERT_ERROR;
  appreciationCardAlertError?: boolean;
}

export interface ClearAprreciationAction {
  type: typeof CLEAR_APPRECIATION_REDUCER;
}

export interface SetNewCardDetailAction {
  type: typeof SET_NEW_CARD_DETAIL;
  payload: NewAppreciationCardForm;
}

export interface SetDetailGroupAction {
  type: typeof SET_NEW_CARD_DETAIL;
  payload: NewAppreciationCardForm;
}

export interface FetchAppreciationCardTemplatesAction {
  type: typeof FETCH_CARD_TEMPLATES;
  cardTemplates: AppreciationCardTemplate[];
}

export interface ClearNewCardFormAction {
  type: typeof CLEAR_NEW_CARD_FORM;
}

export interface ToggleSentSuccessAlert {
  type: typeof TOGGLE_SUCCESS_SENT_ALERT;
  showSentSucessAlert: boolean;
}

export interface GetAppreciationCardsListGroupedAction {
  type: typeof GET_APPRECIATION_CARDS_LIST_GROUPED;
  appreciationCardsListGrouped: AppreciationCardsListGrouped;
}

export interface ViewAppreciationCardAction {
  type: typeof VIEW_APPRECIATION_CARD;
  displayCardView: boolean;
  cardToView?: AlertModel;
}

export interface AddAppreciationCardsToGroupAction {
  type: typeof LOAD_CARDS_IN_GROUP;
  appreciationCards: AlertModel[];
  cardsType: string;
}
