import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import {
  LOAD_EVENTS,
  LOAD_EVENT_BY_ID,
  LoadEventsAction,
  FETCH_MORE_EVENTS,
  LoadEventByIdAction,
  LoadMoreEventsAction,
  SetEventsFilterFacetAction,
  SET_EVENTS_FILTER_FACET,
  ClearEventsListAction,
  CLEAR_EVENTS_LIST
} from '../types/eventTypes';
import ApiService from '../services/apiService';
import EventModel from '../models/Event.model';
import { FacetProperty } from '../../shared/models/Facet.model';
import { ContentWithFacet } from '../types/contentWithFacets';
import { ApplicationState } from '../reducers';

type ThunkResult<R> = ThunkAction<R, ApplicationState, undefined, AnyAction>;

const DEFAULT_FACET = '0';

export const loadMoreEvents = (response: ContentWithFacet): LoadMoreEventsAction => ({
  moreEventsList: response.eventsList,
  facets: response.facets,
  type: FETCH_MORE_EVENTS
});

export const fetchEvents = (limit?: number, sort?: string, facet?: string): ThunkResult<void> => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>, getState: () => ApplicationState): Promise<void> => {
    const {
      eventReducers: { selectedFacet, pageCount }
    } = getState();
    const eventCategory = selectedFacet !== DEFAULT_FACET ? selectedFacet : undefined;

    dispatch(() => ({ type: FETCH_MORE_EVENTS }));
    if (pageCount) {
      return ApiService.getEvents(res => dispatch(loadMoreEvents(res)), pageCount, limit, sort, facet, eventCategory);
    }
  };
};

export const loadEvents = (eventsList: EventModel[]): LoadEventsAction => ({
  eventsList,
  type: LOAD_EVENTS
});

export const fetchHomeEvents = (owner = ''): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    dispatch(() => ({ type: LOAD_EVENTS }));
    return ApiService.getHomeEvents(({ eventsList }) => dispatch(loadEvents(eventsList)), owner);
  };
};

export const loadEventById = (event: EventModel): LoadEventByIdAction => ({
  event,
  type: LOAD_EVENT_BY_ID
});

export const fetchEventById = (id: string): ThunkAction<Promise<void>, {}, {}, AnyAction> => async (
  dispatch: ThunkDispatch<{}, {}, AnyAction>
): Promise<void> => {
  dispatch(() => ({ type: LOAD_EVENT_BY_ID }));
  return ApiService.getEventById(event => dispatch(loadEventById(event[0])), id);
};

export const setEventsFilterFacet = (selectedFacet: FacetProperty): SetEventsFilterFacetAction => ({
  selectedFacet,
  type: SET_EVENTS_FILTER_FACET
});

export const clearEventsList = (): ClearEventsListAction => ({
  type: CLEAR_EVENTS_LIST
});

export function downloadAddToCalendarAction (id: string): Promise<any> {
  return ApiService.downloadAddToCalendarService(id);
}
