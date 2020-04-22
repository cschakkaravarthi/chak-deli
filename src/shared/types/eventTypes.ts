import EventModel from '../models/Event.model';
import Facet, { FacetProperty } from '../models/Facet.model';

export const LOAD_EVENTS = 'LOAD_EVENTS';
export const LOAD_EVENT_BY_ID = 'LOAD_EVENT_BY_ID';
export const FETCH_MORE_EVENTS = 'FETCH_MORE_EVENTS';
export const SET_EVENTS_FILTER_FACET = 'SET_EVENTS_FILTER_FACET';
export const CLEAR_EVENTS_LIST = 'CLEAR_EVENTS_LIST';

export interface EventState {
  event?: EventModel;
  isLastPage: boolean;
  eventsList: EventModel[];
  moreEventsList: EventModel[];
  eventsFacets: Facet;
  selectedFacet: string;
  pageCount: number;
}

export interface LoadMoreEventsAction {
  type: typeof FETCH_MORE_EVENTS;
  moreEventsList?: EventModel[];
  facets?: Facet;
}

export interface LoadEventsAction {
  type: typeof LOAD_EVENTS;
  eventsList: EventModel[];
}

export interface LoadEventByIdAction {
  type: typeof LOAD_EVENT_BY_ID;
  event: EventModel;
}

export interface SetEventsFilterFacetAction {
  type: typeof SET_EVENTS_FILTER_FACET;
  selectedFacet: FacetProperty;
}

export interface ClearEventsListAction {
  type: typeof CLEAR_EVENTS_LIST;
}
