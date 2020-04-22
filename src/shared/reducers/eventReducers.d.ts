import { Reducer } from 'redux';
import { EventState } from '../types/eventTypes';
export declare const initialState: {
    eventsList: never[];
    event: undefined;
    isLastPage: boolean;
    moreEventsList: never[];
    eventsFacets: {};
    selectedFacet: string;
    pageCount: number;
};
declare const eventReducers: Reducer<EventState, any>;
export default eventReducers;
//# sourceMappingURL=eventReducers.d.ts.map