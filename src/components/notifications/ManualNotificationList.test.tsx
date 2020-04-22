import React from 'react';
import { shallowRender } from '../../shared/services/testHelper';
import { MemoryRouter } from 'react-router-dom';
import ManualNotificationList from './../notifications/ManualNotificationList';
import { dummyManualNotificationListModel } from './../../shared/models/ManualNotification.model';

describe('NotificationList', () => {
  it('renders null without notifications', () => {
    const tree = shallowRender(
      <MemoryRouter keyLength={0}>
        <ManualNotificationList notificationList={dummyManualNotificationListModel} setFilterFacet={() => console.log('setFilterFacet')} />
      </MemoryRouter>
    );
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with notifications', () => {
    const tree = shallowRender(
      <MemoryRouter keyLength={0}>
        <ManualNotificationList notificationList={dummyManualNotificationListModel} setFilterFacet={() => console.log('setFilterFacet')} />
      </MemoryRouter>
    );
    expect(tree).toMatchSnapshot();
  });
});
