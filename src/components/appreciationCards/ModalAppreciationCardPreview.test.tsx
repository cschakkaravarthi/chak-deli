import React from 'react';
import ModalAppreciationCardPreview from './ModalAppreciationCardPreview';
import { shallowRender } from '../../shared/services/testHelper';
import { dummyAppreciationCardNotification, AppreciationCardNotificationModel } from '../../shared/models/Notification.model';

describe('ModalAppreciationCardPreview', () => {
  it('renders null when no card info is present', () => {
    const tree = shallowRender(
      <ModalAppreciationCardPreview
        viewCard={true}
        handleCardModalClose={jest.fn()}
        cardInfo={{} as AppreciationCardNotificationModel}
      />

    );
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly', () => {
    const tree = shallowRender(
      <ModalAppreciationCardPreview
        viewCard={true}
        handleCardModalClose={jest.fn()}
        cardInfo={dummyAppreciationCardNotification}
      />

    );
    expect(tree).toMatchSnapshot();
  });
});
