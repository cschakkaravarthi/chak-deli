import React, { FC, useRef } from 'react';
import { Card } from 'umgc_ui_library';
import { Link } from 'react-router-dom';
import { formatDate } from '../../shared/services/date';
import Event from '../../shared/models/Event.model';
import { usehandleAddToCalendar, normalizeEventData } from '../../utils/customHooks';
import BSToast from '../../components/toast/Toast';
import Container from 'react-bootstrap/Container';

interface EventCardProps {
  event: Event;
  searchKeyword?: string;
}

export const EventCard: FC<EventCardProps> = eventCardProps => {
  const toastRef = useRef();
  const handleAddToCalender = (id: string, title: string): void => {
    usehandleAddToCalendar(id, title, toastRef);
  };

  return (
    <Container className='article-list p-0'>
      <BSToast ref={toastRef} />
      <Card
        type="event"
        variant="search"
        title={eventCardProps.event.title}
        location={eventCardProps.event.where}
        date={formatDate(eventCardProps.event.when_start)}
        MainLink={p => (
          <Link to={`/event/${eventCardProps.event.drupal_id}`}>{p.children}</Link>
        )}
        MoreInfoLink={p => (
          <Link to={`/event/${eventCardProps.event.drupal_id}`}>{p.children}</Link>
        )}
        AddToCalenderLink={() => {
          handleAddToCalender(eventCardProps.event.drupal_id.toString(), eventCardProps.event.title);
        }}
        SendInviteEventData = {normalizeEventData(eventCardProps.event)}
        searchKeyword={eventCardProps.searchKeyword}
      />
    </Container>
  );
};
