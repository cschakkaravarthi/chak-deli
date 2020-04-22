import React from 'react';
import { dummyManualNotificationListModel } from '../shared/models/ManualNotification.model';
import { MemoryRouter } from 'react-router-dom';
import { Notifications } from './Notifications';
import { shallowRender } from '../shared/services/testHelper';

describe('Notifications', () => {
  it('renders without notifications', () => {
    const tree = shallowRender(
      <MemoryRouter keyLength={0}>
        <Notifications notifications={dummyManualNotificationListModel} setFilterFacet={() => console.log('setFilterFacet')} />
      </MemoryRouter>
    );
    expect(tree).toMatchSnapshot();
  });

  it('renders with notifications', () => {
    const tree = shallowRender(
      <MemoryRouter keyLength={0}>
        <Notifications notifications={dummyManualNotificationListModel} setFilterFacet={() => console.log('setFilterFacet')} />
      </MemoryRouter>
    );
    expect(tree).toMatchSnapshot();
  });
});
