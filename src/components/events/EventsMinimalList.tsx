import React, { FC, useEffect } from 'react';

import { connect } from 'react-redux';

import EventsContainer from './Events';
import EventModel from '../../shared/models/Event.model';
import { fetchHomeEvents } from '../../shared/actions/eventActions';
import EventTeaser from './EventTeaser';
import { AppState } from '../../shared/types/genericTypes';

type Props = {
  owner?: string;
  showCategories?: boolean;
  eventsList?: EventModel[];
  fetchHomeEvents?: <T>(a?: string) => T;
};

const mapState = (state: AppState, props: Props): Props => ({
  ...props,
  eventsList: state.eventReducers.eventsList
});

const actionCreators = { fetchHomeEvents };

export const EventsMinimalList: FC<Props> = props => {
  const { owner, eventsList, fetchHomeEvents } = props;
  const OWNER_ID = owner;

  useEffect(() => {
    fetchHomeEvents && fetchHomeEvents(OWNER_ID);
  }, []);

  return (
    <EventsContainer events={eventsList} showHeaderLink={false}>
      <EventTeaser events={eventsList} showCategories={false}/>
    </EventsContainer>
  );
};

export default connect(mapState, actionCreators)(EventsMinimalList);
