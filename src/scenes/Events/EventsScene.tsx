import React, { FC, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { clearEventsList, fetchEvents, setEventsFilterFacet } from '../../shared/actions/eventActions';
import { useQuery } from '../../utils/customHooks';

import { AppState } from '../../shared/types/genericTypes';
import EventModel from '../../shared/models/Event.model';
import Facet, { FacetProperty } from '../../shared/models/Facet.model';

import EventListPage from '../../components/events/EventListPage';
import { SetEventsFilterFacetAction } from '../../shared/types/eventTypes';
import { EVENTS_LIMIT } from '../../constants/constants';

const eventsQueryFacets = 'event_category';

type Props = {
  isLastPage: boolean;
  eventsFacets?: Facet;
  selectedFacet?: string;
  clearEventsList?: () => void;
  moreEventsList?: EventModel[];
  fetchEvents?: (limit?: number, filter?: string, facet?: string) => void;
  setEventsFilterFacet?: (facet: FacetProperty) => SetEventsFilterFacetAction;
};

const mapState: any = (state: AppState, props: Props): Props => ({
  ...props,
  isLastPage: state.eventReducers.isLastPage,
  eventsFacets: state.eventReducers.eventsFacets,
  selectedFacet: state.eventReducers.selectedFacet,
  moreEventsList: state.eventReducers.moreEventsList
});

const actionCreators = {
  fetchEvents,
  clearEventsList,
  setEventsFilterFacet
};

export const EventsScene: FC<Props> = props => {
  const {
    isLastPage,
    fetchEvents,
    eventsFacets,
    selectedFacet,
    clearEventsList,
    moreEventsList = [],
    setEventsFilterFacet
  } = props;

  const [isFetching, setIsFetching] = useState<boolean>(true);

  // @TODO: find a better type
  const triggerFetchEvents = (): any => {
    if (!isLastPage) {
      return fetchEvents!(EVENTS_LIMIT, 'upcoming', eventsQueryFacets);
    }
  };

  const query = useQuery();

  // Important: Keep this effect specifically a didMount. Don't add anything to the empty array.
  useEffect(() => {
    clearEventsList!();
  }, []);

  useEffect(() => {
    async function asyncCall (): Promise<any> {
      const facetInQuery = query.get(eventsQueryFacets);

      if (facetInQuery && facetInQuery !== '0' && selectedFacet === '0') {
        setEventsFilterFacet!(facetInQuery);
      } else {
        setIsFetching(true);
        await fetchEvents!(EVENTS_LIMIT, 'upcoming', eventsQueryFacets);
        setIsFetching(false);
      }
    }
    asyncCall();
  }, [selectedFacet]);

  return (
    <EventListPage
      isLastPage={isLastPage}
      eventsFacets={eventsFacets}
      selectedFacet={selectedFacet}
      moreEventsList={moreEventsList}
      fetchingEventsOnMount={isFetching}
      triggerFetchEvents={triggerFetchEvents}
      setEventsFilterFacet={setEventsFilterFacet}
    />
  );
};

export default connect(mapState, actionCreators)(EventsScene);
