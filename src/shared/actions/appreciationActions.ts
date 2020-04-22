import { ThunkDispatch } from 'redux-thunk';

import { AnyAction } from 'redux';
import get from 'lodash.get';

import {
  ALERT_TYPE_RECEIVED,
  APPRRECITONS_CARDS_GROUPED_LIMIT,
  LOAD_MORE_APPRECIATION_CARDS_OF_TYPE
} from '../../constants/constants';

import {
  FetchRequest,
  ArchiveAlertState,
  ARCHIVE_ALERT_STATE,
  APPRECIATION_CARD_ID,
  ClearAprreciationAction,
  LOAD_APPRECIATION_ALERT,
  FETCH_APPRECIATION_DATA,
  AppreciationCardAlertError,
  CLEAR_APPRECIATION_REDUCER,
  LoadAppreciationAlertAction,
  LOAD_APPRECIATION_ALERT_ERROR,
  LOAD_APPRECIATION_MANAGER_ALERT,
  LoadAppreciationManagerAlertAction,
  SetNewCardDetailAction,
  SET_NEW_CARD_DETAIL,
  FetchAppreciationCardTemplatesAction,
  FETCH_CARD_TEMPLATES,
  SetDetailGroupAction,
  NewAppreciationCardForm,
  ClearNewCardFormAction,
  CLEAR_NEW_CARD_FORM,
  ToggleSentSuccessAlert,
  TOGGLE_SUCCESS_SENT_ALERT,
  GET_APPRECIATION_CARDS_LIST_GROUPED,
  GetAppreciationCardsListGroupedAction,
  ViewAppreciationCardAction,
  VIEW_APPRECIATION_CARD,
  AddAppreciationCardsToGroupAction,
  LOAD_CARDS_IN_GROUP
} from '../types/appreciationTypes';

import { AppreciationCardNotificationModel as AlertModel } from '../models/Notification.model';
import { ApiErrorModel } from '../models/Error.model';
import { AppreciationCardTemplate, AppreciationCardsListGrouped } from '../models/AppreciationCards.model';
import { triggerToast } from './commonActions';
import { ApplicationState } from '../reducers';

import ApiService from '../services/apiService';

export const toggleSentSuccessAlert = (showSentSucessAlert: boolean): ToggleSentSuccessAlert => ({
  type: TOGGLE_SUCCESS_SENT_ALERT,
  showSentSucessAlert
});

export const sendAppreciationCard = (formDetails: NewAppreciationCardForm) => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    dispatch(() => ({ type: FETCH_APPRECIATION_DATA }));
    return ApiService.sendAppreciationCard(
      () => dispatch(toggleSentSuccessAlert(true)),
      () => dispatch(triggerToast('Error sending appreciation card.', true)),
      formDetails
    );
  };
};

export const archiveAlertState = (cardArchiveSuccess: boolean): ArchiveAlertState => ({
  cardArchiveSuccess,
  type: ARCHIVE_ALERT_STATE
});

export const archiveAlertAction = (cardId: string) => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    dispatch(() => ({ type: APPRECIATION_CARD_ID }));
    return ApiService.archiveAppreciationAlert(
      () => dispatch(archiveAlertState(true)),
      () => dispatch(triggerToast('Error archiving appreciation alert.', true)),
      cardId
    );
  };
};

export const clearAppreciationAction = (): ClearAprreciationAction => ({
  type: CLEAR_APPRECIATION_REDUCER
});

export const loadAppreciationAlertAction = (appreciationCardAlert: AlertModel[]): LoadAppreciationAlertAction => ({
  appreciationCardAlert,
  isFetching: true,
  type: LOAD_APPRECIATION_ALERT
});

export const loadAppreciationManagerAlertAction = (
  appreciationManagerCardAlert: AlertModel[]
): LoadAppreciationManagerAlertAction => ({
  appreciationManagerCardAlert,
  isFetching: false,
  type: LOAD_APPRECIATION_MANAGER_ALERT
});

export const loadAppreciationError = (error: ApiErrorModel): AppreciationCardAlertError => {
  let appreciationCardAlertError;

  if (error) {
    appreciationCardAlertError = true;
  }

  return {
    isFetching: !appreciationCardAlertError,
    type: LOAD_APPRECIATION_ALERT_ERROR,
    appreciationCardAlertError
  };
};

export const fetchRequest = (): FetchRequest => ({ type: FETCH_APPRECIATION_DATA, isFetching: true });

export const fetchAppreciationCardData = (alertType?: string) => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    dispatch(fetchRequest());
    return ApiService.getAppreciationData(
      alertType === ALERT_TYPE_RECEIVED
        ? appreciationCardAlert => dispatch(loadAppreciationAlertAction(appreciationCardAlert))
        : appreciationManagerCardAlert => dispatch(loadAppreciationManagerAlertAction(appreciationManagerCardAlert)),
      error => dispatch(loadAppreciationError(error)),
      alertType,
      '30'
    );
  };
};

export const setNewCardDetail = (field: string, value: string): SetNewCardDetailAction => ({
  payload: {
    [field]: value
  },
  type: SET_NEW_CARD_DETAIL
});

export const setDetailGroup = (payload: NewAppreciationCardForm): SetDetailGroupAction => ({
  payload,
  type: SET_NEW_CARD_DETAIL
});

export const clearNewCardForm = (): ClearNewCardFormAction => ({
  type: CLEAR_NEW_CARD_FORM
});

export const fetchCardTemplates = (
  cardTemplates: AppreciationCardTemplate[]
): FetchAppreciationCardTemplatesAction => ({
  type: FETCH_CARD_TEMPLATES,
  cardTemplates
});

export const getAppreciationCardTemplates = () => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    dispatch(() => ({ type: FETCH_APPRECIATION_DATA }));
    return ApiService.retrieveAppreciationCardTemplates(
      res => dispatch(fetchCardTemplates(res)),
      () => dispatch(triggerToast('Error getting appreciation card templates.', true))
    );
  };
};

export const setAppreciationCardsListGrouped = (
  appreciationCardsListGrouped: AppreciationCardsListGrouped
): GetAppreciationCardsListGroupedAction => ({
  type: GET_APPRECIATION_CARDS_LIST_GROUPED,
  appreciationCardsListGrouped
});

export const getAppreciationCardsListGrouped = () => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>, getState: () => ApplicationState): Promise<void> => {
    dispatch(() => ({ type: FETCH_APPRECIATION_DATA }));
    const { userProfileReducers } = getState();
    const myEmail = get(userProfileReducers, 'userProfileDetails.email', '');

    const successCallback = (appreciationCards: AlertModel[]): void => {
      const received: AlertModel[] = [];
      const sent: AlertModel[] = [];
      const team: AlertModel[] = [];

      if (appreciationCards && appreciationCards.length) {
        appreciationCards.forEach((card: AlertModel) => {
          if (card.recipientSupervisorEmail === myEmail.toLowerCase()) {
            team.push(card);
          } else if (card.recipientEmail === myEmail.toLowerCase()) {
            received.push(card);
          } else if (card.senderEmail === myEmail.toLowerCase()) {
            sent.push(card);
          }
        });
      }
      dispatch(
        setAppreciationCardsListGrouped({
          received,
          sent,
          team
        })
      );
    };
    return ApiService.getAppreciationData(
      appreciationCards => successCallback(appreciationCards),
      () => dispatch(triggerToast('Error retrieving appreciation cards.', true)),
      'all',
      APPRRECITONS_CARDS_GROUPED_LIMIT
    );
  };
};

const addAppreciationCardsToGroup = (
  cardsType: string,
  appreciationCards: AlertModel[]
): AddAppreciationCardsToGroupAction => ({
  type: LOAD_CARDS_IN_GROUP,
  cardsType,
  appreciationCards
});

export const getAppreciationCardsByType = (cardType: string, offsetKey?: string) => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>, getState: () => ApplicationState): Promise<void> => {
    const successCallback = (appreciationCards: AlertModel[]): void => {
      const {
        appreciationReducers: { appreciationCardsListGrouped }
      } = getState();
      const cardsGroup = get(appreciationCardsListGrouped, `[${cardType}]`, []);
      const updatedGroup = cardsGroup.concat(appreciationCards);
      dispatch(addAppreciationCardsToGroup(cardType, updatedGroup));
    };
    return ApiService.getAppreciationData(
      appreciationCards => successCallback(appreciationCards),
      error => dispatch(loadAppreciationError(error)),
      cardType,
      LOAD_MORE_APPRECIATION_CARDS_OF_TYPE,
      offsetKey
    );
  };
};

export const viewAppreciationCard = (
  displayCardView: boolean,
  cardToView?: AlertModel
): ViewAppreciationCardAction => ({
  displayCardView,
  cardToView,
  type: VIEW_APPRECIATION_CARD
});
