import React from 'react';
import { shallowRender } from '../../shared/services/testHelper';
import AppreciationCardNotification from './AppreciationCardNotification';

describe('AppreciationCardNotification', () => {
  it('renders properly', () => {
    const tree = shallowRender(
      <AppreciationCardNotification cardTitle="Test title" />
    );
    expect(tree).toMatchSnapshot();
  });
});
