import React from 'react';
import EventModel from '../../shared/models/Event.model';
import Facet from '../../shared/models/Facet.model';
declare type Props = {
    isLastPage: boolean;
    triggerFetchEvents: any;
    moreEventsList?: EventModel[];
    setEventsFilterFacet?: any;
    eventsFacets?: Facet;
    selectedFacet?: string;
};
export declare const EventListPage: React.FC<Props>;
export default EventListPage;
//# sourceMappingURL=EventListPage.d.ts.map