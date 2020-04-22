import React, { FC } from 'react';
import EventModel from '../../shared/models/Event.model';
import Facet, { FacetProperty } from '../../shared/models/Facet.model';
import { SetEventsFilterFacetAction } from '../../shared/types/eventTypes';
declare type Props = {
    isLastPage: boolean;
    eventsFacets?: Facet;
    selectedFacet?: string;
    clearEventsList?: () => void;
    moreEventsList?: EventModel[];
    fetchEvents?: (a?: number, b?: string, c?: string) => void;
    setEventsFilterFacet?: (a: FacetProperty) => SetEventsFilterFacetAction;
};
export declare const EventsScene: FC<Props>;
declare const _default: import("react-redux").ConnectedComponent<React.FC<Props>, Pick<Props, "isLastPage" | "selectedFacet" | "moreEventsList" | "eventsFacets">>;
export default _default;
//# sourceMappingURL=EventsScene.d.ts.map