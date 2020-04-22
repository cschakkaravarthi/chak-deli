import React from 'react';
import { shallowRender } from '../../shared/services/testHelper';
import EventsContainer from './Events';
import { dummyEvents } from '../../shared/models/Event.model';

describe('Events', () => {
  it('renders null without events', () => {
    const tree = shallowRender(<EventsContainer />);
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with events', () => {
    const tree = shallowRender(
      <EventsContainer events={dummyEvents}>
        <p>Testing the children prop</p>
      </EventsContainer>
    );
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with events and hide showHeaderLink', () => {
    const tree = shallowRender(
      <EventsContainer events={dummyEvents} showHeaderLink={false}>
        <p>Testing the showHeaderLink = false</p>
      </EventsContainer>
    );
    expect(tree).toMatchSnapshot();
  });
});
