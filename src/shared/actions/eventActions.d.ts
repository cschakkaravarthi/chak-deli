import { ThunkAction } from 'redux-thunk';
import { AnyAction } from 'redux';
import { LoadEventsAction, LoadEventByIdAction, LoadMoreEventsAction, SetEventsFilterFacetAction, ClearEventsListAction } from '../types/eventTypes';
import EventModel from '../models/Event.model';
import { ContentWithFacet } from '../types/contentWithFacets';
import { ApplicationState } from '../reducers';
export declare const loadMoreEvents: (response: ContentWithFacet) => LoadMoreEventsAction;
export declare const fetchEvents: (limit?: number | undefined, sort?: string | undefined, facet?: string | undefined) => ThunkAction<void, ApplicationState, undefined, AnyAction>;
export declare const loadEvents: (eventsList: EventModel[]) => LoadEventsAction;
export declare const fetchHomeEvents: (owner?: string) => ThunkAction<Promise<void>, {}, {}, AnyAction>;
export declare const loadEventById: (event: EventModel) => LoadEventByIdAction;
export declare const fetchEventById: (id: string) => ThunkAction<Promise<void>, {}, {}, AnyAction>;
export declare const setEventsFilterFacet: (selectedFacet: import("../types/contentTypes").TaxonomyTermModel) => SetEventsFilterFacetAction;
export declare const clearEventsList: () => ClearEventsListAction;
export declare function downloadAddToCalendarAction(id: string): Promise<any>;
//# sourceMappingURL=eventActions.d.ts.map