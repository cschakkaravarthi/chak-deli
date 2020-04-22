import React from 'react';
import { EventsScene } from './EventsScene';
import { dummyEvents } from '../../shared/models/Event.model';
import { MemoryRouter } from 'react-router-dom';
import { shallowRender } from '../../shared/services/testHelper';

describe('Events scene', () => {
  it.skip('renders null without events', () => {
    const tree = shallowRender(
      <MemoryRouter>
        <EventsScene isLastPage={false} fetchEvents={jest.fn()} />
      </MemoryRouter>
    );
    expect(tree).toMatchSnapshot();
  });

  it('renders with events', () => {
    const tree = shallowRender(
      <MemoryRouter keyLength={0}>
        <EventsScene
          isLastPage={false}
          fetchEvents={jest.fn()}
          moreEventsList={dummyEvents}
        />
      </MemoryRouter>
    );
    expect(tree).toMatchSnapshot();
  });
});
