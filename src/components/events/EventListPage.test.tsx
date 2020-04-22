import React from 'react';
import EventListPage from './EventListPage';
import { dummyEvents } from '../../shared/models/Event.model';
import { shallowRender } from '../../shared/services/testHelper';
import { MemoryRouter } from 'react-router-dom';

describe('EventListPage', () => {
  beforeEach(() => {
    jest.spyOn(Date, 'now').mockImplementation(() => 1570066228);
  });

  it.skip('renders null without events', () => {
    const tree = shallowRender(
      <MemoryRouter keyLength={0}>
        <EventListPage setEventsFilterFacet={jest.fn()} isLastPage={false} triggerFetchEvents={jest.fn()} />
      </MemoryRouter>
    );
    expect(tree).toEqual(null);
  });

  it('renders correctly with events', () => {
    const tree = shallowRender(
      <MemoryRouter keyLength={0}>
        <EventListPage
          isLastPage={false}
          moreEventsList={dummyEvents}
          triggerFetchEvents={jest.fn()}
          setEventsFilterFacet={jest.fn()}
        />
      </MemoryRouter>
    );
    expect(tree).toMatchSnapshot();
  });
});
