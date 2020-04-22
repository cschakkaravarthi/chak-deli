import React from 'react';
import AppreciationCardsTable from './AppreciationCardsTable';
import { shallowRender } from '../../shared/services/testHelper';
import { dummyAppreciationCardNotification } from '../../shared/models/Notification.model';

describe('AppreciationCardsTable', () => {
  const mockProps = {
    type: '',
    pathName: '',
    cardsList: [],
    loadMoreCards: jest.fn(),
    getAppreciationCardsListGrouped: jest.fn(),
    viewAppreciationCard: jest.fn()
  };

  it('renders null when no data info is present', () => {
    const tree = shallowRender(
      <AppreciationCardsTable { ...mockProps }/>

    );
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly', () => {
    const testProps = { ...mockProps, cardsList: [dummyAppreciationCardNotification] };
    const tree = shallowRender(
      <AppreciationCardsTable { ...testProps } />

    );
    expect(tree).toMatchSnapshot();
  });
});
