import { Reducer } from 'redux';
import {
  CLEAR_EVENTS_LIST,
  EventState,
  FETCH_MORE_EVENTS,
  LOAD_EVENT_BY_ID,
  LOAD_EVENTS,
  SET_EVENTS_FILTER_FACET
} from '../types/eventTypes';
import { EVENTS_LIMIT } from '../../constants/constants';

export const initialState = {
  eventsList: [],
  event: undefined,
  isLastPage: false,
  moreEventsList: [], // Why are there two event list properties?
  eventsFacets: {},
  selectedFacet: '0',
  pageCount: 1
};

const eventReducers: Reducer<EventState, any> = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_EVENTS:
      return {
        ...state,
        eventsList: action.eventsList,
        moreEventsList: initialState.moreEventsList
      };
    case FETCH_MORE_EVENTS:
      return {
        ...state,
        eventsList: initialState.eventsList,
        isLastPage: action.moreEventsList.length === 0 || action.moreEventsList.length < EVENTS_LIMIT,
        moreEventsList: [...state.moreEventsList, ...action.moreEventsList],
        eventsFacets: action.facets,
        pageCount: state.pageCount + 1
      };
    case LOAD_EVENT_BY_ID:
      return {
        ...state,
        event: action.event
      };
    case SET_EVENTS_FILTER_FACET:
      return {
        ...state,
        selectedFacet: action.selectedFacet,
        isLastPage: false,
        moreEventsList: [],
        pageCount: 1
      };
    case CLEAR_EVENTS_LIST:
      return {
        ...state,
        moreEventsList: initialState.moreEventsList,
        pageCount: 1,
        isLastPage: false
      };
    default:
      return state;
  }
};

export default eventReducers;
