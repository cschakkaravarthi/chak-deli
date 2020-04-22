import React from 'react';
import { dummyNotifications } from '../../shared/models/Notification.model';
import { shallowRender } from '../../shared/services/testHelper';
import NotificationList from './NotificationList';

describe('NotificationList', () => {
  it('renders null without notifications', () => {
    const tree = shallowRender(<NotificationList />);
    expect(tree).toEqual(null);
  });

  it('renders correctly with notifications', () => {
    const tree = shallowRender(
      <NotificationList notifications={dummyNotifications} />
    );
    expect(tree).toMatchSnapshot();
  });
});
