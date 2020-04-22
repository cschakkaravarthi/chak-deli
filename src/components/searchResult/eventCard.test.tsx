import React from 'react';
import { EventCard } from './eventCard';
import { dummyEvents } from '../../shared/models/Event.model';
import { shallowRender } from '../../shared/services/testHelper';
import { MemoryRouter } from 'react-router-dom';

describe('EventCard for search result', () => {
  it('renders correctly with props', () => {
    const tree = shallowRender(
      <MemoryRouter keyLength={0}>
        <EventCard event={dummyEvents[0]} />
      </MemoryRouter>
    );
    expect(tree).toMatchSnapshot();
  });
});
