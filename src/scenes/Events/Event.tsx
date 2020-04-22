import React, { FC, useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import get from 'lodash.get';
import createDOMPurify from 'dompurify';
import Col from 'react-bootstrap/Col';
import EventModel from '../../shared/models/Event.model';
import Row from 'react-bootstrap/Row';
import { AppState } from '../../shared/types/genericTypes';
import { Card } from 'umgc_ui_library/lib';
import { Container } from 'react-bootstrap';
import { fetchEventById } from '../../shared/actions/eventActions';
import { usehandleAddToCalendar, normalizeEventData } from '../../utils/customHooks';
import { formatDateTime, formatDateRangeWithTime, formatDateRange } from '../../shared/services/date';
import BSToast from '../../components/toast/Toast';
import { match } from 'react-router';
import { TaxonomyTermModel } from '../../shared/types/contentTypes';
import Error404 from '../Errors/Error404';

type Props = {
  match?: match;
  event?: EventModel;
  eventsList?: EventModel[];
  moreEventsList?: EventModel[];
  fetchEventById?: (a: number | string) => Promise<void>;
};

const mapState = (state: AppState, props: Props): Props => (
  {
    ...props,
    event: state.eventReducers.event,
    eventsList: state.eventReducers.eventsList,
    moreEventsList: state.eventReducers.moreEventsList
  }
);

const actionCreators = { fetchEventById };

export const Event: FC<Props> = props => {
  const { match, event, eventsList, moreEventsList, fetchEventById } = props;

  const [isFetching, setIsFetching] = useState<boolean>(true);

  const urlEventId = parseInt(get(match, 'params.id'), 10);

  // eventsList stores the events on home page
  // while moreEventsList the events in the events scene.
  const eventStore = moreEventsList || eventsList;

  if (!urlEventId) {
    if (!isFetching) {
      return <Error404 />;
    } else {
      return null;
    }
  }

  const shouldFetch = eventStore
    ? eventStore.find(eventItem => eventItem.drupal_id === urlEventId)
    : undefined;

  useEffect(() => {
    if (!shouldFetch) {
      if (fetchEventById) {
        fetchEventById(urlEventId)
          .then(() => {
            setIsFetching(false);
          })
          .catch(() => {
            setIsFetching(false);
          });
      }
    } else {
      setIsFetching(false);
    }
  }, []);

  const eventResolution = shouldFetch || event;

  const toastRef = useRef();

  const handleAddToCalender = (id: string, title: string): void => {
    usehandleAddToCalendar(id, title, toastRef);
  };

  if (!eventResolution) {
    if (!isFetching) {
      return <Error404 />;
    } else {
      return null;
    }
  }

  const getDate = (event: EventModel): string => {
    const limit = 23 * 60 * 60 + 59 * 60; // 23 hours and 59 seconds
    if (event.when_end) {
      const difference = event.when_end - event.when_start;

      if (difference < limit) {
        return formatDateRangeWithTime(event.when_start, event.when_end);
      } else if (difference === limit) {
        return formatDateTime(event.when_start, 'noTZ');
      } else {
        return formatDateRange(event.when_start, event.when_end);
      }
    } else {
      return formatDateTime(event.when_start, 'noTZ');
    }
  };

  return (
    <Container className="content-full">
      <Row>
        <Col md={12} className="p-0 mt-5">
          <BSToast ref={toastRef}/>
          <Card
            type="event"
            title={eventResolution.title}
            variant="full"
            location={eventResolution.where}
            date={getDate(eventResolution)}
            imageUrl={get(eventResolution, 'image_uri.umgc_featured', '')}
            categories={get(
              eventResolution,
              'event_category',
              [] as TaxonomyTermModel[]
            )}
            content={
              <div
                className="position-relative"
                dangerouslySetInnerHTML={{
                  __html: createDOMPurify.sanitize(
                    get(eventResolution, 'body_full', '')
                  )
                }}
              />
            }
            AddToCalenderLink={() => {
              handleAddToCalender(
                eventResolution.drupal_id.toString(),
                eventResolution.title
              );
            }}
            SendInviteEventData = {normalizeEventData(eventResolution)}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default connect(
  mapState,
  actionCreators
)(Event);
