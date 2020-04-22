import React from 'react';
import { dummyNotification } from '../../shared/models/Notification.model';
import { shallowRender } from '../../shared/services/testHelper';
import NotificationTeaser from './NotificationTeaser';

describe('ArticleTeaser', () => {
  it('renders null without article', () => {
    const tree = shallowRender(<NotificationTeaser />);
    expect(tree).toBe(null);
  });

  it('renders correctly with article', () => {
    const tree = shallowRender(
      <NotificationTeaser notification={dummyNotification} />
    );
    expect(tree).toMatchSnapshot();
  });
});
