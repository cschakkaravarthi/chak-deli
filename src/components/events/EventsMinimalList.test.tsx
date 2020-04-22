import React from 'react';
import { EventsMinimalList } from './EventsMinimalList';
import { shallowRender } from '../../shared/services/testHelper';
import { dummyEvents } from '../../shared/models/Event.model';

// This doesn't need to test when events are null since that logic is present on another component
describe('EventsMinimalList', () => {
  it('renders correctly', () => {
    const tree = shallowRender(<EventsMinimalList eventsList={dummyEvents} />);
    expect(tree).toMatchSnapshot();
  });
});
