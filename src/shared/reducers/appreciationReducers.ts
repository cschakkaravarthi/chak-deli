import { Reducer } from 'redux';

import {
  AppreciationState,
  FETCH_APPRECIATION_DATA,
  LOAD_APPRECIATION_ALERT,
  CLEAR_APPRECIATION_REDUCER,
  LOAD_APPRECIATION_ALERT_ERROR,
  LOAD_APPRECIATION_MANAGER_ALERT,
  SET_NEW_CARD_DETAIL,
  FETCH_CARD_TEMPLATES,
  CLEAR_NEW_CARD_FORM,
  TOGGLE_SUCCESS_SENT_ALERT,
  GET_APPRECIATION_CARDS_LIST_GROUPED,
  VIEW_APPRECIATION_CARD,
  ARCHIVE_ALERT_STATE,
  APPRECIATION_CARD_ID,
  LOAD_CARDS_IN_GROUP
} from '../types/appreciationTypes';

export const initialState = {
  cardId: '',
  isFetching: false,
  appreciationCardAlert: undefined,
  appreciationCardAlertError: false,
  appreciationManagerCardAlert: undefined,
  newAppreciationCardForm: {
    templateId: '',
    recipientEmail: '',
    recipientFirstName: '',
    recipientLastName: '',
    cardMessage: '',
    recipientSupervisorEmail: '',
    managerName: ''
  },
  cardTemplates: [],
  showSentSucessAlert: false,
  appreciationCardsListGrouped: {
    sent: [],
    received: [],
    team: []
  },
  cardToView: undefined,
  displayCardView: false,
  cardArchiveSuccess: false
};

const appreciationReducers: Reducer<AppreciationState, any> = (state = initialState, action) => {
  switch (action.type) {
    case APPRECIATION_CARD_ID:
      return {
        ...state,
        cardId: action.cardId
      };
    case ARCHIVE_ALERT_STATE:
      return {
        ...state,
        cardArchiveSuccess: action.cardArchiveSuccess
      };
    case FETCH_APPRECIATION_DATA:
      return {
        ...state,
        isFetching: action.isFetching
      };
    case LOAD_APPRECIATION_ALERT:
      return {
        ...state,
        isFetching: action.isFetching,
        appreciationCardAlert: action.appreciationCardAlert,
        appreciationCardAlertError: false
      };
    case LOAD_APPRECIATION_MANAGER_ALERT:
      return {
        ...state,
        isFetching: action.isFetching,
        appreciationManagerCardAlert: action.appreciationManagerCardAlert,
        appreciationCardAlertError: false
      };
    case LOAD_APPRECIATION_ALERT_ERROR:
      return {
        ...state,
        isFetching: action.isFetching,
        appreciationCardAlertError: true
      };
    case CLEAR_APPRECIATION_REDUCER:
      return {
        ...state,
        isFetching: initialState.isFetching,
        appreciationCardAlert: initialState.appreciationCardAlert,
        appreciationCardAlertError: initialState.appreciationCardAlertError,
        appreciationManagerCardAlert: initialState.appreciationManagerCardAlert
      };
    case SET_NEW_CARD_DETAIL:
      return {
        ...state,
        newAppreciationCardForm: {
          ...state.newAppreciationCardForm,
          ...action.payload
        }
      };
    case FETCH_CARD_TEMPLATES:
      return {
        ...state,
        cardTemplates: action.cardTemplates
      };
    case CLEAR_NEW_CARD_FORM:
      return {
        ...state,
        newAppreciationCardForm: initialState.newAppreciationCardForm
      };
    case TOGGLE_SUCCESS_SENT_ALERT:
      return {
        ...state,
        showSentSucessAlert: action.showSentSucessAlert
      };
    case GET_APPRECIATION_CARDS_LIST_GROUPED:
      return {
        ...state,
        appreciationCardsListGrouped: action.appreciationCardsListGrouped
      };
    case VIEW_APPRECIATION_CARD:
      return {
        ...state,
        cardToView: action.displayCardView ? action.cardToView : initialState.cardToView,
        displayCardView: action.displayCardView
      };
    case LOAD_CARDS_IN_GROUP:
      return {
        ...state,
        appreciationCardsListGrouped: {
          ...state.appreciationCardsListGrouped,
          [action.cardsType]: action.appreciationCards
        }
      };
    default:
      return state;
  }
};

export default appreciationReducers;
