import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import EventModel from '../../shared/models/Event.model';
import { formatDate, formatDateRange, formatDateTime } from '../../shared/services/date';
import get from 'lodash.get';
import { Card } from 'umgc_ui_library';
import { usehandleAddToCalendar, normalizeEventData } from '../../utils/customHooks';
import BSToast from '../../components/toast/Toast';
import { TaxonomyTermModel } from '../../shared/types/contentTypes';

type Props = {
  isFetching?: boolean;
  events?: EventModel[];
  showCategories?: boolean;
};

export const EventTeaser: React.FC<Props> = props => {
  const { events = [], showCategories = true, isFetching } = props;

  if (!events.length && !isFetching) return null;

  const toastRef = useRef();

  const handleAddToCalender = (id: string, title: string): void => {
    usehandleAddToCalendar(id, title, toastRef);
  };

  const getDate = (event: EventModel): string => {
    if (event.when_end) {
      if (formatDateTime(event.when_start, 'noTime') === formatDateTime(event.when_end, 'noTime')) {
        return formatDate(event.when_start);
      } else {
        return formatDateRange(event.when_start, event.when_end);
      }
    } else {
      return formatDate(event.when_start);
    }
  };

  return (
    <ul className="list-unstyled">
      <BSToast ref={toastRef}></BSToast>
      {!isFetching && events.length ? events.map(
        (event: EventModel): JSX.Element => (
          <Card
            type="event"
            variant="embedded"
            title={event.title}
            key={event.drupal_id}
            location={event.where}
            date={getDate(event)}
            MainLink={(p: React.PropsWithChildren<{}>) => (
              <Link to={`/event/${event.drupal_id}`}>{p.children}</Link>
            )}
            categories={
              showCategories
                ? get(event, 'event_category', [] as TaxonomyTermModel[])
                : undefined
            }
            AddToCalenderLink={() => {
              handleAddToCalender(event.drupal_id.toString(), event.title);
            }}
            SendInviteEventData={normalizeEventData(event)}
          />
        )
      ) : Array(3).fill(null).map((x: '', i: number) => (
        <Card
          title=""
          type="event"
          key={`${x + i}`}
          variant="embedded"
          isFetching={isFetching}
        />
      ))}
    </ul>
  );
};

export default EventTeaser;
