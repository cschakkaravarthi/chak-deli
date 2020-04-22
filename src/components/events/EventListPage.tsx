import React, { useEffect, useRef, useState, ReactElement } from 'react';
import { Link } from 'react-router-dom';
import EventModel, { dummyEvent } from '../../shared/models/Event.model';
import Facet, { FacetProperty } from '../../shared/models/Facet.model';
import { formatDate, formatDateRange, formatDateTime } from '../../shared/services/date';
import { OnError as IsEmpty } from '../error/Error';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import get from 'lodash.get';
import { Card, CardProps } from 'umgc_ui_library';
import { Form } from 'react-bootstrap';
import { handleScrollToBottom } from '../../utils/scroller';
import BSToast from '../../components/toast/Toast';
import { filterQuery, usehandleAddToCalendar, normalizeEventData } from '../../utils/customHooks';
import { TaxonomyTermModel } from '../../shared/types/contentTypes';
import { SetEventsFilterFacetAction } from '../../shared/types/eventTypes';

type Props = {
  isLastPage: boolean;
  eventsFacets?: Facet;
  selectedFacet?: string;
  moreEventsList?: EventModel[];
  fetchingEventsOnMount?: boolean;
  triggerFetchEvents: <T>() => Promise<T>;
  setEventsFilterFacet?: (facet: FacetProperty) => SetEventsFilterFacetAction;
};

export const EventListPage: React.FC<Props> = props => {
  const {
    isLastPage,
    selectedFacet,
    eventsFacets = {},
    triggerFetchEvents,
    moreEventsList = [],
    setEventsFilterFacet,
    fetchingEventsOnMount
  } = props;

  const [isFetching, setIsFetching] = useState<boolean>(true);

  const eventCategories = get(eventsFacets, 'event_category');

  const toastRef = useRef();

  const handleAddToCalender = (id: string, title: string): void => {
    usehandleAddToCalendar(id, title, toastRef);
  };

  const setFilterQuery = filterQuery();

  function handleDropDownChange (value: string): void {
    setFilterQuery.useFilterQuery('event_category', value, setEventsFilterFacet);
  }

  function fetchOnScrollToBottom (): void {
    if (!isFetching) {
      handleScrollToBottom(() => setIsFetching(true));
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', fetchOnScrollToBottom);
    return () => {
      window.removeEventListener('scroll', fetchOnScrollToBottom);
    };
  }, [isFetching]);

  useEffect(() => {
    if (!isFetching) {
      return;
    }

    if (!isLastPage && !fetchingEventsOnMount) {
      triggerFetchEvents().then(() => {
        setIsFetching(false);
      });
    } else {
      setIsFetching(false);
    }
  }, [isFetching]);

  const getEventDate = (event: EventModel): string => {
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

  const eventProps = (event: EventModel): CardProps => ({
    type: 'event',
    title: event.title,
    location: event.where,
    categories: get(event, 'event_category', [] as TaxonomyTermModel[]),
    date: getEventDate(event),
    MainLink: p => <Link to={`/event/${event.drupal_id}`}>{p.children}</Link>,
    MoreInfoLink: p => <Link to={`/event/${event.drupal_id}`}>{p.children}</Link>,
    imageUrl: get(event, 'image_uri.umgc_thumbnail', ''),
    AddToCalenderLink: () => {
      handleAddToCalender(event.drupal_id.toString(), event.title);
    },
    SendInviteEventData: normalizeEventData(event)
  });

  const numSkeletons = 9;
  const skeletonData: EventModel[] = [];
  for (let i = 0; i < numSkeletons; i++) {
    skeletonData.push({
      ...dummyEvent,
      drupal_id: i,
      type: 'event'
    });
  }

  const EventCard = (event: EventModel, isFetching = false): ReactElement => (
    <Col md={6} lg={4} key={event.drupal_id} className="mb-4">
      <Card isFetching={isFetching} {...eventProps(event)} />
    </Col>
  );

  return (
    <Container className="article-list mt-5">
      <BSToast ref={toastRef} />
      <Row className="mb-2 article-list-header">
        <Col md={3}>
          <p className="font-size-xl">
            <b>Events</b>
          </p>
        </Col>
        <Col md={9} className="justify-content-md-end align-items-center d-flex">
          <Form className="w-100">
            <Form.Row className="justify-content-start justify-content-sm-end">
              <Col xs={3} sm={2} className="d-flex justify-content-start justify-content-sm-end">
                <Form.Label className="mb-0 d-flex align-items-center font-size-sm">Filter by:</Form.Label>
              </Col>
              <Col xs={7} sm={3} className="d-flex justify-content-start justify-content-sm-end">
                <Form.Control
                  size="sm"
                  as="select"
                  id="category"
                  name="category"
                  onChange={(e: React.SyntheticEvent) => handleDropDownChange((e.target as HTMLInputElement).value)}
                  value={selectedFacet}
                >
                  <option value={0}>All</option>
                  {eventCategories instanceof Array &&
                    eventCategories.map((category: FacetProperty) => (
                      <option key={category.drupal_id} value={category.drupal_id}>
                        {category.title}
                      </option>
                    ))}
                </Form.Control>
              </Col>
            </Form.Row>
          </Form>
        </Col>
      </Row>
      <Row>
        {fetchingEventsOnMount && skeletonData.map((event: EventModel) => EventCard(event, true))}
        {!!moreEventsList.length &&
          !fetchingEventsOnMount &&
          moreEventsList.map((event: EventModel) => EventCard(event, false))}
        {!fetchingEventsOnMount && !moreEventsList.length && <IsEmpty />}
      </Row>
      <Row>
        <Col>
          {isFetching && !isLastPage && !!moreEventsList.length && (
            <Col className="p-5 d-flex justify-content-center text-secondary">
              <strong>Fetching more events ...</strong>
            </Col>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default EventListPage;
