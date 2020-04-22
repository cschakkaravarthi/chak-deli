import React from 'react';
import { dummyEvents } from '../../shared/models/Event.model';
import { Event } from './Event';
import { shallowRender } from '../../shared/services/testHelper';

const mockMatch = { params: { id: 1 }, isExact: true, path: '', url: '' };

describe('Event', () => {
  beforeEach(() => {
    jest.spyOn(Date, 'now').mockImplementation(() => 1570066228);
  });

  it('renders null without event', () => {
    const tree = shallowRender(
      <Event
        event={undefined}
        eventsList={undefined}
        moreEventsList={undefined}
      />
    );
    expect(tree).toEqual(null);
  });

  it('renders with event', () => {
    const tree = shallowRender(
      <Event event={dummyEvents[0]} match={mockMatch}/>
    );
    expect(tree).toMatchSnapshot();
  });

  it('renders null when no url param is present', () => {
    const tree = shallowRender(
      <Event
        event={dummyEvents[0]}
        match={{ ...mockMatch, params: { id: null } }}/>
    );
    expect(tree).toEqual(null);
  });

  it('compares ids', () => {
    const tree = shallowRender(
      <Event
        event={dummyEvents[0]}
        eventsList={dummyEvents}
        match={{ ...mockMatch, params: { id: 4 } }}
      />
    );
    expect(tree).toMatchSnapshot();
  });
});
