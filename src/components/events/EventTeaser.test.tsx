import React from 'react';
import EventTeaser from './EventTeaser';
import { shallowRender } from '../../shared/services/testHelper';
import { dummyEvents } from '../../shared/models/Event.model';

describe('EventTeaser', () => {
  it('renders null without article', () => {
    const tree = shallowRender(<EventTeaser />);
    expect(tree).toBe(null);
  });

  it('renders correctly with article', () => {
    const tree = shallowRender(<EventTeaser events={dummyEvents} />);
    expect(tree).toMatchSnapshot();
  });
});
