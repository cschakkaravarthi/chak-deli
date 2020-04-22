import {
  LOAD_EVENTS,
  LOAD_EVENT_BY_ID,
  FETCH_MORE_EVENTS
} from './../types/eventTypes';
import eventReducers, { initialState } from './eventReducers';
import { dummyEvents } from '../models/Event.model';
import { mockedFacets } from '../models/Facet.model';

describe('eventReducers', () => {
  it('Handles default case', () => {
    const state = eventReducers(undefined, {});
    expect(state).toEqual(initialState);
  });

  it('Handles loadEvents action', () => {
    const action = { type: LOAD_EVENTS, eventsList: dummyEvents };
    const state = eventReducers(undefined, action);
    expect(state).toMatchSnapshot();
  });

  it('Handles loadMoreEvents action', () => {
    const action = {
      type: FETCH_MORE_EVENTS,
      moreEventsList: dummyEvents,
      facets: mockedFacets
    };
    const state = eventReducers(undefined, action);
    expect(state).toMatchSnapshot();
  });

  it('Handles loadEventById action', () => {
    const action = { type: LOAD_EVENT_BY_ID, event: dummyEvents[0] };
    const state = eventReducers(undefined, action);
    expect(state).toMatchSnapshot();
  });
});
